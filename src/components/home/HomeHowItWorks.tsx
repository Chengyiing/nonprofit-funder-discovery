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
    <ol className="mt-12 grid grid-cols-1 gap-10 md:mt-14 md:gap-12 lg:mt-16 lg:grid-cols-3 lg:gap-0">
      {STEPS.map((item, i) => (
        <li
          key={item.n}
          className={`relative min-w-0 lg:px-10 xl:px-12 ${
            i > 0 ? "lg:border-l lg:border-[var(--border-subtle)]" : ""
          }`}
        >
          <div className="max-w-md lg:max-w-none">
            <span className="font-mono text-[0.8125rem] font-medium tabular-nums text-[var(--foreground-muted)]">
              {item.n}
            </span>
            <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-[var(--foreground)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-[1.65] text-[var(--foreground-secondary)]">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
