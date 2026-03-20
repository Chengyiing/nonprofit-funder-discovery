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

export default function FunderResultCard({
  result,
  rank,
}: {
  result: FunderRecommendation;
  rank: number;
}) {
  const { typicalGrantSizeUsd, geography } = result;

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-zinc-700">
              Rank #{rank}
            </div>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900">
              {result.name}
            </h3>

            {result.ein ? (
              <div className="mt-1 text-sm text-zinc-600">
                EIN: {result.ein}
              </div>
            ) : null}
          </div>

          {result.websiteUrl ? (
            <a
              href={result.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
            >
              Visit website
            </a>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-sm text-zinc-700">
            Typical grant size:{" "}
            <span className="font-semibold text-zinc-900">
              {formatMoney(typicalGrantSizeUsd.min)}–{formatMoney(typicalGrantSizeUsd.max)}
            </span>
            {typicalGrantSizeUsd.typical ? (
              <span className="text-zinc-600">
                {" "}
                (about {formatMoney(typicalGrantSizeUsd.typical)})
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {geography.topStates.map((st) => (
              <span
                key={st}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700"
              >
                {st}
              </span>
            ))}
          </div>
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
            <div className="text-sm font-semibold text-zinc-900">
              A few past grants
            </div>
            <div className="mt-1 text-xs text-zinc-600">
              Example grants from public records (mock data in this scaffold).
            </div>
          </div>
          <SampleGrantList grants={result.samplePastGrants} />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-zinc-900">
            Suggested outreach next steps
          </div>
          <ul className="list-disc pl-5 text-sm text-zinc-700">
            {result.outreachNextSteps.map((s, i) => (
              <li key={`${result.id}-os-${i}`} className="mb-1">
                {s}
              </li>
            ))}
          </ul>
          <div className="text-xs text-zinc-500">
            Tip: always confirm eligibility and submission guidelines on the
            funder’s website.
          </div>
        </div>
      </div>
    </article>
  );
}

