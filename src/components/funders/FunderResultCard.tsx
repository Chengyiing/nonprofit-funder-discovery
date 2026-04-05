import type { FunderRecommendation } from "@/lib/recommendations/types";
import ExplanationBlock from "@/components/ExplanationBlock";
import SampleGrantList from "@/components/SampleGrantList";
import FunderSaveControl from "@/components/funders/FunderSaveControl";

function formatMoney(amountUsd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amountUsd);
}

function formatHeadquarters(hq: NonNullable<FunderRecommendation["headquarters"]>) {
  const cityState = [hq.city, hq.state].filter(Boolean).join(", ");
  if (cityState && hq.zip) return `${cityState} ${hq.zip}`;
  if (cityState) return cityState;
  return hq.zip ?? null;
}

export default function FunderResultCard({
  result,
  rank,
}: {
  result: FunderRecommendation;
  rank: number;
}) {
  const { typicalGrantSizeUsd, geography } = result;
  const hqLine = result.headquarters ? formatHeadquarters(result.headquarters) : null;

  return (
    <article
      id={`funder-${result.id}`}
      tabIndex={-1}
      className="relative scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm ring-1 ring-[var(--border-subtle)]/40 transition-shadow motion-safe:hover:shadow-[0_16px_40px_-28px_rgba(41,56,142,0.18)]"
    >
      <div className="absolute right-4 top-4 z-10 sm:right-5 sm:top-5">
        <FunderSaveControl result={result} />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:pr-12">
          <div className="min-w-0 flex-1 pr-12 sm:pr-0">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
              Rank #{rank}
            </div>
            <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-[var(--foreground)] sm:text-2xl">
              {result.name}
            </h3>
            {hqLine ? (
              <div className="mt-2 text-sm text-[var(--foreground-secondary)]">{hqLine}</div>
            ) : null}
            {result.ein ? (
              <div className="mt-1.5 text-xs text-[var(--foreground-muted)]">EIN {result.ein}</div>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
            {result.websiteUrl ? (
              <a
                href={result.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[var(--accent)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Visit website
              </a>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/80 px-4 py-3.5">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
            Typical grant size
          </div>
          <div className="mt-1.5 text-lg font-semibold tabular-nums text-[var(--foreground)]">
            {formatMoney(typicalGrantSizeUsd.min)}–{formatMoney(typicalGrantSizeUsd.max)}
            {typicalGrantSizeUsd.typical ? (
              <span className="ml-2 text-base font-normal text-[var(--foreground-secondary)]">
                (median near {formatMoney(typicalGrantSizeUsd.typical)})
              </span>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-4">
          <p className="text-sm font-medium leading-relaxed text-[var(--foreground)]">
            {geography.summaryLine}
          </p>
          {geography.topStates.length ? (
            <div className="mt-4">
              <div className="text-xs font-medium text-[var(--foreground-muted)]">
                Where past grants went most often (in this dataset)
              </div>
              <div className="mt-2 flex flex-wrap gap-2" role="list" aria-label="Top grant destination states">
                {geography.topStates.map((st) => (
                  <span
                    key={st}
                    role="listitem"
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-muted)]/90 px-2.5 py-0.5 text-xs font-semibold text-[var(--foreground-secondary)]"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {result.purposeCategories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-muted)]/70 px-3 py-1 text-xs font-semibold text-[var(--foreground-secondary)]"
            >
              {cat}
            </span>
          ))}
        </div>

        <ExplanationBlock title="Why this was recommended">
          {result.whyRecommended}
        </ExplanationBlock>

        <div className="space-y-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/40 p-5">
          <div>
            <div className="text-sm font-semibold text-[var(--foreground)]">A few past grants</div>
            <div className="mt-1 text-xs text-[var(--foreground-muted)]">
              Example grants from public records.
            </div>
          </div>
          <SampleGrantList grants={result.samplePastGrants} />
        </div>

        <div className="space-y-2 border-t border-[var(--border-subtle)] pt-5">
          <div className="text-sm font-semibold text-[var(--foreground)]">Suggested outreach next steps</div>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-[var(--foreground-secondary)]">
            {result.outreachNextSteps.map((s, i) => (
              <li key={`${result.id}-os-${i}`} className="mb-1">
                {s}
              </li>
            ))}
          </ul>
          <div className="text-xs text-[var(--foreground-muted)]">
            Tip: always confirm eligibility and submission guidelines on the funder’s website.
          </div>
        </div>
      </div>
    </article>
  );
}
