"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleField({ count = 2500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const goldColor = new THREE.Color("#D4AF37");
    const cyanColor = new THREE.Color("#00F0FF");
    const whiteColor = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      // Cylindrical / spherical cloud distribution around the center
      const radius = 2.5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) + (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = radius * Math.cos(phi) * Math.cos(theta);

      // Color distribution: 65% Gold, 25% Cyan, 10% Diamond White
      const rand = Math.random();
      const chosenColor = rand < 0.65 ? goldColor : rand < 0.9 ? cyanColor : whiteColor;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Slow orbital rotation + pointer parallax
    pointsRef.current.rotation.y = t * 0.04 + mouseX * 0.2;
    pointsRef.current.rotation.x = -mouseY * 0.15 + Math.sin(t * 0.02) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
