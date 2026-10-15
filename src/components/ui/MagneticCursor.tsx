"use client";

import { useEffect, useRef, useState } from "react";

interface CursorProps {
  label?: string;
}

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      // Dot follows immediately
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      label.style.left = `${e.clientX}px`;
      label.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      // Ring lerps toward cursor
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
      if (ring) {
        ring.style.left = `${ringPosRef.current.x}px`;
        ring.style.top = `${ringPosRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onInteractEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorLabel = target.dataset.cursor || "VIEW";
      ring.classList.add("hover");
      label.textContent = cursorLabel;
      label.classList.add("visible");
      dot.style.opacity = "0.3";
    };

    const onInteractLeave = () => {
      ring.classList.remove("hover");
      label.classList.remove("visible");
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    // Attach to all interactive elements
    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor], .perspective-card, .glass-card-hover"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onInteractEnter as EventListener);
      el.addEventListener("mouseleave", onInteractLeave);
    });

    // MutationObserver to catch dynamic elements
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll(
        "a, button, [data-cursor], .perspective-card, .glass-card-hover"
      );
      newEls.forEach((el) => {
        el.addEventListener("mouseenter", onInteractEnter as EventListener);
        el.addEventListener("mouseleave", onInteractLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label font-mono-custom" aria-hidden="true" />
    </>
  );
}
