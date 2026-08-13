"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;
    if (!dot || !ring || !spotlight) return;

    const pos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      // Spotlight follows immediately
      spotlight.style.setProperty("--spotlight-x", `${e.clientX}px`);
      spotlight.style.setProperty("--spotlight-y", `${e.clientY}px`);
    };

    const animate = () => {
      // Lerp dot (faster)
      dotPos.x += (pos.x - dotPos.x) * 0.25;
      dotPos.y += (pos.y - dotPos.y) * 0.25;
      dot.style.transform = `translate(${dotPos.x - 4}px, ${dotPos.y - 4}px)`;

      // Lerp ring (slower)
      ringPos.x += (pos.x - ringPos.x) * 0.12;
      ringPos.y += (pos.y - ringPos.y) * 0.12;
      ring.style.transform = `translate(${ringPos.x - 20}px, ${ringPos.y - 20}px)`;

      requestAnimationFrame(animate);
    };

    // Detect hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], [data-magnetic], .hoverable'
      );
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(animate);

    // Delay to let DOM render
    setTimeout(addHoverListeners, 1000);

    // Re-add listeners on DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(addHoverListeners, 200);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Crosshair dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          width: isHovering ? "40px" : "8px",
          height: isHovering ? "40px" : "8px",
          borderRadius: "50%",
          background: isHovering
            ? "rgba(201, 162, 39, 0.15)"
            : "var(--color-gold)",
          border: isHovering ? "1px solid var(--color-gold)" : "none",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s",
          mixBlendMode: isHovering ? "difference" : "normal",
        }}
      />
      {/* Crosshair ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: `1px solid rgba(201, 162, 39, ${isHovering ? 0 : 0.3})`,
          transition: "border-color 0.3s, opacity 0.3s",
        }}
      />
      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(600px circle at var(--spotlight-x, -100px) var(--spotlight-y, -100px), rgba(201, 162, 39, 0.04), transparent 40%)",
        }}
      />
    </>
  );
}
