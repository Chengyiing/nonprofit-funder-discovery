import type { SamplePastGrant } from "@/lib/recommendations/types";

function formatMoney(amountUsd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amountUsd);
}

export default function SampleGrantList({
  grants,
}: {
  grants: SamplePastGrant[];
}) {
  if (grants.length === 0) return null;

  return (
    <div className="space-y-2">
      {grants.map((g) => (
        <div key={g.id} className="rounded-lg border border-zinc-200 bg-white p-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <div className="text-sm font-semibold text-zinc-900">
              {g.grantTitle}
            </div>
            <div className="text-sm font-semibold text-zinc-700">
              {formatMoney(g.amountUsd)}
            </div>
          </div>
          <div className="mt-1 text-xs text-zinc-600">
            {g.purposeCategory} · {g.location} · {g.year}
          </div>
        </div>
      ))}
    </div>
  );
}

