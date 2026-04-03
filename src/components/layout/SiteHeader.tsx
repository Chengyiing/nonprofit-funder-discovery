import Link from "next/link";

const navItems: Array<{ href: string; label: string }> = [
  { href: "/about", label: "About" },
  { href: "/method", label: "Method" },
  { href: "/disclaimer", label: "Disclaimer / FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-[var(--border-subtle)] bg-[var(--surface)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/90">
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <Link
            href="/"
            className="group inline-flex items-start gap-5 rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]/40 sm:items-center sm:gap-5"
          >
            <span
              className="mt-0.5 flex h-[2.75rem] shrink-0 items-stretch gap-1 sm:h-12 sm:mt-0"
              aria-hidden
            >
              <span className="w-1.5 self-stretch rounded-full bg-[var(--accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]" />
              <span className="w-px self-stretch rounded-full bg-[var(--accent-secondary)]/55" />
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="font-brand-name block text-[1.625rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--accent)] sm:text-[2rem]">
                Funder Compass
              </span>
              <span className="mt-1.5 block max-w-[20rem] font-sans text-[0.75rem] font-medium leading-snug tracking-wide text-[var(--foreground-muted)] sm:text-[0.8125rem]">
                Public grant discovery for nonprofits
              </span>
            </span>
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm" aria-label="Primary">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[var(--foreground-secondary)] transition-colors hover:text-[var(--accent)] hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/tool"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:h-10"
            >
              Start matching
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
