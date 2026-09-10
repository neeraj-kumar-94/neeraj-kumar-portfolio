"use client";

import { useEffect, useState } from "react";

/** Time-aware greeting — a small personal touch. */
export default function PGreeting() {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 5) setGreeting("Working late?");
    else if (h < 12) setGreeting("Good Morning");
    else if (h < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return <span>{greeting}</span>;
}
