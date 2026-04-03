import type { ReactNode } from "react";

export default function ExplanationBlock({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]/80 p-5">
      {title ? (
        <div className="text-sm font-semibold text-[var(--foreground)]">{title}</div>
      ) : null}
      <div className="mt-2 text-sm leading-relaxed text-[var(--foreground-secondary)]">
        {children}
      </div>
    </section>
  );
}
