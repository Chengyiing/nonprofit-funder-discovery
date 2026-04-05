/**
 * Stylized sample output — mirrors the tool card structure without live data.
 */
export default function HomeHeroPreview() {
  return (
    <div className="relative flex w-full max-w-md flex-col lg:max-w-none">
      <div
        className="pointer-events-none absolute -right-10 top-6 h-40 w-40 rounded-full bg-[var(--accent-secondary)]/8 blur-3xl"
        aria-hidden
      />

      <div className="relative flex w-full flex-col">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] border-l-[3px] border-l-[var(--warm-accent)]/45 bg-[var(--surface)] shadow-[0_20px_56px_-36px_rgba(41,56,142,0.22)] ring-1 ring-[var(--border-subtle)]/50 motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_24px_64px_-34px_rgba(41,56,142,0.26)]">
          <div className="border-b border-[var(--border-subtle)] bg-[var(--surface-muted)]/45 px-5 py-3.5 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
                Match preview
              </span>
              <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[0.625rem] tabular-nums text-[var(--foreground-secondary)]">
                Rank 1
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] text-[var(--foreground-muted)]">
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
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            <div>
              <div className="text-lg font-semibold leading-snug tracking-tight text-[var(--foreground)]">
                Riverside Community Foundation
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                Strong fit for PA youth programs; award sizes align with your requested range.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]/55 px-3.5 py-3">
                <div className="text-[0.625rem] font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
                  Typical grant size
                </div>
                <div className="mt-1.5 font-mono text-sm font-semibold tabular-nums text-[var(--foreground)]">
                  $25k–$75k
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-3.5 py-3">
                <div className="text-[0.625rem] font-medium uppercase tracking-wide text-[var(--foreground-muted)]">
                  Example past focus
                </div>
                <p className="mt-1.5 text-xs leading-snug text-[var(--foreground-secondary)]">
                  After-school and mentoring (public records sample)
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-[var(--border)]/90 bg-[var(--surface-muted)]/35 px-3.5 py-3">
              <div className="text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-[var(--foreground-muted)]">
                Why it might fit
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--foreground-secondary)]">
                Geography and issue tags overlap with your mission; confirm eligibility before applying.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["Youth programs", "Pennsylvania"].map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[var(--border-subtle)] bg-[var(--surface-muted)]/60 px-2 py-0.5 text-[0.625rem] text-[var(--foreground-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-[0.6875rem] leading-snug text-[var(--foreground-muted)] lg:text-right">
          Illustrative preview — not live data.
        </p>
      </div>
    </div>
  );
}
