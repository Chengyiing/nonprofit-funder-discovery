import Link from "next/link";
import Container from "@/components/layout/Container";

export default function AboutPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <header className="border-b border-[var(--border)] pb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-[2rem] sm:leading-tight">
              About
            </h1>
          </header>
          <p className="mt-8 text-pretty text-base leading-relaxed text-[var(--foreground-secondary)]">
            Funder Compass is built for small, grant-seeking nonprofits
            that need a practical starting point for outreach.
          </p>

          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-semibold text-[var(--foreground)]">
              What this tool is
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
              It helps you discover potential funders by comparing your funding
              need with public grant history. You get a ranked shortlist,
              plain-language explanations, sample past grants, and outreach
              guidance.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-semibold text-[var(--foreground)]">
              Decision support, not a guarantee
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
              Recommendations are suggestions to help you plan your work. Fund
              availability, eligibility, and application requirements can
              change—always verify requirements directly with each funder.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)]/80 p-6 text-sm leading-relaxed text-[var(--foreground-secondary)]">
            <div className="font-semibold text-[var(--foreground)]">Institutional context</div>
            <p className="mt-2">
              This project is designed so that a university or nonprofit partner
              could host it long term: clear interfaces, careful explanations, and
              a focus on accessibility. See the{" "}
              <Link href="/contact" className="font-medium text-[var(--accent)] hover:underline">
                Contact
              </Link>{" "}
              page for team and partner details.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

