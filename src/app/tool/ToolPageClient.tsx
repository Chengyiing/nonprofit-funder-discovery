"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import FunderSearchForm from "@/components/search/FunderSearchForm";
import FunderResultCard from "@/components/funders/FunderResultCard";
import type {
  FunderRecommendation,
  RecommendationsResponse,
  ToolInput,
} from "@/lib/recommendations/types";
import ExplanationBlock from "@/components/ExplanationBlock";

function ResultsSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
        >
          <div className="h-4 w-1/3 rounded bg-[var(--border)]" />
          <div className="mt-3 h-6 w-2/3 rounded bg-[var(--border)]" />
          <div className="mt-4 h-4 w-5/6 rounded bg-[var(--border-subtle)]" />
          <div className="mt-3 h-4 w-4/6 rounded bg-[var(--border-subtle)]" />
          <div className="mt-6 h-36 w-full rounded-xl bg-[var(--surface-muted)]" />
        </div>
      ))}
    </div>
  );
}

export default function ToolPageClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<FunderRecommendation[]>([]);
  const [noGoodMatchesFound, setNoGoodMatchesFound] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"csv_profile" | undefined>(undefined);

  const summaryLine = useMemo(() => {
    if (!generatedAt) return "";
    const when = new Date(generatedAt);
    return `Generated ${when.toLocaleString()}.`;
  }, [generatedAt]);

  async function handleSearch(input: ToolInput) {
    setLoading(true);
    setError(null);
    setResults([]);
    setNoGoodMatchesFound(false);
    setGeneratedAt(null);
    setDataSource(undefined);

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      });

      const dataJson: unknown = await res.json();

      if (!res.ok) {
        const maybeErr = dataJson as { error?: string } | undefined;
        setError(
          maybeErr && typeof maybeErr.error === "string" && maybeErr.error
            ? maybeErr.error
            : "Request failed."
        );
        return;
      }

      const data = dataJson as RecommendationsResponse;
      setResults(Array.isArray(data.results) ? data.results : []);
      setNoGoodMatchesFound(Boolean(data.noGoodMatchesFound));
      setGeneratedAt(typeof data.generatedAt === "string" ? data.generatedAt : null);
      setDataSource(data.dataSource === "csv_profile" ? "csv_profile" : undefined);
    } catch {
      setError("Something went wrong while generating recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pb-16 pt-8 sm:pb-24 sm:pt-12">
      <Container>
        <div className="flex flex-col gap-12">
          <section className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] via-[var(--surface-hero)] to-[var(--surface-muted)] p-7 shadow-sm sm:p-10">
            <div className="max-w-3xl space-y-5">
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-[2.125rem] sm:leading-tight">
                Match funders to your nonprofit’s funding need
              </h1>
              <p className="text-base leading-relaxed text-[var(--foreground-secondary)]">
                Enter a few details. You’ll get a ranked shortlist with clear
                explanations, example past grants, and outreach next steps.
              </p>

              <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">
                No guarantee of funding. Always verify eligibility and guidelines on each
                funder’s website.
              </p>
            </div>
          </section>

          <FunderSearchForm onSearch={handleSearch} isLoading={loading} />

          <section aria-label="Funder recommendations" className="space-y-8">
            {loading ? (
              <ResultsSkeleton />
            ) : error ? (
              <div className="rounded-2xl border border-red-200/90 bg-red-50 p-5 text-sm text-red-900">
                {error}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-8">
                <ExplanationBlock title="How to use these results">
                  Treat recommendations as decision support. Start your outreach
                  with the top-ranked funders, review eligibility, and adjust
                  your messaging to match the funder’s past work.
                </ExplanationBlock>

                <ol className="space-y-5" aria-label="Ranked funders">
                  {results.map((r, idx) => (
                    <li key={r.id}>
                      <FunderResultCard result={r} rank={idx + 1} />
                    </li>
                  ))}
                </ol>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
                  <div className="text-sm font-semibold text-[var(--foreground)]">
                    Next-step outreach guidance
                  </div>
                  <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                    <li className="mb-1">
                      Write a short inquiry that states your mission, geography,
                      and desired amount.
                    </li>
                    <li className="mb-1">
                      Reference one example past grant from the funder’s
                      history to show fit.
                    </li>
                    <li className="mb-1">
                      Ask for the right application route and confirm eligibility
                      requirements.
                    </li>
                  </ul>

                  <div className="mt-4 text-xs text-[var(--foreground-muted)]">
                    {summaryLine}
                    {dataSource === "csv_profile"
                      ? " Recommendations are generated from funder_profile_final.csv and final_grants_clean.csv."
                      : null}
                  </div>
                </div>
              </div>
            ) : noGoodMatchesFound ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm">
                <div className="text-lg font-semibold text-[var(--foreground)]">
                  No good matches found (yet)
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-secondary)]">
                  Try adjusting your keywords and mission context, or open “Fine-tune the match” to stress mission fit, local fit, or grant size fit.
                </p>
                <div className="mt-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/80 p-5 text-sm text-[var(--foreground-secondary)]">
                  Suggestions:
                  <ul className="mt-2 list-disc pl-5">
                    <li className="mb-1">Use 3–6 keywords (e.g., “housing stability”, “case management”).</li>
                    <li className="mb-1">Make the mission context 1–2 sentences with target population.</li>
                    <li className="mb-1">Check the grant amount is realistic for your request.</li>
                  </ul>
                </div>
                <div className="mt-4 text-xs text-[var(--foreground-muted)]">
                  Try broadening issue keywords and adding more mission context for better matches.
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </Container>
    </div>
  );
}
