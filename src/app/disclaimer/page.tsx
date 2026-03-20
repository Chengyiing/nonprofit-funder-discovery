import Container from "@/components/layout/Container";

export default function DisclaimerPage() {
  return (
    <Container>
      <div className="py-10 sm:py-12">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Disclaimer / FAQ
          </h1>

          <div className="mt-6 space-y-4">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold text-zinc-900">
                Does this guarantee funding?
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                No. This tool does not guarantee funding success. It provides
                suggestions to support outreach planning.
              </p>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold text-zinc-900">
                Is the data complete?
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                Public data may be incomplete or outdated. Always verify
                funder requirements directly with the funder before investing time
                in an application.
              </p>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold text-zinc-900">
                What should I do next?
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                Use the recommendations as a starting point. Review eligibility,
                confirm fit, and follow the funder’s current submission guidance.
                If you’re unsure, reach out with a brief, respectful inquiry.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}

