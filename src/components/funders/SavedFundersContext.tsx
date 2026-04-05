"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FunderRecommendation } from "@/lib/recommendations/types";
import {
  loadSavedFunders,
  persistSavedFunders,
  removeSaved,
  snapshotFromRecommendation,
  upsertSaved,
  type SavedFunderSnapshot,
} from "@/lib/savedFunders/storage";

type SavedFundersContextValue = {
  saved: SavedFunderSnapshot[];
  isSaved: (id: string) => boolean;
  toggleSave: (result: FunderRecommendation) => void;
  remove: (id: string) => void;
  clearAll: () => void;
};

const SavedFundersContext = createContext<SavedFundersContextValue | null>(null);

export function SavedFundersProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<SavedFunderSnapshot[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setSaved(loadSavedFunders());
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    persistSavedFunders(saved);
  }, [saved, ready]);

  const isSaved = useCallback(
    (id: string) => saved.some((s) => s.id === id),
    [saved]
  );

  const toggleSave = useCallback((result: FunderRecommendation) => {
    setSaved((prev) => {
      const exists = prev.some((s) => s.id === result.id);
      if (exists) {
        return removeSaved(prev, result.id);
      }
      return upsertSaved(prev, snapshotFromRecommendation(result));
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSaved((prev) => removeSaved(prev, id));
  }, []);

  const clearAll = useCallback(() => {
    setSaved([]);
  }, []);

  const value = useMemo(
    () => ({
      saved,
      isSaved,
      toggleSave,
      remove,
      clearAll,
    }),
    [saved, isSaved, toggleSave, remove, clearAll]
  );

  return (
    <SavedFundersContext.Provider value={value}>{children}</SavedFundersContext.Provider>
  );
}

export function useSavedFunders(): SavedFundersContextValue {
  const ctx = useContext(SavedFundersContext);
  if (!ctx) {
    throw new Error("useSavedFunders must be used within SavedFundersProvider");
  }
  return ctx;
}
