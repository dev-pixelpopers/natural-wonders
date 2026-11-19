"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import Preloader from "./Preloader";

const PreloaderContext = createContext(false);

/**
 * `true` once the preloader's curtain starts lifting (and from then on), so page
 * entrance animations can play as the page is uncovered instead of behind the cover.
 */
export const usePreloaderComplete = () => useContext(PreloaderContext);

/**
 * Covers the page with the preloader on the initial (full) page load, then unmounts it.
 * Lives in the root layout, so client-side navigations between pages don't replay it.
 */
export default function PreloaderGate({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const [complete, setComplete] = useState(false);
  const handleReveal = useCallback(() => setRevealed(true), []);
  const handleComplete = useCallback(() => {
    setRevealed(true);
    setComplete(true);
  }, []);

  return (
    <PreloaderContext value={revealed}>
      {children}
      {!complete && <Preloader onReveal={handleReveal} onComplete={handleComplete} />}
    </PreloaderContext>
  );
}
