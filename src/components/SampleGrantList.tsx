import type { SamplePastGrant } from "@/lib/recommendations/types";

function formatMoney(amountUsd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amountUsd);
}

function recipientLocation(g: SamplePastGrant): string | null {
  if (g.recipientCity || g.recipientState) {
    return [g.recipientCity, g.recipientState].filter(Boolean).join(", ");
  }
  if (g.location && g.location !== "Location not listed") return g.location;
  return null;
}

export default function SampleGrantList({
  grants,
}: {
  grants: SamplePastGrant[];
}) {
  if (grants.length === 0) return null;

  return (
    <div className="space-y-3">
      {grants.map((g) => {
        const loc = recipientLocation(g);
        const recipient =
          g.recipientName && g.recipientName.length > 0 ? g.recipientName : "Recipient not listed";

        return (
          <div
            key={g.id}
            className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200/80 pb-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Grant year
                </div>
                <div className="mt-0.5 text-base font-semibold tabular-nums text-zinc-900">
                  {g.year}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Amount
                </div>
                <div className="mt-0.5 text-base font-semibold tabular-nums text-zinc-900">
                  {formatMoney(g.amountUsd)}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-sm">
              <div>
                <div className="text-xs font-semibold text-zinc-500">Recipient</div>
                <div className="mt-0.5 font-medium leading-snug text-zinc-900">{recipient}</div>
              </div>
              {loc ? (
                <div>
                  <div className="text-xs font-semibold text-zinc-500">Location</div>
                  <div className="mt-0.5 text-zinc-700">{loc}</div>
                </div>
              ) : null}
              <div>
                <div className="text-xs font-semibold text-zinc-500">Purpose</div>
                <p className="mt-1 max-h-28 overflow-y-auto text-sm leading-relaxed text-zinc-700">
                  {g.grantTitle}
                </p>
              </div>
              <div className="pt-1">
                <span className="inline-block rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
                  {g.purposeCategory}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
