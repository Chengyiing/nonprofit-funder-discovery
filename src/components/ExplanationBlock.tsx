import type { ReactNode } from "react";

export default function ExplanationBlock({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      {title ? (
        <div className="text-sm font-semibold text-zinc-900">{title}</div>
      ) : null}
      <div className="mt-2 text-sm leading-6 text-zinc-700">
        {children}
      </div>
    </section>
  );
}

