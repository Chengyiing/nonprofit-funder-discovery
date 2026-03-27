import type { FunderRecommendation } from "@/lib/recommendations/types";
import ExplanationBlock from "@/components/ExplanationBlock";
import SampleGrantList from "@/components/SampleGrantList";

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
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Rank #{rank}
            </div>
            <h3 className="mt-1 text-xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-2xl">
              {result.name}
            </h3>
            {hqLine ? (
              <div className="mt-2 text-sm text-zinc-600">{hqLine}</div>
            ) : null}
            {result.ein ? (
              <div className="mt-1.5 text-xs text-zinc-500">EIN {result.ein}</div>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
            {result.websiteUrl ? (
              <a
                href={result.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-300/90 bg-white px-4 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)]/35 hover:bg-[var(--surface-warm)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 focus-visible:ring-offset-2"
              >
                Visit website
              </a>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Typical grant size
          </div>
          <div className="mt-1 text-lg font-semibold text-zinc-900">
            {formatMoney(typicalGrantSizeUsd.min)}–{formatMoney(typicalGrantSizeUsd.max)}
            {typicalGrantSizeUsd.typical ? (
              <span className="ml-2 text-base font-normal text-zinc-600">
                (median near {formatMoney(typicalGrantSizeUsd.typical)})
              </span>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-zinc-200 bg-white px-3 py-3">
          <p className="text-sm font-medium leading-relaxed text-zinc-800">
            {geography.summaryLine}
          </p>
          {geography.topStates.length ? (
            <div className="mt-3">
              <div className="text-xs font-medium text-zinc-500">
                Where past grants went most often (in this dataset)
              </div>
              <div className="mt-2 flex flex-wrap gap-2" role="list" aria-label="Top grant destination states">
                {geography.topStates.map((st) => (
                  <span
                    key={st}
                    role="listitem"
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-semibold text-zinc-700"
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
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700"
            >
              {cat}
            </span>
          ))}
        </div>

        <ExplanationBlock title="Why this was recommended">
          {result.whyRecommended}
        </ExplanationBlock>

        <div className="space-y-3">
          <div>
            <div className="text-sm font-semibold text-zinc-900">A few past grants</div>
            <div className="mt-1 text-xs text-zinc-600">
              Example grants from public records.
            </div>
          </div>
          <SampleGrantList grants={result.samplePastGrants} />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-zinc-900">Suggested outreach next steps</div>
          <ul className="list-disc pl-5 text-sm text-zinc-700">
            {result.outreachNextSteps.map((s, i) => (
              <li key={`${result.id}-os-${i}`} className="mb-1">
                {s}
              </li>
            ))}
          </ul>
          <div className="text-xs text-zinc-500">
            Tip: always confirm eligibility and submission guidelines on the funder’s website.
          </div>
        </div>
      </div>
    </article>
  );
}
