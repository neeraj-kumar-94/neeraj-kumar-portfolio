"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

// Re-reads once a minute; the snapshot only changes when the minute does.
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 20_000);
  return () => clearInterval(id);
};

/** My local time, so anyone deciding when to call can see it at a glance. */
export default function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => fmt.format(new Date()),
    () => ""
  );

  return (
    <span className="meta meta-sm text-muted" suppressHydrationWarning>
      Shamli {time || "--:--"} IST
    </span>
  );
}
