import Link from "next/link";
import Container from "@/components/layout/Container";

export default function Home() {
  return (
    <div className="pb-16 pt-10 sm:pt-14">
      <Container>
        <div className="flex flex-col gap-12">
          <section className="rounded-3xl border border-zinc-200/90 bg-gradient-to-b from-white via-[#fffdfb] to-[#f8f4f3] px-6 py-11 sm:px-12 sm:py-12">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7d1f2a]/15 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                Nonprofit-focused decision support
              </div>
              <h1 className="text-balance text-4xl font-semibold leading-[1.12] tracking-tight text-zinc-900 sm:text-5xl">
                Find potential funders that match your mission using public
                grant history.
              </h1>
              <p className="max-w-2xl text-pretty text-lg leading-8 text-zinc-700">
                Share a few details about your organization and funding need.
                You’ll get a ranked shortlist with plain-language explanations
                and outreach guidance.
              </p>

              <div className="flex flex-col gap-4 border-t border-zinc-200/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/tool"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#7d1f2a] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#5f1620] focus:outline-none focus:ring-2 focus:ring-[#7d1f2a]/30 focus:ring-offset-2"
                >
                  Start matching
                </Link>
                <div className="text-sm text-zinc-600 sm:text-right">
                  Decision support only. No guarantee of funding.
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                  Plain-language explanations
                </span>
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                  Built for clarity
                </span>
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                  Public-data matching
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              How it works
            </h2>
            <ol className="mt-5 grid gap-5 sm:grid-cols-3">
              <li className="rounded-2xl border border-zinc-200/90 bg-white p-6">
                <div className="text-sm font-semibold text-[#7d1f2a]">Step 1</div>
                <div className="mt-3 text-[22px] font-semibold leading-8 tracking-tight text-zinc-900">
                  Share your mission and funding need
                </div>
                <div className="mt-3 text-base leading-7 text-zinc-700">
                  Enter a few keywords, a short context, your city/state, and
                  your desired grant amount.
                </div>
              </li>
              <li className="rounded-2xl border border-zinc-200/90 bg-white p-6">
                <div className="text-sm font-semibold text-[#7d1f2a]">Step 2</div>
                <div className="mt-3 text-[22px] font-semibold leading-8 tracking-tight text-zinc-900">
                  We match you to funders
                </div>
                <div className="mt-3 text-base leading-7 text-zinc-700">
                  Matching uses public grant/funder history and your geography
                  and budget context to rank recommendations.
                </div>
              </li>
              <li className="rounded-2xl border border-zinc-200/90 bg-white p-6">
                <div className="text-sm font-semibold text-[#7d1f2a]">Step 3</div>
                <div className="mt-3 text-[22px] font-semibold leading-8 tracking-tight text-zinc-900">
                  Review explanations and outreach steps
                </div>
                <div className="mt-3 text-base leading-7 text-zinc-700">
                  Each recommendation includes a plain-language rationale, sample
                  past grants, and next-step outreach guidance.
                </div>
              </li>
            </ol>
          </section>
        </div>
      </Container>
    </div>
  );
}
