"use client";

import { useSyncExternalStore } from "react";
import { SITE_HOST, SITE_URL, isOwnHost } from "@/lib/site";

// Nothing to subscribe to: the host cannot change without a page load.
const noSubscribe = () => () => {};
const readHost = () => window.location.hostname;

/** If this code is running anywhere that is not my site, say so on the page.
 *
 *  This stops the lazy copy — someone who clones the repo and deploys it
 *  unchanged. Anyone who reads the code can delete this file in seconds, and
 *  that is fine: the licence and the canonical tag are what actually protect
 *  the work. This just makes a stolen copy announce itself. */
export default function CloneNotice() {
  const host = useSyncExternalStore(noSubscribe, readHost, () => SITE_HOST);

  if (isOwnHost(host)) return null;

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-signal/40 bg-background/95 px-4 py-3 text-center backdrop-blur"
      role="note"
    >
      <p className="meta meta-sm text-foreground">
        This is a copy. The original portfolio of Neeraj Kumar lives at{" "}
        <a href={SITE_URL} className="text-signal underline underline-offset-4">
          {SITE_HOST}
        </a>
      </p>
    </aside>
  );
}
