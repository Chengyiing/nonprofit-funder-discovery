import Link from "next/link";
import Container from "@/components/layout/Container";

export default function AboutPage() {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <header className="border-b border-zinc-200/90 pb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-[2rem] sm:leading-tight">
              About
            </h1>
          </header>
          <p className="mt-8 text-pretty text-base leading-relaxed text-zinc-700">
            Funder Compass is built for small, grant-seeking nonprofits
            that need a practical starting point for outreach.
          </p>

          <div className="mt-8 rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-semibold text-zinc-900">
              What this tool is
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              It helps you discover potential funders by comparing your funding
              need with public grant history. You get a ranked shortlist,
              plain-language explanations, sample past grants, and outreach
              guidance.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-semibold text-zinc-900">
              Decision support, not a guarantee
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              Recommendations are suggestions to help you plan your work. Fund
              availability, eligibility, and application requirements can
              change—always verify requirements directly with each funder.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-zinc-300/80 bg-zinc-50/80 p-6 text-sm leading-relaxed text-zinc-600">
            <div className="font-semibold text-zinc-800">Institutional context</div>
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

