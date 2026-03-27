import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <div className="pb-16 pt-10 sm:pb-20 sm:pt-14">
      <Container>
        <div className="flex flex-col gap-14 sm:gap-16">
          <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white via-[var(--surface-hero)] to-[#f5f0ef] px-6 py-12 shadow-sm sm:px-12 sm:py-14">
            <div className="max-w-3xl space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/15 bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-700">
                Nonprofit-focused decision support
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-[2.75rem] sm:leading-[1.08]">
                Find potential funders that match your mission using public grant
                history.
              </h1>
              <p className="max-w-2xl text-pretty text-lg leading-8 text-zinc-600 sm:text-[1.125rem] sm:leading-8">
                Share a few details about your organization and funding need. You
                receive a ranked shortlist with plain-language explanations and
                practical outreach guidance—designed for busy nonprofit teams.
              </p>

              <div className="flex flex-col gap-5 border-t border-zinc-200/90 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <Link
                  href="/tool"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--accent)] px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35 focus-visible:ring-offset-2"
                >
                  Start matching
                </Link>
                <p className="text-sm leading-relaxed text-zinc-600 sm:max-w-xs sm:text-right">
                  Decision support only. No guarantee of funding success—always
                  confirm eligibility with each funder.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Plain-language explanations",
                  "Built for clarity",
                  "Public-data matching",
                ].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-zinc-200/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="scroll-mt-8">
            <div className="mb-2 max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-[1.75rem]">
                How it works
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Three straightforward steps—from your inputs to a shortlist you can act on.
              </p>
            </div>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-7">
              {[
                {
                  step: "Step 1",
                  title: "Share your mission and funding need",
                  body: "Enter keywords, short context, city and state, and your desired grant amount.",
                },
                {
                  step: "Step 2",
                  title: "Review ranked funders",
                  body: "Matching draws on public grant and funder history, geography, and grant-size signals.",
                },
                {
                  step: "Step 3",
                  title: "Read rationales and next steps",
                  body: "Each result includes a concise rationale, example past grants, and outreach prompts.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="flex h-full flex-col rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                    {item.step}
                  </div>
                  <div className="mt-4 text-lg font-semibold leading-snug tracking-tight text-zinc-900">
                    {item.title}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-dashed border-zinc-300/80 bg-zinc-50/80 px-6 py-8 sm:px-8">
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">
              <strong className="font-medium text-zinc-800">Institutional context.</strong>{" "}
              Funder Compass is developed in collaboration with Carnegie Mellon
              University’s Heinz College of Information Systems and Public Policy
              and KMSG—a public-interest resource intended for careful, real-world
              use by grant-seeking organizations.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:text-[var(--accent-hover)] hover:underline"
            >
              Contact and team information
            </Link>
          </section>
        </div>
      </Container>
    </div>
  );
}
