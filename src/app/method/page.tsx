import Container from "@/components/layout/Container";

export default function MethodPage() {
  return (
    <Container>
      <div className="py-10 sm:py-12">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Method
          </h1>

          <p className="mt-4 text-pretty text-base leading-7 text-zinc-700">
            In plain language: we use public grant/funder history to find
            funders whose prior giving patterns look similar to your mission,
            location, and funding request.
          </p>

          <div className="mt-7 space-y-4">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold text-zinc-900">
                What data is used
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                The system compares your inputs to public records of grants and
                funder activities. The exact fields can vary by dataset, but
                the goal is the same: find where funders have supported similar
                work in the past.
              </p>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold text-zinc-900">
                How matching works (high level)
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                We look for overlap between the language in your mission and
                funding need and the descriptions of past grants. We also
                consider geography signals (city/state) and grant-size context
                to prioritize funders most relevant to your request.
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                If you open Advanced settings, you can adjust how strongly the
                site weighs topic, geography, and grant size.
              </p>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-base font-semibold text-zinc-900">
                Limitations
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                Public records may be incomplete or outdated. Funders may
                change eligibility rules over time, and past giving does not
                guarantee future support. This tool should help you start a
                thoughtful outreach plan, not replace funder guidance.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}

