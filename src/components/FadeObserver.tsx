"use client";

import { useEffect } from "react";

// Attaches IntersectionObserver to every .fade-up element.
// Adds .visible when they enter the viewport.
// No library. ~15 lines.
export default function FadeObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target); // fire once
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
