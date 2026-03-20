import type { FunderRecommendation } from "./types";

// Mock data for scaffolding. UI is structured so you can swap to a real
// recommendation service later without redesigning components.
export const MOCK_FUNDERS: Array<
  Omit<FunderRecommendation, "whyRecommended" | "samplePastGrants" | "outreachNextSteps"> & {
    seedTopicHints: string[];
    samplePastGrantsSeed: Array<{
      id: string;
      year: number;
      amountUsd: number;
      grantTitle: string;
      purposeCategory: string;
      location: string;
    }>;
    outreachHooksSeed: string[];
  }
> = [
  {
    id: "fdr-001",
    name: "North Star Community Grants",
    ein: "12-3456789",
    typicalGrantSizeUsd: { min: 25000, max: 150000, typical: 75000 },
    geography: {
      focusText: "Often supports work across the Western US",
      topStates: ["CA", "NV", "OR"],
    },
    purposeCategories: [
      "Youth & Education",
      "Workforce Development",
      "Community Safety",
    ],
    websiteUrl: "https://example.org/north-star",
    seedTopicHints: ["youth", "education", "workforce", "job training", "violence"],
    samplePastGrantsSeed: [
      {
        id: "fdr-001-g1",
        year: 2024,
        amountUsd: 80000,
        grantTitle: "After-School Learning & Mentorship",
        purposeCategory: "Youth & Education",
        location: "San Francisco, CA",
      },
      {
        id: "fdr-001-g2",
        year: 2023,
        amountUsd: 60000,
        grantTitle: "Pathways to Employment Program",
        purposeCategory: "Workforce Development",
        location: "Oakland, CA",
      },
      {
        id: "fdr-001-g3",
        year: 2022,
        amountUsd: 45000,
        grantTitle: "Community Violence Prevention Coaching",
        purposeCategory: "Community Safety",
        location: "Reno, NV",
      },
    ],
    outreachHooksSeed: [
      "Lead with prior youth outcomes and how you will measure results.",
      "Include a clear implementation timeline and staffing plan.",
      "Request the funder’s fit for similar youth programs in their region.",
    ],
  },
  {
    id: "fdr-002",
    name: "Cedar River Health & Opportunity Foundation",
    ein: "98-7654321",
    typicalGrantSizeUsd: { min: 10000, max: 90000, typical: 35000 },
    geography: {
      focusText: "Frequently funds programs in the Northeast corridor",
      topStates: ["NY", "NJ", "PA"],
    },
    purposeCategories: ["Health Access", "Housing Stability", "Family Support"],
    websiteUrl: "https://example.org/cedar-river",
    seedTopicHints: [
      "health",
      "housing",
      "families",
      "mental health",
      "case management",
    ],
    samplePastGrantsSeed: [
      {
        id: "fdr-002-g1",
        year: 2024,
        amountUsd: 52000,
        grantTitle: "Integrated Case Management for Families",
        purposeCategory: "Family Support",
        location: "Albany, NY",
      },
      {
        id: "fdr-002-g2",
        year: 2023,
        amountUsd: 31000,
        grantTitle: "Community Health Navigators",
        purposeCategory: "Health Access",
        location: "Newark, NJ",
      },
      {
        id: "fdr-002-g3",
        year: 2022,
        amountUsd: 42000,
        grantTitle: "Housing Stability Rapid Response",
        purposeCategory: "Housing Stability",
        location: "Philadelphia, PA",
      },
    ],
    outreachHooksSeed: [
      "Emphasize health access barriers and who your program serves.",
      "Show referral and service coordination steps.",
      "Ask whether they support your geography and funding range.",
    ],
  },
  {
    id: "fdr-003",
    name: "Atlas Climate Resilience Fund",
    ein: "11-2345678",
    typicalGrantSizeUsd: { min: 20000, max: 250000, typical: 120000 },
    geography: {
      focusText: "Supports climate resilience projects in multiple regions",
      topStates: ["WA", "CA", "AZ", "CO"],
    },
    purposeCategories: ["Climate Resilience", "Environmental Justice", "Community Planning"],
    websiteUrl: "https://example.org/atlas-climate",
    seedTopicHints: [
      "climate",
      "resilience",
      "environmental justice",
      "heat",
      "flood",
      "sustainability",
    ],
    samplePastGrantsSeed: [
      {
        id: "fdr-003-g1",
        year: 2024,
        amountUsd: 140000,
        grantTitle: "Neighborhood Heat Preparedness Playbook",
        purposeCategory: "Climate Resilience",
        location: "Seattle, WA",
      },
      {
        id: "fdr-003-g2",
        year: 2023,
        amountUsd: 98000,
        grantTitle: "Flood Risk Reduction & Community Outreach",
        purposeCategory: "Environmental Justice",
        location: "Los Angeles, CA",
      },
      {
        id: "fdr-003-g3",
        year: 2022,
        amountUsd: 76000,
        grantTitle: "Local Resilience Planning Toolkit",
        purposeCategory: "Community Planning",
        location: "Phoenix, AZ",
      },
    ],
    outreachHooksSeed: [
      "Describe the specific resilience hazard and affected community.",
      "Be explicit about how community input shapes outcomes.",
      "Share prior project results and readiness to scale.",
    ],
  },
  {
    id: "fdr-004",
    name: "Liberty Learning Civic Initiative",
    ein: "33-1122334",
    typicalGrantSizeUsd: { min: 15000, max: 120000, typical: 60000 },
    geography: {
      focusText: "National giving with strong interest in Midwest programs",
      topStates: ["IL", "IN", "MI", "OH"],
    },
    purposeCategories: ["Civic Engagement", "Education Equity", "Digital Access"],
    websiteUrl: "https://example.org/liberty-learning",
    seedTopicHints: [
      "civic",
      "engagement",
      "equity",
      "education",
      "digital literacy",
      "community",
    ],
    samplePastGrantsSeed: [
      {
        id: "fdr-004-g1",
        year: 2024,
        amountUsd: 65000,
        grantTitle: "Voter Access & Civic Skills Workshops",
        purposeCategory: "Civic Engagement",
        location: "Chicago, IL",
      },
      {
        id: "fdr-004-g2",
        year: 2023,
        amountUsd: 42000,
        grantTitle: "Digital Literacy for Families",
        purposeCategory: "Digital Access",
        location: "Indianapolis, IN",
      },
      {
        id: "fdr-004-g3",
        year: 2022,
        amountUsd: 53000,
        grantTitle: "Education Equity Coaching Program",
        purposeCategory: "Education Equity",
        location: "Detroit, MI",
      },
    ],
    outreachHooksSeed: [
      "Frame your work as civic capacity-building with measurable outputs.",
      "Clarify your target participants and recruitment approach.",
      "Ask for guidance on eligibility and the best application route.",
    ],
  },
  {
    id: "fdr-005",
    name: "Harbor Lights Youth Mentoring Alliance",
    ein: "44-5566778",
    typicalGrantSizeUsd: { min: 5000, max: 60000, typical: 22000 },
    geography: {
      focusText: "Often funds youth mentoring and family supports in coastal areas",
      topStates: ["MA", "CT", "RI", "NY"],
    },
    purposeCategories: ["Youth & Education", "Family Support", "Community Safety"],
    websiteUrl: "https://example.org/harbor-lights",
    seedTopicHints: [
      "mentoring",
      "youth",
      "family support",
      "after school",
      "tutoring",
      "safety",
    ],
    samplePastGrantsSeed: [
      {
        id: "fdr-005-g1",
        year: 2024,
        amountUsd: 28000,
        grantTitle: "Mentor Training and Youth Pairing",
        purposeCategory: "Youth & Education",
        location: "Boston, MA",
      },
      {
        id: "fdr-005-g2",
        year: 2023,
        amountUsd: 19500,
        grantTitle: "After-School Tutoring for At-Risk Students",
        purposeCategory: "Youth & Education",
        location: "Hartford, CT",
      },
      {
        id: "fdr-005-g3",
        year: 2022,
        amountUsd: 24000,
        grantTitle: "Family Support Navigation Services",
        purposeCategory: "Family Support",
        location: "Providence, RI",
      },
    ],
    outreachHooksSeed: [
      "Highlight your mentoring model and what makes it evidence-informed.",
      "Include youth outcomes and retention plans.",
      "Ask whether they fund programs at your approximate grant range.",
    ],
  },
  {
    id: "fdr-006",
    name: "Summit Food Systems & Justice Fund",
    ein: "77-8899001",
    typicalGrantSizeUsd: { min: 15000, max: 140000, typical: 65000 },
    geography: {
      focusText: "Supports food systems work in parts of the South and Southwest",
      topStates: ["TX", "NM", "AZ", "GA"],
    },
    purposeCategories: ["Food Security", "Public Health", "Community Organizing"],
    websiteUrl: "https://example.org/summit-food",
    seedTopicHints: [
      "food",
      "food security",
      "hunger",
      "nutrition",
      "community gardens",
      "public health",
    ],
    samplePastGrantsSeed: [
      {
        id: "fdr-006-g1",
        year: 2024,
        amountUsd: 72000,
        grantTitle: "Healthy Food Access & Nutrition Navigation",
        purposeCategory: "Public Health",
        location: "Atlanta, GA",
      },
      {
        id: "fdr-006-g2",
        year: 2023,
        amountUsd: 56000,
        grantTitle: "Community Garden Workforce Pathways",
        purposeCategory: "Community Organizing",
        location: "Austin, TX",
      },
      {
        id: "fdr-006-g3",
        year: 2022,
        amountUsd: 49000,
        grantTitle: "Hunger Relief Logistics Improvements",
        purposeCategory: "Food Security",
        location: "Albuquerque, NM",
      },
    ],
    outreachHooksSeed: [
      "Explain your service model and how you measure food access outcomes.",
      "Emphasize community partnerships and sustained distribution.",
      "Request alignment with similar prior food systems work.",
    ],
  },
];

