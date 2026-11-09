"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import Preloader from "./Preloader";

const PreloaderContext = createContext(false);

/** `true` once the preloader has finished its exit transition. */
export const usePreloaderComplete = () => useContext(PreloaderContext);

/**
 * Covers the page with the preloader on the initial load, then unmounts it.
 * Lives in the root layout, so client-side navigations don't replay it.
 */
export default function PreloaderGate({ children }: { children: ReactNode }) {
  const [complete, setComplete] = useState(false);
  const handleComplete = useCallback(() => setComplete(true), []);

  return (
    <PreloaderContext value={complete}>
      {children}
      {!complete && <Preloader onComplete={handleComplete} />}
    </PreloaderContext>
  );
}
