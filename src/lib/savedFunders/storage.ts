import type { FunderRecommendation } from "@/lib/recommendations/types";

export const SAVED_FUNDERS_STORAGE_KEY = "funder-compass-saved-funders-v1";

export type SavedFunderSnapshot = {
  id: string;
  name: string;
  locationLine: string | null;
  typicalGrantSizeUsd: {
    min: number;
    max: number;
    typical?: number;
  };
  /** One-line summary for the shortlist (truncated rationale) */
  whySummary: string;
  websiteUrl?: string;
  savedAt: number;
};

function truncateText(text: string, maxLen: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, Math.max(0, maxLen - 1)).trim()}…`;
}

function locationFromResult(result: FunderRecommendation): string | null {
  const hq = result.headquarters;
  if (!hq) return null;
  const cityState = [hq.city, hq.state].filter(Boolean).join(", ");
  if (cityState && hq.zip) return `${cityState} ${hq.zip}`;
  if (cityState) return cityState;
  return hq.zip ?? null;
}

export function snapshotFromRecommendation(
  result: FunderRecommendation
): SavedFunderSnapshot {
  return {
    id: result.id,
    name: result.name,
    locationLine: locationFromResult(result),
    typicalGrantSizeUsd: {
      min: result.typicalGrantSizeUsd.min,
      max: result.typicalGrantSizeUsd.max,
      typical: result.typicalGrantSizeUsd.typical,
    },
    whySummary: truncateText(result.whyRecommended, 180),
    websiteUrl: result.websiteUrl,
    savedAt: Date.now(),
  };
}

export function loadSavedFunders(): SavedFunderSnapshot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_FUNDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidSnapshot);
  } catch {
    return [];
  }
}

function isValidSnapshot(x: unknown): x is SavedFunderSnapshot {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    o.typicalGrantSizeUsd !== null &&
    typeof o.typicalGrantSizeUsd === "object" &&
    typeof (o.typicalGrantSizeUsd as { min?: unknown }).min === "number" &&
    typeof (o.typicalGrantSizeUsd as { max?: unknown }).max === "number" &&
    typeof o.whySummary === "string" &&
    typeof o.savedAt === "number"
  );
}

export function persistSavedFunders(list: SavedFunderSnapshot[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SAVED_FUNDERS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* quota or private mode */
  }
}

export function upsertSaved(
  list: SavedFunderSnapshot[],
  snapshot: SavedFunderSnapshot
): SavedFunderSnapshot[] {
  const without = list.filter((s) => s.id !== snapshot.id);
  return [...without, { ...snapshot, savedAt: snapshot.savedAt }];
}

export function removeSaved(
  list: SavedFunderSnapshot[],
  id: string
): SavedFunderSnapshot[] {
  return list.filter((s) => s.id !== id);
}
