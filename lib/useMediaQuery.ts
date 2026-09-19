"use client";

import { useSyncExternalStore } from "react";

/** Reads a media query without a render-then-correct flash on the client.
 *  Returns `false` during server render — so never use it to choose styles an
 *  element is server-rendered with, only for client-only behaviour. */
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
