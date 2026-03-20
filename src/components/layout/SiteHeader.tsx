import Link from "next/link";

const navItems: Array<{ href: string; label: string }> = [
  { href: "/about", label: "About" },
  { href: "/method", label: "Method" },
  { href: "/disclaimer", label: "Disclaimer / FAQ" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/80 bg-[#fbfaf9]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="h-9 w-1.5 rounded-full bg-[#7d1f2a]/80" />
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-tight text-zinc-900 group-hover:text-[#5f1620]">
                Funder Compass
              </div>
              <div className="text-xs text-zinc-600">
                Public grant discovery for nonprofits
              </div>
            </div>
          </Link>
        </div>

        <nav
          className="hidden items-center gap-7 text-sm sm:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-700 hover:text-[#5f1620] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tool"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#7d1f2a] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#5f1620] focus:outline-none focus:ring-2 focus:ring-[#7d1f2a]/30 focus:ring-offset-2"
          >
            Start matching
          </Link>
        </div>
      </div>
    </header>
  );
}

