export type ToolAdvancedSettings = {
  topicSimilarityWeight: number; // 0..100
  geographyWeight: number; // 0..100
  grantSizeWeight: number; // 0..100
};

export type ToolInput = {
  keywords: string;
  missionContext: string;
  city: string;
  state: string; // 2-letter uppercase
  desiredGrantAmount: number; // USD
  annualOperatingBudget?: number; // USD (optional)
  advanced?: Partial<ToolAdvancedSettings>;
};

export type SamplePastGrant = {
  id: string;
  year: number;
  amountUsd: number;
  /** Primary purpose / description text from grant records */
  grantTitle: string;
  purposeCategory: string;
  /** @deprecated Prefer recipientCity, recipientState, recipientName */
  location: string;
  recipientName?: string;
  recipientCity?: string;
  recipientState?: string;
};

export type FundedGeography = {
  /** Short, plain-language read on where this funder’s recorded grants tend to go */
  summaryLine: string;
  topStates: string[]; // state abbreviations (supporting detail)
};

export type FunderRecommendation = {
  id: string;
  name: string;
  ein?: string;
  /** Funder headquarters from profile data, when present */
  headquarters?: {
    city?: string;
    state?: string;
    zip?: string;
  };
  typicalGrantSizeUsd: {
    min: number;
    max: number;
    typical?: number;
  };
  geography: FundedGeography;
  purposeCategories: string[];
  whyRecommended: string;
  samplePastGrants: SamplePastGrant[];
  websiteUrl?: string;
  outreachNextSteps: string[];
};

export type RecommendationsResponse = {
  results: FunderRecommendation[];
  noGoodMatchesFound: boolean;
  generatedAt: string;
  dataSource?: "csv_profile";
};

