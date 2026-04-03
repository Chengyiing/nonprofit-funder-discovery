/**
 * Single illustrative result preview — minimal chrome, product-forward.
 * Warm accent: thin left edge only (see border-l).
 */
export default function HomeHeroPreview() {
  return (
    <div className="relative flex w-full max-w-md flex-col lg:max-w-none">
      <div
        className="pointer-events-none absolute -right-8 top-4 h-36 w-36 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex w-full flex-col">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] border-l-[3px] border-l-[var(--warm-accent)]/42 bg-[var(--surface)] shadow-[0_12px_40px_-24px_rgba(41,56,142,0.14)]">
          <div className="space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 text-[0.6875rem] text-[var(--foreground-muted)]">
              <span className="font-mono tabular-nums text-[var(--foreground-secondary)]">
                youth mentoring
              </span>
              <span className="text-[var(--border)]" aria-hidden>
                ·
              </span>
              <span className="font-mono tabular-nums text-[var(--foreground-secondary)]">
                Pittsburgh, PA
              </span>
            </div>

            <div className="border-t border-[var(--border-subtle)] pt-4">
              <div className="text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[var(--foreground-muted)]">
                Rank 1
              </div>
              <div className="mt-2 text-base font-semibold leading-snug tracking-tight text-[var(--foreground)]">
                Riverside Community Foundation
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                PA youth grants; typical award sizes near your request.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)]/60 px-3 py-2.5">
                <div className="text-[0.625rem] font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
                  Typical grant size
                </div>
                <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-[var(--foreground)]">
                  $25k–$75k
                </div>
              </div>
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2.5">
                <div className="text-[0.625rem] font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
                  Suggested next step
                </div>
                <p className="mt-1 text-xs leading-snug text-[var(--foreground-secondary)]">
                  Confirm eligibility, then brief inquiry.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {["Youth programs", "Pennsylvania"].map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[var(--border-subtle)] bg-[var(--surface-muted)]/50 px-2 py-0.5 text-[0.625rem] text-[var(--foreground-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-3 text-[0.6875rem] leading-snug text-[var(--foreground-muted)] lg:text-right">
          Illustrative preview — not live data.
        </p>
      </div>
    </div>
  );
}
