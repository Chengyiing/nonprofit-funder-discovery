import { getRecommendationData } from "./csvData";
import { computeTopicScores } from "./embeddingMatch";
import type {
  FunderRecommendation,
  RecommendationsResponse,
  SamplePastGrant,
  ToolInput,
} from "./types";

const US_STATE_NAMES: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "Washington, D.C.",
};

/** Tokens trimmed from explanations as low-information for typical nonprofit queries */
const TOPIC_STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "are",
  "but",
  "not",
  "you",
  "our",
  "can",
  "get",
  "has",
  "how",
  "its",
  "may",
  "new",
  "now",
  "see",
  "who",
  "way",
  "did",
  "been",
  "into",
  "more",
  "than",
  "very",
  "what",
  "when",
  "with",
  "have",
  "from",
  "that",
  "this",
  "will",
  "your",
  "about",
  "after",
  "also",
  "back",
  "being",
  "both",
  "each",
  "even",
  "good",
  "help",
  "here",
  "just",
  "like",
  "long",
  "make",
  "many",
  "much",
  "must",
  "most",
  "need",
  "needs",
  "over",
  "same",
  "some",
  "such",
  "take",
  "them",
  "then",
  "these",
  "they",
  "time",
  "under",
  "used",
  "want",
  "well",
  "were",
  "which",
  "while",
  "would",
  "year",
  "years",
  "goal",
  "goals",
  "mission",
  "program",
  "programs",
  "support",
  "general",
  "services",
  "service",
  "provide",
  "providing",
  "community",
  "organization",
  "organizations",
  "nonprofit",
  "nonprofits",
  "funding",
  "grant",
  "grants",
  "people",
  "children",
  "child",
  "families",
  "family",
  "local",
  "region",
  "regional",
  "state",
  "city",
  "work",
  "works",
  "serve",
  "serving",
  "efforts",
  "effort",
  "ensure",
  "public",
  "through",
  "across",
  "including",
  "include",
  "focus",
  "focused",
  "based",
  "building",
  "strong",
  "improve",
  "improving",
  "address",
  "addressing",
  "seek",
  "seeking",
  "request",
  "requests",
  "requested",
  "please",
  "will",
  "use",
  "using",
  "used",
  "various",
  "several",
  "many",
  "other",
  "others",
]);

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

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
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

function termToFriendlyPhrase(term: string): string {
  const t = term.toLowerCase();
  if (t.endsWith("ing")) return `${t}-related`;
  return `${t}-focused`;
}

