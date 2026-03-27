import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Project team, partner organizations, and contact information for Funder Compass.",
};

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 7h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 7l7.89 5.26a2 2 0 002.22 0L22 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TEAM = [
  "Chengyi Cai",
  "Zoe Iseri",
  "Chloe Huang",
  "Jhanavi Sankar",
  "Shiyu Liu",
] as const;

function ContactChannel({
  title,
  description,
  email,
}: {
  title: string;
  description: string;
  email: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-warm)] text-[var(--accent)]">
          <MailIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-zinc-500">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
        </div>
      </div>
      <a
        href={`mailto:${email}`}
        className="mt-5 block break-all text-sm font-semibold text-[var(--accent)] underline-offset-2 hover:text-[var(--accent-hover)] hover:underline"
      >
        {email}
      </a>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Container>
      <div className="mx-auto max-w-4xl pb-16 pt-12 sm:pb-20 sm:pt-16">
        {/* A. Intro */}
        <header className="border-b border-zinc-200/90 pb-12 sm:pb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
            Funder Compass
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-[2.5rem] sm:leading-[1.15]">
            Contact
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-[1.125rem] sm:leading-8">
            Questions about the tool, collaboration, or future stewardship? We
            welcome feedback from nonprofits, institutional partners, and project
            collaborators.
          </p>
        </header>

        {/* B. Institutional profile cards */}
        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12">
          <article className="flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Academic partner
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900">
              Carnegie Mellon / Heinz College
            </h2>
            <div className="mt-6 border-t border-zinc-100 pt-6">
              <h3 className="text-sm font-semibold text-zinc-900">
                About the student team
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                This project was developed by a student team at Carnegie Mellon
                University’s{" "}
                <strong className="font-medium text-zinc-800">
                  Heinz College of Information Systems and Public Policy
                </strong>{" "}
                as part of a capstone focused on public-interest technology,
                data-driven decision support, and nonprofit applications of AI.
              </p>
            </div>
            <div className="mt-8 border-t border-zinc-100 pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.06em] text-zinc-500">
                Capstone team
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {TEAM.map((name) => (
                  <li
                    key={name}
                    className="text-sm font-medium leading-snug text-zinc-800"
                  >
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-zinc-500">
                Names and roles may be updated as this site is maintained.
              </p>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Partner organization
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900">
              KMSG
            </h2>
            <div className="mt-6 border-t border-zinc-100 pt-6">
              <h3 className="text-sm font-semibold text-zinc-900">About KMSG</h3>
              <p className="mt-4 text-sm leading-[1.7] text-zinc-700">
                KMSG is a social impact consulting firm that works with leaders
                navigating complexity. From capital campaigns, narrative resets,
                and moments of crisis to organizational pivots and field-wide
                strategic planning, KMSG supports organizations that need clarity,
                traction, and the ability to move quickly without losing direction.
              </p>
            </div>
          </article>
        </div>

        {/* C. Inquiries */}
        <section className="mt-16 border-t border-zinc-200/90 pt-14 sm:mt-20 sm:pt-16">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            Inquiries and feedback
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Use the channels below for project questions, partnership conversations,
            or suggestions to improve the tool. Addresses may be updated as
            stewardship and routing are finalized.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ContactChannel
              title="Project inquiries"
              description="Questions about the tool, methods, or Heinz capstone context."
              email="chengyic@andrew.cmu.edu"
            />
            <ContactChannel
              title="Partnership inquiries"
              description="Collaboration, hosting, or institutional use of the resource."
              email="hello@kmstrategiesgroup.com"
            />
            <ContactChannel
              title="Feedback on the tool"
              description="Suggestions to improve clarity, accessibility, or match quality."
              email="hello@kmstrategiesgroup.com"
            />
          </div>
        </section>
      </div>
    </Container>
  );
}
