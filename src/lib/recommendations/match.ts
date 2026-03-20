import type {
  FunderRecommendation,
  RecommendationsResponse,
  SamplePastGrant,
  ToolInput,
} from "./types";
import { MOCK_FUNDERS } from "./mockFunderData";

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function pickMatchingHints(hints: string[], combinedText: string) {
  const lc = combinedText.toLowerCase();
  const matched = hints.filter((h) => lc.includes(h.toLowerCase()));
  return matched.length ? matched : [];
}

function grantSizeScore(desired: number, min: number, max: number) {
  if (desired >= min && desired <= max) return 1;
  if (desired < min) return Math.max(0, (desired / min) * 0.6);
  return Math.max(0, (max / desired) * 0.6);
}

function computeWeights(input: ToolInput) {
  const advanced = input.advanced ?? {};
  const defaults = {
    topicSimilarityWeight: 60,
    geographyWeight: 25,
    grantSizeWeight: 15,
  };
  const topic = advanced.topicSimilarityWeight ?? defaults.topicSimilarityWeight;
  const geo = advanced.geographyWeight ?? defaults.geographyWeight;
  const size = advanced.grantSizeWeight ?? defaults.grantSizeWeight;
  const sum = topic + geo + size;
  return { topic, geo, size, sum: sum || 1 };
}

function formatTypicalRange(min: number, max: number) {
  // Keep it simple; we render currency on the UI.
  return { min, max, typical: Math.round((min + max) / 2) };
}

function selectSampleGrants(
  desired: number,
  seed: SamplePastGrant[]
): SamplePastGrant[] {
  return [...seed]
    .sort((a, b) => Math.abs(a.amountUsd - desired) - Math.abs(b.amountUsd - desired))
    .slice(0, 3);
}

export function getMockRecommendations(input: ToolInput): RecommendationsResponse {
  const combinedText = `${input.keywords} ${input.missionContext}`.trim();
  tokenize(combinedText);

  const { topic, geo, size, sum } = computeWeights(input);

  const scored = MOCK_FUNDERS.map((f) => {
    const topicMatches = pickMatchingHints(f.seedTopicHints, combinedText);
    const topicRatio = f.seedTopicHints.length
      ? topicMatches.length / f.seedTopicHints.length
      : 0;

    const geoMatch = f.geography.topStates.includes(input.state) ? 1 : 0.25;
    const sizeScore = grantSizeScore(
      input.desiredGrantAmount,
      f.typicalGrantSizeUsd.min,
      f.typicalGrantSizeUsd.max
    );

    const overall =
      (topicRatio * topic + geoMatch * geo + sizeScore * size) / sum;

    const normalizedTopic =
      topicMatches.length > 0
        ? topicMatches
            .slice(0, 3)
            .join(", ")
            .replace(/\s+/g, " ")
        : "";

    const grantRange = formatTypicalRange(
      f.typicalGrantSizeUsd.min,
      f.typicalGrantSizeUsd.max
    );

    let why = "";
    const stateText = f.geography.topStates.includes(input.state)
      ? `They have previously supported work in ${input.state}.`
      : `Their past giving includes programs across ${f.geography.topStates.join(
          ", "
        )}.`;

    if (normalizedTopic) {
      why = `Your request aligns with themes like ${normalizedTopic}. ${stateText} Your desired grant amount also fits their typical grant range.`;
    } else {
      why = `Based on your mission keywords, this funder’s past grant descriptions look like a workable fit. ${stateText} Your desired grant amount also fits their typical grant range.`;
    }

    // Tone: avoid pretending certainty.
    if (sizeScore < 0.6) {
      why += ` Consider emphasizing outcomes and readiness to deliver.`;
    }

    // Pick sample grants closest to the request.
    const samplePastGrants = selectSampleGrants(
      input.desiredGrantAmount,
      f.samplePastGrantsSeed
    );

    const recommendation: FunderRecommendation = {
      id: f.id,
      name: f.name,
      ein: f.ein,
      typicalGrantSizeUsd: {
        min: grantRange.min,
        max: grantRange.max,
        typical: grantRange.typical,
      },
      geography: f.geography,
      purposeCategories: f.purposeCategories,
      whyRecommended: why,
      samplePastGrants: samplePastGrants,
      websiteUrl: f.websiteUrl,
      outreachNextSteps: f.outreachHooksSeed,
    };

    return { recommendation, overall, topicRatio, geoMatch, sizeScore };
  });

  const sorted = scored
    .sort((a, b) => b.overall - a.overall)
    .map((s) => s.recommendation);

  const results = sorted.slice(0, 5);
  const bestScore = scored.length ? Math.max(...scored.map((s) => s.overall)) : 0;

  return {
    results: bestScore >= 0.35 ? results : [],
    noGoodMatchesFound: bestScore < 0.35,
    generatedAt: new Date().toISOString(),
    dataSource: "mock",
  };
}

