import Link from "next/link";
import Container from "@/components/layout/Container";
import HomeHeroPreview from "@/components/home/HomeHeroPreview";
import HomeHowItWorks from "@/components/home/HomeHowItWorks";

export default function Home() {
  return (
    <div>
      <section className="relative border-b border-[var(--border-subtle)]/80 pb-20 pt-10 sm:pb-28 sm:pt-14">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_85%_60%_at_50%_-10%,rgba(127,200,248,0.12),transparent_55%)]" />
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--surface-hero)] to-[var(--surface-muted)]/90 p-6 shadow-[0_20px_60px_-28px_rgba(41,56,142,0.18)] sm:p-10 lg:p-12 xl:p-14">
            <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[var(--accent-secondary)]/10 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[var(--accent)]/5 blur-3xl" aria-hidden />

            <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-start lg:gap-14 xl:gap-16">
              <div className="flex min-w-0 flex-col gap-7 sm:gap-8">
                <p className="text-xs font-semibold tracking-wide text-[var(--foreground-secondary)]">
                  Nonprofit-focused decision support
                </p>

                <div className="space-y-5">
                  <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-4xl sm:leading-[1.08] lg:text-[2.625rem] lg:leading-[1.06]">
                    Find potential funders that match your mission using public grant
                    history.
                  </h1>
                  <p className="max-w-xl text-pretty text-base leading-[1.65] text-[var(--foreground-secondary)] sm:text-lg sm:leading-[1.7]">
                    Most small teams cannot spend weeks researching funders line by line.
                    This tool turns public grant history into a credible starting point—so
                    you can spend time on programs and relationships, not endless search.
                  </p>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-8">
                  <div className="flex w-full min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-x-12">
                    <Link
                      href="/tool"
                      className="inline-flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:w-auto"
                    >
                      Start matching
                    </Link>
                    <p className="max-w-md shrink text-sm leading-relaxed text-[var(--foreground-muted)] sm:max-w-[min(22rem,42%)] sm:text-right">
                      Decision support only. No guarantee of funding success—always
                      confirm eligibility with each funder.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
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

              <div className="min-w-0 lg:pt-0.5">
                <HomeHeroPreview />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="scroll-mt-8 border-b border-[var(--border-subtle)] bg-gradient-to-b from-[var(--surface-muted)]/35 via-[var(--background)] to-[var(--background)] py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-3xl lg:text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem] sm:leading-tight">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[var(--foreground-muted)] lg:mx-0">
              Three straightforward steps—from your inputs to a shortlist you can act on.
            </p>
          </div>
          <HomeHowItWorks />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]/50 pl-6 pr-6 py-10 shadow-sm sm:pl-10 sm:pr-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--accent)]/70 via-[var(--accent-secondary)]/40 to-[var(--accent)]/50"
              aria-hidden
            />
            <div className="relative max-w-2xl pl-2 sm:pl-4">
              <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
                <strong className="font-semibold text-[var(--foreground)]">Institutional context.</strong>{" "}
                Funder Compass is developed in collaboration with Carnegie Mellon
                University’s Heinz College of Information Systems and Public Policy
                and KMSG—a public-interest resource intended for careful, real-world
                use by grant-seeking organizations.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)] underline-offset-[5px] decoration-[var(--border)] transition-colors hover:text-[var(--accent-hover)] hover:underline hover:decoration-[var(--accent)]/35"
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
