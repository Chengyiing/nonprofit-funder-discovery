"use client";

import { useMemo, useState } from "react";
import type { ToolAdvancedSettings, ToolInput } from "@/lib/recommendations/types";

const US_STATES: Array<{ abbr: string; name: string }> = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
];

const defaultAdvanced: ToolAdvancedSettings = {
  topicSimilarityWeight: 60,
  geographyWeight: 25,
  grantSizeWeight: 15,
};

export default function FunderSearchForm({
  onSearch,
  isLoading,
}: {
  onSearch: (input: ToolInput) => Promise<void> | void;
  isLoading?: boolean;
}) {
  const [keywords, setKeywords] = useState("");
  const [missionContext, setMissionContext] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("PA");
  const [desiredGrantAmount, setDesiredGrantAmount] = useState<number | "">("");
  const [annualOperatingBudget, setAnnualOperatingBudget] = useState<
    number | ""
  >("");

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advanced, setAdvanced] = useState<ToolAdvancedSettings>(defaultAdvanced);

  const [error, setError] = useState<string | null>(null);

  const advancedSummary = useMemo(() => {
    return `Mission fit ${advanced.topicSimilarityWeight} · Local fit ${advanced.geographyWeight} · Grant size fit ${advanced.grantSizeWeight}`;
  }, [advanced]);

  const canSubmit =
    keywords.trim().length >= 2 &&
    missionContext.trim().length >= 10 &&
    city.trim().length >= 2 &&
    typeof desiredGrantAmount === "number" &&
    desiredGrantAmount >= 1000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError("Please fill in the required fields (including a grant amount of at least $1,000).");
      return;
    }

    const payload: ToolInput = {
      keywords: keywords.trim(),
      missionContext: missionContext.trim(),
      city: city.trim(),
      state: state.trim().toUpperCase(),
      desiredGrantAmount: desiredGrantAmount as number,
      annualOperatingBudget:
        typeof annualOperatingBudget === "number"
          ? annualOperatingBudget
          : undefined,
      advanced: advanced,
    };

    await onSearch(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Funder search form">
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Describe your funding need
          </h2>
          <p className="text-sm text-zinc-600">
            Keep it simple. You can add more detail later.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-zinc-900">
              Issue area / keywords
              <div className="mt-1 text-xs font-normal text-zinc-600">
                Examples: “youth mentoring”, “food security”, “housing stability”
              </div>
              <input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                type="text"
                name="keywords"
                placeholder="e.g., youth mentoring, after-school learning"
                className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                aria-required="true"
              />
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-zinc-900">
              Short mission / context
              <textarea
                value={missionContext}
                onChange={(e) => setMissionContext(e.target.value)}
                name="missionContext"
                placeholder="Briefly describe your mission, target population, and what the grant will fund."
                rows={4}
                className="mt-2 w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                aria-required="true"
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-zinc-900">
            City
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              name="city"
              placeholder="e.g., Pittsburgh"
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              aria-required="true"
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-900">
            State
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              name="state"
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              aria-required="true"
            >
              {US_STATES.map((st) => (
                <option key={st.abbr} value={st.abbr}>
                  {st.name} ({st.abbr})
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold text-zinc-900">
            Desired grant amount (USD)
            <input
              value={desiredGrantAmount}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "") return setDesiredGrantAmount("");
                const num = Number(v);
                setDesiredGrantAmount(Number.isFinite(num) ? num : "");
              }}
              type="number"
              inputMode="numeric"
              name="desiredGrantAmount"
              min={1000}
              step={1000}
              placeholder="e.g., 50000"
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              aria-required="true"
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-900">
            Annual operating budget (optional)
            <input
              value={annualOperatingBudget}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "") return setAnnualOperatingBudget("");
                const num = Number(v);
                setAnnualOperatingBudget(Number.isFinite(num) ? num : "");
              }}
              type="number"
              inputMode="numeric"
              name="annualOperatingBudget"
              min={0}
              step={1000}
              placeholder="e.g., 250000"
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
            <div className="mt-1 text-xs font-normal text-zinc-600">
              Helps matching when available, but not required.
            </div>
          </label>
        </div>

        <details
          className="mt-5 rounded-2xl border border-zinc-200/90 bg-[var(--surface-warm)]/80 px-4 py-3"
          open={advancedOpen}
          onToggle={(e) => setAdvancedOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary className="cursor-pointer select-none text-sm font-semibold text-zinc-900">
            Fine-tune the match (optional)
            <span className="ml-2 text-xs font-semibold text-zinc-600">
              {advancedSummary}
            </span>
          </summary>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                How important is mission / topic fit?
                <div className="text-xs text-zinc-600">
                  Higher = put more weight on whether the funder’s past giving looks like your issue area
                </div>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={advanced.topicSimilarityWeight}
                onChange={(e) =>
                  setAdvanced((a) => ({
                    ...a,
                    topicSimilarityWeight: Number(e.target.value),
                  }))
                }
                className="mt-2 w-full accent-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                How important is local fit?
                <div className="text-xs text-zinc-600">
                  Higher = favor funders that already show grant activity in your state
                </div>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={advanced.geographyWeight}
                onChange={(e) =>
                  setAdvanced((a) => ({
                    ...a,
                    geographyWeight: Number(e.target.value),
                  }))
                }
                className="mt-2 w-full accent-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                How important is grant size fit?
                <div className="text-xs text-zinc-600">
                  Higher = favor funders whose typical grant sizes are closer to the amount you entered
                </div>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={advanced.grantSizeWeight}
                onChange={(e) =>
                  setAdvanced((a) => ({
                    ...a,
                    grantSizeWeight: Number(e.target.value),
                  }))
                }
                className="mt-2 w-full accent-[var(--accent)]"
              />
            </div>
          </div>
        </details>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-zinc-500">
            We’ll use your inputs to find a ranked shortlist and clear explanations.
          </div>
          <button
            type="submit"
            disabled={isLoading || !canSubmit}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35 focus-visible:ring-offset-2"
          >
            {isLoading ? "Finding funders..." : "Try matching"}
          </button>
        </div>
      </div>
    </form>
  );
}

