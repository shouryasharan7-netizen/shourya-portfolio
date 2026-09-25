"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";

interface MacWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isActive: boolean;
  zIndex: number;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export function MacWindow({
  id,
  title,
  isOpen,
  isMinimized,
  isActive,
  zIndex,
  initialX = 120,
  initialY = 70,
  initialWidth = 840,
  initialHeight = 560,
  onClose,
  onMinimize,
  onFocus,
  children,
}: MacWindowProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ w: initialWidth, h: initialHeight });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaxState, setPreMaxState] = useState({ x: initialX, y: initialY, w: initialWidth, h: initialHeight });

  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Center or offset on smaller mobile screens
    if (typeof window !== "undefined") {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw < 768) {
        setPos({ x: 8, y: 36 });
        setSize({ w: vw - 16, h: vh - 110 });
      }
    }
  }, []);

  if (!isOpen || isMinimized) return null;

  const onMouseDownTitle = (e: React.MouseEvent) => {
    onFocus();
    if (isMaximized) return; // don't drag if maximized
    isDraggingRef.current = true;
    dragOffsetRef.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newX = Math.max(0, Math.min(window.innerWidth - 120, ev.clientX - dragOffsetRef.current.x));
      const newY = Math.max(30, Math.min(window.innerHeight - 80, ev.clientY - dragOffsetRef.current.y));
      setPos({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const toggleMaximize = () => {
    soundEngine.playWindowClick();
    if (!isMaximized) {
      setPreMaxState({ x: pos.x, y: pos.y, w: size.w, h: size.h });
      setPos({ x: 12, y: 34 });
      setSize({ w: window.innerWidth - 24, h: window.innerHeight - 110 });
      setIsMaximized(true);
    } else {
      setPos({ x: preMaxState.x, y: preMaxState.y });
      setSize({ w: preMaxState.w, h: preMaxState.h });
      setIsMaximized(false);
    }
  };

  return (
    <div
      onMouseDown={onFocus}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        width: `${size.w}px`,
        height: `${size.h}px`,
        zIndex: zIndex,
        transition: isDraggingRef.current ? "none" : "width 0.2s ease-out, height 0.2s ease-out",
      }}
      className={`fixed top-0 left-0 rounded-xl overflow-hidden flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_30px_rgba(255,255,255,0.05)] border transition-shadow duration-200 ${
        isActive
          ? "border-white/20 ring-1 ring-white/10"
          : "border-white/10 opacity-95"
      }`}
    >
      {/* Draggable Titlebar Overlay */}
      <div
        onMouseDown={onMouseDownTitle}
        onDoubleClick={toggleMaximize}
        className="absolute top-0 left-0 right-0 h-10 z-40 cursor-grab active:cursor-grabbing flex items-center justify-between px-3.5 select-none pointer-events-auto"
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playWindowClick();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 active:brightness-90 cursor-pointer shadow-sm"
            title="Close"
            aria-label="Close Window"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playWindowClick();
              onMinimize();
            }}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:opacity-80 active:brightness-90 cursor-pointer shadow-sm"
            title="Minimize"
            aria-label="Minimize Window"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
            className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:opacity-80 active:brightness-90 cursor-pointer shadow-sm"
            title="Maximize"
            aria-label="Maximize Window"
          />
        </div>

        <span className="text-xs font-semibold text-white/90 tracking-tight truncate max-w-sm">
          {title}
        </span>

        <div className="w-12" />
      </div>

      {/* Window Content Container */}
      <div className="flex-1 w-full h-full pt-10 overflow-hidden bg-[#121217]">
        {children}
      </div>
    </div>
  );
}
