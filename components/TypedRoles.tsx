"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function TypedRoles() {
  const roles = profile.typedRoles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let delay = deleting ? 40 : 80;
    if (!deleting && text === current) delay = 2000;
    if (deleting && text === "") delay = 400;

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className="text-accent">
      {text}
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
}
