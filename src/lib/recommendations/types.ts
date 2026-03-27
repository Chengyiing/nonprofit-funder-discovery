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
  grantTitle: string;
  purposeCategory: string;
  location: string;
};

export type FundedGeography = {
  focusText: string; // e.g. "Often funds work across California"
  topStates: string[]; // state abbreviations
};

export type FunderRecommendation = {
  id: string;
  name: string;
  ein?: string;
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

