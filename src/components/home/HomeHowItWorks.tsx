const STEPS = [
  {
    n: "01",
    title: "Share your mission and funding need",
    body: "Enter keywords, short context, city and state, and your desired grant amount.",
  },
  {
    n: "02",
    title: "Review ranked funders",
    body: "Matching draws on public grant and funder history, geography, and grant-size signals.",
  },
  {
    n: "03",
    title: "Read rationales and next steps",
    body: "Each result includes a concise rationale, example past grants, and outreach prompts.",
  },
] as const;

export default function HomeHowItWorks() {
  return (
    <div className="relative mt-14 md:mt-16 lg:mt-20">
      <div
        className="pointer-events-none absolute left-0 right-0 top-10 z-0 hidden h-px bg-gradient-to-r from-[var(--border-subtle)] via-[var(--border)]/90 to-[var(--border-subtle)] lg:block"
        aria-hidden
      />

      <ol className="relative z-[1] grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-3 lg:gap-10 xl:gap-12">
        {STEPS.map((item, i) => (
          <li
            key={item.n}
            className="relative min-w-0 rounded-2xl border border-[var(--border-subtle)]/90 bg-[var(--surface)]/60 p-6 shadow-sm transition-[box-shadow,transform] motion-safe:duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:shadow-md lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:hover:translate-y-0 lg:hover:shadow-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] font-mono text-[0.8125rem] font-semibold tabular-nums text-[var(--foreground-secondary)] shadow-sm ring-4 ring-[var(--background)] lg:mb-7">
              {item.n}
            </div>
            <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-[var(--foreground)] lg:mt-0">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-[1.65] text-[var(--foreground-secondary)]">
              {item.body}
            </p>

            {i < STEPS.length - 1 ? (
              <div
                className="mt-8 flex justify-center lg:hidden"
                aria-hidden
              >
                <div className="h-8 w-px bg-gradient-to-b from-[var(--border)] to-transparent" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
