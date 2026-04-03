import Link from "next/link";
import { PartnerLogosRow } from "@/components/layout/PartnerLogos";

const footerItems: Array<{ href: string; label: string }> = [
  { href: "/about", label: "About" },
  { href: "/method", label: "Method" },
  { href: "/disclaimer", label: "Disclaimer / FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-footer)]">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
          <div className="max-w-md">
            <div className="font-brand-name text-lg font-semibold tracking-tight text-[var(--accent)]">
              Funder Compass
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
              Public-interest decision support to help small nonprofits explore
              potential funders using grant-history data.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm lg:justify-end"
            aria-label="Footer"
          >
            {footerItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--foreground-secondary)] transition-colors hover:text-[var(--accent)] hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 max-w-3xl border-t border-[var(--border-subtle)] pt-8">
          <p className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
            Developed in collaboration with{" "}
            <span className="text-[var(--foreground)]">
              Carnegie Mellon University’s Heinz College of Information Systems and
              Public Policy
            </span>{" "}
            and <span className="text-[var(--foreground)]">KMSG</span>.
          </p>
          <PartnerLogosRow className="mt-7" />
        </div>

        <p className="mt-10 border-t border-[var(--border-subtle)] pt-7 text-xs leading-relaxed text-[var(--foreground-muted)]">
          Built for clarity and accessibility. Not affiliated with any funding
          agency. Information on this site is not legal or financial advice.
        </p>
      </div>
    </footer>
  );
}
