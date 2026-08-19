"use client";

import { useEffect, useRef, useState } from "react";
// @ts-expect-error - handtrackjs doesn't have official types
import * as handTrack from "handtrackjs";

export function GestureController() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let model: any = null;
    let isVideoStarted = false;
    let animationId: number;
    let lastY = 0;
    let smoothY = 0;

    const defaultParams = {
      flipHorizontal: true,
      maxNumBoxes: 1,
      iouThreshold: 0.5,
      scoreThreshold: 0.65,
    };

    const setup = async () => {
      try {
        model = await handTrack.load(defaultParams);
        
        if (videoRef.current) {
          const status = await handTrack.startVideo(videoRef.current);
          if (status) {
            isVideoStarted = true;
            setIsReady(true);
            setPermissionGranted(true);
            runDetection();
          } else {
            setPermissionGranted(false);
          }
        }
      } catch (err) {
        console.error("Camera access denied or Handtrack failed", err);
        setPermissionGranted(false);
      }
    };

    const runDetection = () => {
      if (!isVideoStarted || !videoRef.current || !canvasRef.current || !model) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model.detect(videoRef.current).then((predictions: any[]) => {
        const ctx = canvasRef.current!.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          
          if (predictions && predictions.length > 0) {
            const hand = predictions[0];
            
            // Draw a cyberpunk targeting box
            const [x, y, width, height] = hand.bbox;
            ctx.strokeStyle = hand.class === "pinch" ? "#ff003c" : "#00f0ff";
            ctx.lineWidth = 2;
            
            // Draw corners
            const len = 15;
            ctx.beginPath();
            // Top left
            ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y);
            // Top right
            ctx.moveTo(x + width - len, y); ctx.lineTo(x + width, y); ctx.lineTo(x + width, y + len);
            // Bottom right
            ctx.moveTo(x + width, y + height - len); ctx.lineTo(x + width, y + height); ctx.lineTo(x + width - len, y + height);
            // Bottom left
            ctx.moveTo(x + len, y + height); ctx.lineTo(x, y + height); ctx.lineTo(x, y + height - len);
            ctx.stroke();

            // Label
            ctx.fillStyle = hand.class === "pinch" ? "#ff003c" : "#00f0ff";
            ctx.font = "10px monospace";
            ctx.fillText(hand.class.toUpperCase(), x, y - 5);

            // Logic for scrolling using Y center of bbox
            const centerY = y + height / 2;
            
            if (hand.class === "open" || hand.class === "closed") {
              if (lastY !== 0) {
                const dy = centerY - lastY;
                smoothY = smoothY * 0.5 + dy * 0.5;
                
                if (Math.abs(smoothY) > 2) {
                  // Scroll the window
                  window.scrollBy(0, smoothY * 4); 
                }
              }
              lastY = centerY;
            } else if (hand.class === "pinch") {
              // Create a visual ripple or trigger a click effect on the body
              const ripple = document.createElement("div");
              ripple.style.position = "fixed";
              ripple.style.left = "50%";
              ripple.style.top = "50%";
              ripple.style.transform = "translate(-50%, -50%)";
              ripple.style.width = "20px";
              ripple.style.height = "20px";
              ripple.style.border = "2px solid #ff003c";
              ripple.style.borderRadius = "50%";
              ripple.style.zIndex = "9999";
              ripple.style.pointerEvents = "none";
              ripple.style.animation = "ping 1s cubic-bezier(0, 0, 0.2, 1) forwards";
              document.body.appendChild(ripple);
              setTimeout(() => ripple.remove(), 1000);
              lastY = 0; // reset scroll anchor
            } else {
              lastY = 0;
            }
          } else {
            lastY = 0;
            smoothY = 0;
          }
        }
        
        animationId = requestAnimationFrame(runDetection);
      });
    };

    setup();
    const currentVideo = videoRef.current;

    return () => {
      cancelAnimationFrame(animationId);
      if (currentVideo) {
        handTrack.stopVideo(currentVideo);
      }
    };
  }, []);

  if (permissionGranted === false) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 rounded-sm overflow-hidden border border-[var(--color-gold-glow)] shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-black/80 backdrop-blur-md">
      {!isReady && permissionGranted && (
        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-gold)] font-mono text-[10px] z-10 bg-black/90">
          UPLINKING...
        </div>
      )}
      <div className="relative w-48 h-36">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-20"
          autoPlay
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          width={320}
          height={240}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
      <div className="absolute bottom-1 left-0 right-0 text-[8px] text-center tracking-[0.2em] text-[var(--color-gold)] opacity-70 border-t border-[var(--color-gold-dim)] bg-black/50 py-1" style={{ fontFamily: "var(--font-mono)" }}>
        OPTICAL SENSOR ACTIVE
      </div>
    </div>
  );
}
