import Container from "@/components/layout/Container";

export default function MethodPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <header className="border-b border-[var(--border)] pb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-[2rem] sm:leading-tight">
              Method
            </h1>
          </header>

          <p className="mt-8 text-pretty text-base leading-relaxed text-[var(--foreground-secondary)]">
            In plain language: we use public grant/funder history to find
            funders whose prior giving patterns look similar to your mission,
            location, and funding request.
          </p>

          <div className="mt-8 space-y-6">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-sm">
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                What data is used
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                The system compares your inputs to public records of grants and
                funder activities. The exact fields can vary by dataset, but
                the goal is the same: find where funders have supported similar
                work in the past.
              </p>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-sm">
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                How matching works (high level)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                We look for overlap between the language in your mission and
                funding need and the descriptions of past grants. We also
                consider geography signals (city/state) and grant-size context
                to prioritize funders most relevant to your request.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                If you open &ldquo;Fine-tune the match,&rdquo; you can adjust how
                strongly the site emphasizes topic fit, local fit, and grant size fit.
              </p>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-sm">
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                Limitations
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                Public records may be incomplete or outdated. Funders may
                change eligibility rules over time, and past giving does not
                guarantee future support. This tool should help you start a
                thoughtful outreach plan, not replace funder guidance.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}

