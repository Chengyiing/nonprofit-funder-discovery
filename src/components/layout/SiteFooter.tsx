import Image from "next/image";
import Link from "next/link";

const footerItems: Array<{ href: string; label: string }> = [
  { href: "/about", label: "About" },
  { href: "/method", label: "Method" },
  { href: "/disclaimer", label: "Disclaimer / FAQ" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/90 bg-[#fbfaf9]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-900">
              Funder Compass
            </div>
            <div className="mt-1 text-sm text-zinc-600">
              Public-data decision support for small nonprofits.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm sm:justify-end">
            {footerItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-700 hover:text-[#5f1620] hover:underline"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="mailto:contact@civicfunderfinder.org"
              className="text-zinc-700 hover:text-[#5f1620] hover:underline"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-zinc-200/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-zinc-500">
            Built for clarity and accessibility. Not affiliated with any funding
            agency.
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2">
            <Image
              src="/cmu.png"
              alt="Carnegie Mellon University"
              width={110}
              height={28}
              className="h-6 w-auto object-contain"
            />
            <div className="text-xs font-medium text-zinc-600">
              Developed at Carnegie Mellon University
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

