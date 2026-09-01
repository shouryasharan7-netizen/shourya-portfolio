"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { CyberneticChessKing } from "./CyberneticChessKing";
import { ChessGridFloor } from "./ChessGridFloor";
import { ParticleField } from "./ParticleField";

interface MainSceneProps {
  scrollProgress: number;
  isOrbitMode: boolean;
}

export function MainScene({ scrollProgress = 0, isOrbitMode = false }: MainSceneProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7.5]} fov={45} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.4} />

        {/* Primary Gold Key Light */}
        <spotLight
          position={[5, 8, 5]}
          intensity={2.5}
          color="#FFE599"
          angle={0.6}
          penumbra={0.8}
        />

        {/* Secondary Cyan Rim Light */}
        <spotLight
          position={[-6, 4, -4]}
          intensity={3.0}
          color="#00F0FF"
          angle={0.8}
          penumbra={1}
        />

        {/* Core Warm Glow Fill */}
        <pointLight position={[0, 0, 3]} intensity={1.2} color="#D4AF37" distance={8} />

        <Suspense fallback={null}>
          {/* Central Cybernetic Chess King */}
          <CyberneticChessKing scrollProgress={scrollProgress} />

          {/* Tactical Chessboard Grid Floor */}
          <ChessGridFloor />

          {/* 3D GPU Particle Cloud */}
          <ParticleField count={2200} />
        </Suspense>

        {/* Interactive Orbit Controls when user toggles Orbit Mode */}
        {isOrbitMode && (
          <OrbitControls
            enablePan={false}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2 + 0.1}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
}
