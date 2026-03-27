import Link from "next/link";

const navItems: Array<{ href: string; label: string }> = [
  { href: "/about", label: "About" },
  { href: "/method", label: "Method" },
  { href: "/disclaimer", label: "Disclaimer / FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/80 bg-[var(--surface-warm)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface-warm)]/85">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 sm:gap-4"
          >
            <span
              className="h-10 w-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
              aria-hidden
            />
            <span className="min-w-0">
              <span className="font-brand-name block text-xl font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-[1.625rem]">
                Funder Compass
              </span>
              <span className="mt-2 block font-sans text-[0.8125rem] leading-snug text-zinc-500">
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
                  className="text-zinc-600 transition-colors hover:text-[var(--accent-hover)] hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/tool"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35 focus-visible:ring-offset-2 sm:h-10"
            >
              Start matching
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
