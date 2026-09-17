"use client";

import { useSyncExternalStore } from "react";

/** Reads a media query without a render-then-correct flash on the client.
 *  Returns `false` during server render. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Phone-sized viewports, where heavy filters cost the most. */
export const useIsPhone = () => useMediaQuery("(max-width: 640px)");
