"use client";

import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouseX = width / 2;
    let mouseY = height / 2;
    let raf: number;
    let time = 0;

    // Spherical particle field (astrolabe-style)
    const N = 180;
    type Particle = {
      theta: number; phi: number; r: number;
      x: number; y: number; z: number;
      vTheta: number; vPhi: number;
      size: number; alpha: number;
    };

    const particles: Particle[] = Array.from({ length: N }, (_, i) => {
      const theta = Math.acos(-1 + (2 * i) / N);
      const phi = Math.sqrt(N * Math.PI) * theta;
      const r = 220;
      return {
        theta, phi, r,
        x: 0, y: 0, z: 0,
        vTheta: (Math.random() - 0.5) * 0.004,
        vPhi: (Math.random() - 0.5) * 0.004,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.3,
      };
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      const cx = width / 2;
      const cy = height / 2;
      const influence = 0.0008;

      // Compute 3D positions
      const projected: Array<{ x: number; y: number; z: number; alpha: number; size: number }> = [];

      particles.forEach((p) => {
        p.theta += p.vTheta + (mouseY / height - 0.5) * influence;
        p.phi += p.vPhi + (mouseX / width - 0.5) * influence + 0.003;

        const sinT = Math.sin(p.theta);
        const cosT = Math.cos(p.theta);
        const sinP = Math.sin(p.phi + time * 0.15);
        const cosP = Math.cos(p.phi + time * 0.15);

        p.x = p.r * sinT * cosP;
        p.y = p.r * sinT * sinP;
        p.z = p.r * cosT;

        // Perspective projection
        const fov = 500;
        const scale = fov / (fov + p.z);
        const px = cx + p.x * scale;
        const py = cy + p.y * scale;
        const alpha = p.alpha * scale;

        projected.push({ x: px, y: py, z: p.z, alpha, size: p.size * scale });
      });

      // Sort back-to-front
      projected.sort((a, b) => a.z - b.z);

      // Draw connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 55) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.12 * (1 - dist / 55)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      projected.forEach(({ x, y, alpha, size, z }) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        // Color varies by z-depth
        const t = (z + 220) / 440;
        const r = Math.round(0 + t * 245);
        const g = Math.round(245 - t * 100);
        const b = Math.round(212 - t * 60);
        gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
}
