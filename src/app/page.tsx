import Link from "next/link";
import Container from "@/components/layout/Container";
import HomeHeroPreview from "@/components/home/HomeHeroPreview";
import HomeHowItWorks from "@/components/home/HomeHowItWorks";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)] pb-24 pt-12 sm:pb-32 sm:pt-16">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(127,200,248,0.11),transparent_58%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--border)]/80 to-transparent"
          aria-hidden
        />

        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface-hero)] to-[var(--surface-muted)]/95 p-7 shadow-[0_24px_72px_-36px_rgba(41,56,142,0.2)] sm:p-10 lg:p-12 xl:p-14 motion-safe:transition-shadow motion-safe:duration-500 motion-safe:hover:shadow-[0_28px_80px_-34px_rgba(41,56,142,0.22)]">
            <div
              className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[var(--accent-secondary)]/9 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[var(--accent)]/6 blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-center lg:gap-16 xl:gap-20">
              <div className="flex min-w-0 flex-col gap-8 sm:gap-9">
                <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)]/90 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-secondary)] shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/85" aria-hidden />
                  Research tool · Public grant records
                </p>

                <div className="space-y-5">
                  <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl sm:leading-[1.08] lg:text-[2.75rem] lg:leading-[1.05]">
                    Find potential funders that match your mission using public grant
                    history.
                  </h1>
                  <p className="max-w-xl text-pretty text-base leading-[1.65] text-[var(--foreground-secondary)] sm:text-lg sm:leading-[1.7]">
                    Most small teams cannot spend weeks researching funders line by line.
                    This tool turns public grant history into a credible starting point—so
                    you can spend time on programs and relationships, not endless search.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <Link
                    href="/tool"
                    className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-8 text-sm font-semibold text-white shadow-sm transition-[transform,box-shadow,background-color] motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_14px_36px_-22px_rgba(41,56,142,0.55)] hover:bg-[var(--accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto"
                  >
                    Start matching
                  </Link>
                  <p className="max-w-md text-sm leading-relaxed text-[var(--foreground-muted)] sm:max-w-sm">
                    Decision support only. No guarantee of funding success—always confirm
                    eligibility with each funder.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-7">
                  {[
                    "Public grant records",
                    "Built for small teams",
                    "Decision support, not a promise",
                  ].map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface)]/95 px-3 py-1.5 text-xs font-medium text-[var(--foreground-secondary)]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="min-w-0 lg:translate-y-1">
                <HomeHeroPreview />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="relative scroll-mt-8 border-b border-[var(--border-subtle)]/90 bg-gradient-to-b from-[var(--background)] via-[var(--surface-muted)]/40 to-[var(--background)] py-24 sm:py-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--border)]/70 to-transparent"
          aria-hidden
        />
        <Container>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-3xl lg:text-left">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
              Workflow
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem] sm:leading-tight">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[var(--foreground-muted)] lg:mx-0">
              Three straightforward steps—from your inputs to a shortlist you can act on.
            </p>
          </div>
          <HomeHowItWorks />
        </Container>
      </section>

      {/* Institutional collaboration */}
      <section className="relative py-20 sm:py-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--border)]/60 to-transparent"
          aria-hidden
        />
        <Container>
          <div className="relative overflow-hidden rounded-[1.375rem] border border-[var(--border)] bg-[var(--surface)]/95 pl-7 pr-7 py-11 shadow-[0_18px_48px_-32px_rgba(41,56,142,0.16)] sm:pl-11 sm:pr-11 sm:py-12 motion-safe:transition-shadow motion-safe:duration-300 motion-safe:hover:shadow-[0_22px_56px_-30px_rgba(41,56,142,0.18)]">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[var(--accent)]/75 via-[var(--accent-secondary)]/35 to-[var(--accent)]/55"
              aria-hidden
            />
            <div className="relative max-w-2xl pl-1 sm:pl-3">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--foreground-muted)]">
                Partners
              </p>
              <p className="mt-4 text-sm leading-[1.75] text-[var(--foreground-secondary)]">
                <strong className="font-semibold text-[var(--foreground)]">Institutional context.</strong>{" "}
                Funder Compass is developed in collaboration with Carnegie Mellon
                University’s Heinz College of Information Systems and Public Policy
                and KMSG—a public-interest resource intended for careful, real-world
                use by grant-seeking organizations.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex text-sm font-semibold text-[var(--accent)] underline-offset-[5px] decoration-[var(--border)] transition-colors hover:text-[var(--accent-hover)] hover:underline hover:decoration-[var(--accent)]/35"
              >
                Contact and team information
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
