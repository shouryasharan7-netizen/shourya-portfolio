"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ChessGridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.getElapsedTime();
    // Very subtle oscillation
    gridRef.current.position.z = (t * 0.2) % 2;
  });

  return (
    <group position={[0, -2.6, 0]}>
      {/* Tactical Infinite Grid Floor */}
      <gridHelper
        ref={gridRef}
        args={[40, 40, "#D4AF37", "#1E1A10"]}
        position={[0, 0, 0]}
      />

      {/* Ground dark reflection plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#030305"
          roughness={0.6}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}
