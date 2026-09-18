"use client";

import { useSyncExternalStore } from "react";

const byHour = () => {
  const h = new Date().getHours();
  if (h < 5) return "Working late?";
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
};

// The hour doesn't need live updates; nothing to subscribe to.
const noSubscribe = () => () => {};

/** Time-aware greeting — a small personal touch. The server can't know the
 *  visitor's local time, so it renders a neutral "Hello" first. */
export default function Greeting() {
  const greeting = useSyncExternalStore(noSubscribe, byHour, () => "Hello");
  return <span>{greeting}</span>;
}
