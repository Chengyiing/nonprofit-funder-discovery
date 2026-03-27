import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";

type CsvProfileRow = {
  funder_ein?: string;
  funder_name?: string;
  funder_state?: string;
  funder_zipcode?: string;
  website?: string;
  mission?: string;
  num_grants?: string;
  median_grant?: string;
  p75_grant?: string;
  max_grant?: string;
  top_states_str?: string;
  top_cities_str?: string;
  top_purpose_categories?: string;
  text_corpus?: string;
};

type CsvGrantRow = {
  funder_ein?: string;
  funder_name?: string;
  tax_year?: string;
  amount_num?: string;
  amount?: string;
  purpose?: string;
  purpose_category?: string;
  recipient_name?: string;
  recipient_city?: string;
  recipient_state?: string;
};

export type ProfileRecord = {
  funderEin: string;
  funderName: string;
  funderState?: string;
  funderZipcode?: string;
  website?: string;
  mission?: string;
  numGrants: number;
  medianGrant: number;
  p75Grant: number;
  maxGrant: number;
  topStates: string[];
  topCities: string[];
  topPurposeCategories: string[];
  textCorpus: string;
};

export type GrantRecord = {
  funderEin: string;
  funderName: string;
  taxYear?: number;
  amountNum: number;
  purpose?: string;
  purposeCategory?: string;
  recipientName?: string;
  recipientCity?: string;
  recipientState?: string;
};

export type RecommendationData = {
  profiles: ProfileRecord[];
  grantsByFunderEin: Map<string, GrantRecord[]>;
};

let cache: Promise<RecommendationData> | null = null;

function parseNumber(raw: unknown): number {
  const v = String(raw ?? "").replace(/[$,\s]/g, "");
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function splitToList(raw: unknown): string[] {
  const text = String(raw ?? "").trim();
  if (!text) return [];
  return text
    .split(/[|;,]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function toStateAbbrList(raw: unknown): string[] {
  return splitToList(raw).map((s) => s.toUpperCase());
}

function normalizeWebsite(raw: unknown): string | undefined {
  const text = String(raw ?? "").trim();
  if (!text) return undefined;
  if (text.startsWith("http://") || text.startsWith("https://")) return text;
  return `https://${text}`;
}

async function loadCsvData(): Promise<RecommendationData> {
  const profilePath = path.join(
    process.cwd(),
    "data",
    "raw",
    "funder_profile_final.csv"
  );
  const grantsPath = path.join(
    process.cwd(),
    "data",
    "raw",
    "final_grants_clean.csv"
  );

  const [profileCsv, grantsCsv] = await Promise.all([
    fs.readFile(profilePath, "utf-8"),
    fs.readFile(grantsPath, "utf-8"),
  ]);

  const profileRows = parse(profileCsv, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as CsvProfileRow[];

  const grantRows = parse(grantsCsv, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as CsvGrantRow[];

  const profiles = profileRows
    .map((r) => {
      const ein = String(r.funder_ein ?? "").trim();
      const name = String(r.funder_name ?? "").trim();
      if (!ein || !name) return null;

      const medianGrant = parseNumber(r.median_grant);
      const p75Grant = parseNumber(r.p75_grant);
      const maxGrant = parseNumber(r.max_grant);

      const profile: ProfileRecord = {
        funderEin: ein,
        funderName: name,
        funderState: String(r.funder_state ?? "").trim().toUpperCase() || undefined,
        funderZipcode: String(r.funder_zipcode ?? "").trim() || undefined,
        website: normalizeWebsite(r.website),
        mission: String(r.mission ?? "").trim() || undefined,
        numGrants: Math.max(0, Math.round(parseNumber(r.num_grants))),
        medianGrant,
        p75Grant,
        maxGrant,
        topStates: toStateAbbrList(r.top_states_str),
        topCities: splitToList(r.top_cities_str),
        topPurposeCategories: splitToList(r.top_purpose_categories),
        textCorpus: String(r.text_corpus ?? "").toLowerCase(),
      };

      return profile;
    })
    .filter((v): v is ProfileRecord => Boolean(v));

  const grantsByFunderEin = new Map<string, GrantRecord[]>();
  for (const r of grantRows) {
    const ein = String(r.funder_ein ?? "").trim();
    if (!ein) continue;

    const amountNum = parseNumber(r.amount_num || r.amount);
    const taxYearNum = Number(String(r.tax_year ?? "").trim());
    const record: GrantRecord = {
      funderEin: ein,
      funderName: String(r.funder_name ?? "").trim(),
      taxYear: Number.isFinite(taxYearNum) ? taxYearNum : undefined,
      amountNum,
      purpose: String(r.purpose ?? "").trim() || undefined,
      purposeCategory: String(r.purpose_category ?? "").trim() || undefined,
      recipientName: String(r.recipient_name ?? "").trim() || undefined,
      recipientCity: String(r.recipient_city ?? "").trim() || undefined,
      recipientState: String(r.recipient_state ?? "").trim().toUpperCase() || undefined,
    };

    const arr = grantsByFunderEin.get(ein) ?? [];
    arr.push(record);
    grantsByFunderEin.set(ein, arr);
  }

  return { profiles, grantsByFunderEin };
}

export function getRecommendationData(): Promise<RecommendationData> {
  if (!cache) cache = loadCsvData();
  return cache;
}