function joinOxford(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function buildTopicSentence(matchedTerms: string[]): string {
  if (!matchedTerms.length) {
    return "This funder’s mission and past grant categories suggest a possible fit with what you described.";
  }
  const phrases = uniqueTop(matchedTerms, 4).map(termToFriendlyPhrase);
  const list = joinOxford(phrases);
  if (phrases.length === 1) {
    return `This funder’s giving history aligns with ${phrases[0]} work.`;
  }
  return `This funder’s giving history aligns with ${list} work.`;
}

function stateFull(abbr: string): string {
  return US_STATE_NAMES[abbr] ?? abbr;
}

function geographyHeadline(
  topStates: string[],
  userStateAbbr: string,
  shareInPa?: number
): string {
  const top0 = topStates[0];
  const userInTop = topStates.includes(userStateAbbr);
  const paPos = topStates.indexOf("PA");
  const userPos = topStates.indexOf(userStateAbbr);

  if (top0 === "PA") {
    return "Most historical giving is in Pennsylvania.";
  }

  if (top0 === userStateAbbr) {
    return `Most historical giving is in ${stateFull(userStateAbbr)}.`;
  }

  if (userStateAbbr === "PA" && paPos >= 0) {
    if (paPos === 0) return "Most historical giving is in Pennsylvania.";
    if ((shareInPa ?? 0) >= 0.2 || paPos <= 2) {
      return "Has substantial prior giving in Pennsylvania.";
    }
    return "Pennsylvania appears among this funder’s top grant destinations.";
  }

  if (paPos === 0 && userStateAbbr !== "PA") {
    return "Most historical giving is in Pennsylvania.";
  }

  if (userInTop && userPos > 0 && userPos <= 3) {
    return `Has substantial prior giving in ${stateFull(userStateAbbr)}.`;
  }

  if (userInTop) {
    return `${stateFull(userStateAbbr)} appears among the most common grant destinations.`;
  }

  if (topStates.length && top0) {
    const others = topStates
      .slice(0, 3)
      .map((s) => stateFull(s))
      .join(", ");
    return `Recorded grants most often went to organizations in ${others}.`;
  }

  return "Geographic detail is limited in the data we have for this funder.";
}

function geographyFitSentence(
  topStates: string[],
  userStateAbbr: string,
  shareInPa?: number
): string {
  const userFull = stateFull(userStateAbbr);
  const userInTop = topStates.includes(userStateAbbr);
  const paFirst = topStates[0] === "PA";
  const userFirst = topStates[0] === userStateAbbr;

  if (userStateAbbr === "PA") {
    if (userFirst || topStates[0] === "PA") {
      return "That is encouraging for a Pennsylvania-based organization like yours.";
    }
    if (userInTop && (shareInPa ?? 0) >= 0.15) {
      return "It also has meaningful prior giving in Pennsylvania.";
    }
    if (userInTop) {
      return "Pennsylvania shows up in this funder’s recent destination patterns.";
    }
    return "Pennsylvania is not prominent in the top destinations we list—confirm local fit on their materials.";
  }

  if (userFirst) {
    return `It also has meaningful prior giving in ${userFull}.`;
  }

  if (userInTop) {
    return `It also has meaningful prior giving in ${userFull}.`;
  }

  if (paFirst) {
    return `Much of the recorded giving is in Pennsylvania; confirm whether they also fund work in ${userFull}.`;
  }

  if (topStates[0]) {
    return `${userFull} is not among the top listed destinations, so geographic fit needs an extra look.`;
  }

  return "Geographic fit is unclear from the data—use the funder’s own guidelines as the source of truth.";
}

function buildSizeSentence(desired: number, min: number, max: number): string {
  if (desired >= min && desired <= max) {
    return `Your requested amount (${formatUsd(desired)}) is within the typical grant range we see (${formatUsd(min)}–${formatUsd(max)}).`;
  }
  if (desired < min) {
    return `Your requested amount (${formatUsd(desired)}) is below that typical range (${formatUsd(min)}–${formatUsd(max)}); check whether smaller awards are offered.`;
  }
  return `Your requested amount (${formatUsd(desired)}) is above that typical range (${formatUsd(min)}–${formatUsd(max)}); they may still make occasional larger grants.`;
}

function pickSampleGrants(
  grants: Array<{
    taxYear?: number;
    amountNum: number;
    purpose?: string;
    purposeCategory?: string;
    recipientName?: string;
    recipientCity?: string;
    recipientState?: string;
  }>,
  desiredAmount: number
): SamplePastGrant[] {
  return [...grants]
    .sort((a, b) => Math.abs(a.amountNum - desiredAmount) - Math.abs(b.amountNum - desiredAmount))
    .slice(0, 3)
    .map((g, idx) => {
      const city = g.recipientCity?.trim();
      const st = g.recipientState?.trim();
      const loc =
        [city, st].filter(Boolean).join(", ") ||
        "Location not listed";
      return {
        id: `${g.taxYear ?? "y"}-${idx}-${g.amountNum}`,
        year: g.taxYear ?? new Date().getFullYear(),
        amountUsd: g.amountNum,
        grantTitle: g.purpose || "General support grant",
        purposeCategory: g.purposeCategory || "General",
        location: loc,
        recipientName: g.recipientName?.trim() || undefined,
        recipientCity: city || undefined,
        recipientState: st || undefined,
      };
    });
}

export async function getRecommendationsFromCsv(
  input: ToolInput,
  queryEmbedding: number[]
): Promise<RecommendationsResponse> {
  const { profiles, grantsByFunderEin } = await getRecommendationData();
  const cityLower = input.city.trim().toLowerCase();
  const stateUpper = input.state.trim().toUpperCase();

  const { topic, geo, size, sum } = computeWeights(input);
  const topicScores = computeTopicScores(queryEmbedding);

  const scored = profiles.map((p) => {
    const topicScore = topicScores.get(p.funderEin) ?? 0;

    const stateMatch = p.topStates.includes(stateUpper)
      ? 1
      : p.funderState === stateUpper
        ? 0.75
        : 0.15;
    const cityMatch = p.topCities.some((c) => c.toLowerCase().includes(cityLower)) ? 1 : 0;
    const geoScore = Math.min(1, stateMatch * 0.8 + cityMatch * 0.2);

    const typicalRange = buildTypicalRange(p.medianGrant, p.p75Grant, p.maxGrant);
    const sizeScore = grantSizeScore(input.desiredGrantAmount, typicalRange.min, typicalRange.max);

    const overall = (topicScore * topic + geoScore * geo + sizeScore * size) / sum;

    const grants = grantsByFunderEin.get(p.funderEin) ?? [];
    const samplePastGrants = pickSampleGrants(grants, input.desiredGrantAmount);
    const categories = uniqueTop(p.topPurposeCategories, 4);

    const topicSentence = buildTopicSentence(categories);
    const geoSentence = geographyFitSentence(p.topStates, stateUpper, p.shareInPa);
    const sizeSentence = buildSizeSentence(
      input.desiredGrantAmount,
      typicalRange.min,
      typicalRange.max
    );
    const whyRecommended = `${topicSentence} ${geoSentence} ${sizeSentence}`;

    const hqCity = p.funderCity?.trim();
    const hqState = p.funderState?.trim();
    const hqZip = p.funderZipcode?.trim();

    const recommendation: FunderRecommendation = {
      id: p.funderEin || p.funderName,
      name: p.funderName,
      ein: p.funderEin,
      headquarters:
        hqCity || hqState || hqZip
          ? { city: hqCity || undefined, state: hqState || undefined, zip: hqZip || undefined }
          : undefined,
      typicalGrantSizeUsd: typicalRange,
      geography: {
        summaryLine: geographyHeadline(p.topStates, stateUpper, p.shareInPa),
        topStates: p.topStates.slice(0, 5),
      },
      purposeCategories: categories.length ? categories : ["General"],
      whyRecommended,
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
