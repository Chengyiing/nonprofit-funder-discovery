import { getRecommendationData } from "./csvData";
import type {
  FunderRecommendation,
  RecommendationsResponse,
  SamplePastGrant,
  ToolInput,
} from "./types";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 3);
}

function uniqueTop(values: string[], max = 3): string[] {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))].slice(0, max);
}

function grantSizeScore(desired: number, min: number, max: number): number {
  if (desired >= min && desired <= max) return 1;
  if (desired < min) return Math.max(0, (desired / Math.max(min, 1)) * 0.65);
  return Math.max(0, (Math.max(max, 1) / desired) * 0.65);
}

function computeWeights(input: ToolInput) {
  const advanced = input.advanced ?? {};
  const topic = advanced.topicSimilarityWeight ?? 60;
  const geo = advanced.geographyWeight ?? 25;
  const size = advanced.grantSizeWeight ?? 15;
  const sum = topic + geo + size || 1;
  return { topic, geo, size, sum };
}

function buildTypicalRange(medianGrant: number, p75Grant: number, maxGrant: number) {
  const typical = medianGrant > 0 ? medianGrant : p75Grant > 0 ? p75Grant : maxGrant;
  const min = Math.max(1000, Math.round((typical || 10000) * 0.6));
  const maxCandidate = p75Grant > 0 ? p75Grant : maxGrant > 0 ? maxGrant : typical * 1.6;
  const max = Math.max(min, Math.round(maxCandidate || min));
  return { min, max, typical: Math.round(typical || (min + max) / 2) };
}

function pickSampleGrants(
  grants: Array<{
    taxYear?: number;
    amountNum: number;
    purpose?: string;
    purposeCategory?: string;
    recipientCity?: string;
    recipientState?: string;
  }>,
  desiredAmount: number
): SamplePastGrant[] {
  return [...grants]
    .sort((a, b) => Math.abs(a.amountNum - desiredAmount) - Math.abs(b.amountNum - desiredAmount))
    .slice(0, 3)
    .map((g, idx) => ({
      id: `${g.taxYear ?? "y"}-${idx}-${g.amountNum}`,
      year: g.taxYear ?? new Date().getFullYear(),
      amountUsd: g.amountNum,
      grantTitle: g.purpose || "General support grant",
      purposeCategory: g.purposeCategory || "General",
      location: [g.recipientCity, g.recipientState].filter(Boolean).join(", ") || "Unknown location",
    }));
}

export async function getRecommendationsFromCsv(
  input: ToolInput
): Promise<RecommendationsResponse> {
  const { profiles, grantsByFunderEin } = await getRecommendationData();
  const query = `${input.keywords} ${input.missionContext}`.toLowerCase();
  const queryTokens = uniqueTop(tokenize(query), 8);
  const cityLower = input.city.trim().toLowerCase();
  const stateUpper = input.state.trim().toUpperCase();

  const { topic, geo, size, sum } = computeWeights(input);

  const scored = profiles.map((p) => {
    const corpus = `${p.textCorpus} ${p.topPurposeCategories.join(" ")}`.toLowerCase();
    const tokenMatches = queryTokens.filter((t) => corpus.includes(t));
    const topicScore = queryTokens.length
      ? tokenMatches.length / queryTokens.length
      : 0;

    const stateMatch = p.topStates.includes(stateUpper) ? 1 : p.funderState === stateUpper ? 0.75 : 0.15;
    const cityMatch = p.topCities.some((c) => c.toLowerCase().includes(cityLower)) ? 1 : 0;
    const geoScore = Math.min(1, stateMatch * 0.8 + cityMatch * 0.2);

    const typicalRange = buildTypicalRange(p.medianGrant, p.p75Grant, p.maxGrant);
    const sizeScore = grantSizeScore(
      input.desiredGrantAmount,
      typicalRange.min,
      typicalRange.max
    );

    const overall = (topicScore * topic + geoScore * geo + sizeScore * size) / sum;

    const topicText = tokenMatches.length
      ? `Their profile aligns with themes like ${tokenMatches.slice(0, 3).join(", ")}.`
      : "Their profile language and purpose categories show potential mission fit.";
    const geoText = p.topStates.includes(stateUpper)
      ? `They have a strong history of grants in ${stateUpper}.`
      : p.topStates.length
      ? `Their grant history is concentrated in ${p.topStates.slice(0, 3).join(", ")}.`
      : "Geographic history is available in their profile.";
    const sizeText = `Your requested amount is ${sizeScore >= 0.75 ? "well aligned" : "within a workable range"} with their typical grant size.`;

    const grants = grantsByFunderEin.get(p.funderEin) ?? [];
    const samplePastGrants = pickSampleGrants(grants, input.desiredGrantAmount);
    const categories = uniqueTop(p.topPurposeCategories, 4);

    const recommendation: FunderRecommendation = {
      id: p.funderEin || p.funderName,
      name: p.funderName,
      ein: p.funderEin,
      typicalGrantSizeUsd: typicalRange,
      geography: {
        focusText: `Top states: ${p.topStates.slice(0, 5).join(", ") || "Not specified"}`,
        topStates: p.topStates.slice(0, 5),
      },
      purposeCategories: categories.length ? categories : ["General"],
      whyRecommended: `${topicText} ${geoText} ${sizeText}`,
      samplePastGrants,
      websiteUrl: p.website,
      outreachNextSteps: [
        "Confirm eligibility, program area, and application timing on the funder website.",
        "Tailor your outreach message using one relevant past grant example.",
        "Lead with measurable outcomes and your local context.",
      ],
    };

    return { recommendation, overall };
  });

  scored.sort((a, b) => b.overall - a.overall);
  const top = scored.slice(0, 5);
  const bestScore = top.length ? top[0].overall : 0;

  return {
    results: bestScore >= 0.15 ? top.map((x) => x.recommendation) : [],
    noGoodMatchesFound: bestScore < 0.15,
    generatedAt: new Date().toISOString(),
    dataSource: "csv_profile",
  };
}

