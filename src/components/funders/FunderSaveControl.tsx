"use client";

import { useEffect, useRef, useState } from "react";
import type { FunderRecommendation } from "@/lib/recommendations/types";
import { useSavedFunders } from "@/components/funders/SavedFundersContext";

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[1.125rem] w-[1.125rem]"
      aria-hidden
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function FunderSaveControl({ result }: { result: FunderRecommendation }) {
  const { isSaved, toggleSave } = useSavedFunders();
  const saved = isSaved(result.id);
  const [showSaved, setShowSaved] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  function handleClick() {
    const wasSaved = saved;
    toggleSave(result);
    if (!wasSaved) {
      setShowSaved(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setShowSaved(false), 1600);
    } else {
      setShowSaved(false);
    }
  }

  const label = saved ? "Remove from saved funders" : "Save funder to shortlist";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={label}
        title={label}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--foreground-secondary)] shadow-sm transition-[color,background-color,box-shadow,transform] hover:border-[var(--border)] hover:bg-[var(--surface-muted)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 motion-safe:hover:-translate-y-px"
      >
        <span className={saved ? "text-[var(--accent)]" : undefined}>
          <BookmarkIcon filled={saved} />
        </span>
      </button>
      <span
        className={`pointer-events-none absolute -bottom-5 right-0 whitespace-nowrap text-[0.6875rem] font-medium text-[var(--accent)] transition-opacity duration-200 ${
          showSaved && saved ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        Saved
      </span>
    </div>
  );
}
