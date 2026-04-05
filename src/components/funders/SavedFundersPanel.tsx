"use client";

import { useMemo, useState } from "react";
import { useSavedFunders } from "@/components/funders/SavedFundersContext";
import type { SavedFunderSnapshot } from "@/lib/savedFunders/storage";

function formatMoney(amountUsd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amountUsd);
}

function grantRange(s: SavedFunderSnapshot) {
  const { min, max, typical } = s.typicalGrantSizeUsd;
  const base = `${formatMoney(min)}–${formatMoney(max)}`;
  if (typical) return `${base} (median near ${formatMoney(typical)})`;
  return base;
}

function scrollToFunder(id: string) {
  const el = document.getElementById(`funder-${id}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.focus({ preventScroll: true });
  }
}

export default function SavedFundersPanel() {
  const { saved, remove, clearAll } = useSavedFunders();
  const [open, setOpen] = useState(true);
  const count = saved.length;

  const sorted = useMemo(
    () => [...saved].sort((a, b) => b.savedAt - a.savedAt),
    [saved]
  );

  return (
    <section
      aria-label="Saved funders shortlist"
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm ring-1 ring-[var(--border-subtle)]/35"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
            Saved funders
            {count > 0 ? (
              <span className="ml-1.5 font-mono text-xs font-medium tabular-nums text-[var(--foreground-muted)]">
                ({count})
              </span>
            ) : null}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {count > 0 ? (
            <>
              <button
                type="button"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.confirm("Remove all saved funders from this browser?")
                  ) {
                    clearAll();
                  }
                }}
                className="text-xs font-medium text-[var(--foreground-muted)] underline-offset-2 transition-colors hover:text-[var(--foreground-secondary)] hover:underline"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="inline-flex h-8 items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)]/80 px-2.5 text-xs font-medium text-[var(--foreground-secondary)] transition-colors hover:border-[var(--border)] hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/25"
              >
                {open ? "Hide" : "Show"}
              </button>
            </>
          ) : null}
        </div>
      </div>

      {open ? (
        <div className="px-4 py-4 sm:px-5 sm:py-5">
          {count === 0 ? (
            <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
              Save promising funders from your results to compare them later. Saved funders stay
              in this browser only.
            </p>
          ) : (
            <ul className="space-y-3">
              {sorted.map((s) => (
                <li
                  key={s.id}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/50 p-4 transition-shadow motion-safe:hover:shadow-[0_8px_24px_-18px_rgba(41,56,142,0.2)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold leading-snug text-[var(--foreground)]">
                        {s.name}
                      </div>
                      {s.locationLine ? (
                        <div className="mt-1 text-xs text-[var(--foreground-secondary)]">
                          {s.locationLine}
                        </div>
                      ) : null}
                      <div className="mt-2 text-xs font-medium text-[var(--foreground-muted)]">
                        Typical grant size
                      </div>
                      <div className="mt-0.5 text-sm font-semibold tabular-nums text-[var(--foreground)]">
                        {grantRange(s)}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--foreground-secondary)]">
                        {s.whySummary}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
                      <button
                        type="button"
                        onClick={() => scrollToFunder(s.id)}
                        title="Scrolls to this funder when it appears in your current results below"
                        className="inline-flex h-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30"
                      >
                        View details
                      </button>
                      {s.websiteUrl ? (
                        <a
                          href={s.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-9 items-center justify-center rounded-lg border border-[var(--accent)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30"
                        >
                          Visit website
                        </a>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => remove(s.id)}
                        className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-xs font-medium text-[var(--foreground-muted)] underline-offset-2 transition-colors hover:text-[var(--foreground-secondary)] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}
