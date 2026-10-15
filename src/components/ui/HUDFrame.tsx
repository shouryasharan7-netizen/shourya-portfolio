"use client";

import { useEffect, useState } from "react";

const ACTS = ["PRELUDE", "ACT I · ORIGINS", "ACT II · DUALITY", "ACT III · COMMAND", "ACT IV · VAULT", "ACT V · ARSENAL", "EPILOGUE"];

export default function HUDFrame() {
  const [scrollPct, setScrollPct] = useState(0);
  const [actIndex, setActIndex] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const iv = setInterval(updateTime, 1000);

    const onScroll = () => {
      const el = document.documentElement;
      const pct = Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100) || 0;
      setScrollPct(pct);
      // Map scroll % to act
      if (pct < 5) setActIndex(0);
      else if (pct < 20) setActIndex(1);
      else if (pct < 38) setActIndex(2);
      else if (pct < 58) setActIndex(3);
      else if (pct < 75) setActIndex(4);
      else if (pct < 90) setActIndex(5);
      else setActIndex(6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(iv);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="hud-frame" aria-hidden="true">
      {/* Progress bar */}
      <div className="hud-progress-bar" style={{ width: `${scrollPct}%` }} />

      {/* Corners */}
      <div className="hud-corner tl" />
      <div className="hud-corner tr" />
      <div className="hud-corner bl" />
      <div className="hud-corner br" />

      {/* Left Info */}
      <div className="hud-info-left hidden md:block">
        <div>21.1458° N, 79.0882° E — NAGPUR</div>
        <div>IST {time}</div>
        <div>SCROLL {scrollPct.toString().padStart(3, "0")}%</div>
      </div>

      {/* Right Info */}
      <div className="hud-info-right hidden md:block">
        <div>{ACTS[actIndex]}</div>
        <div>SHOURYA SHARAN · v3.0</div>
        <div>CHRONO-CYBERNETIC</div>
      </div>
    </div>
  );
}
