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
    <div className="space-y-4">
      {grants.map((g) => {
        const loc = recipientLocation(g);
        const recipient =
          g.recipientName && g.recipientName.length > 0 ? g.recipientName : "Recipient not listed";

        return (
          <div
            key={g.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_1px_0_0_rgba(41,56,142,0.04)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
                  Grant year
                </div>
                <div className="mt-0.5 text-base font-semibold tabular-nums text-[var(--foreground)]">
                  {g.year}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
                  Amount
                </div>
                <div className="mt-0.5 text-base font-semibold tabular-nums text-[var(--foreground)]">
                  {formatMoney(g.amountUsd)}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2.5 text-sm">
              <div>
                <div className="text-xs font-semibold text-[var(--foreground-muted)]">Recipient</div>
                <div className="mt-0.5 font-medium leading-snug text-[var(--foreground)]">{recipient}</div>
              </div>
              {loc ? (
                <div>
                  <div className="text-xs font-semibold text-[var(--foreground-muted)]">Location</div>
                  <div className="mt-0.5 text-[var(--foreground-secondary)]">{loc}</div>
                </div>
              ) : null}
              <div>
                <div className="text-xs font-semibold text-[var(--foreground-muted)]">Purpose</div>
                <p className="mt-1 max-h-28 overflow-y-auto text-sm leading-relaxed text-[var(--foreground-secondary)]">
                  {g.grantTitle}
                </p>
              </div>
              <div className="pt-1">
                <span className="inline-block rounded-full border border-[var(--border-subtle)] bg-[var(--surface-muted)]/80 px-2.5 py-0.5 text-xs font-semibold text-[var(--foreground-secondary)]">
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
