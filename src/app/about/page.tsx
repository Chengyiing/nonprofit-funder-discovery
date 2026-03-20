import Container from "@/components/layout/Container";

export default function AboutPage() {
  return (
    <Container>
      <div className="py-10 sm:py-12">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            About
          </h1>
          <p className="mt-4 text-pretty text-base leading-7 text-zinc-700">
            Civic Funder Finder is built for small, grant-seeking nonprofits
            that need a practical starting point for outreach.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-base font-semibold text-zinc-900">
              What this tool is
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              It helps you discover potential funders by comparing your funding
              need with public grant history. You get a ranked shortlist,
              plain-language explanations, sample past grants, and outreach
              guidance.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-base font-semibold text-zinc-900">
              Decision support, not a guarantee
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              Recommendations are suggestions to help you plan your work. Fund
              availability, eligibility, and application requirements can
              change—always verify requirements directly with each funder.
            </p>
          </div>

          <div className="mt-6 text-sm leading-6 text-zinc-600">
            <div className="font-semibold text-zinc-800">Team / institutional context</div>
            <p className="mt-2">
              This project is designed to feel like a university or nonprofit
              partner could host it long term: clear interfaces, careful
              explanations, and a focus on accessibility.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

