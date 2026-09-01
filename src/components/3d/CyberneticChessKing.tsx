"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export function CyberneticChessKing({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const kingGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const crownRef = useRef<THREE.Group>(null);

  // Memoized Three.js Materials
  const materials = useMemo(() => {
    return {
      gold: new THREE.MeshStandardMaterial({
        color: "#D4AF37",
        metalness: 0.88,
        roughness: 0.22,
      }),
      chrome: new THREE.MeshStandardMaterial({
        color: "#181822",
        metalness: 0.95,
        roughness: 0.15,
      }),
      cyanGlow: new THREE.MeshStandardMaterial({
        color: "#00F0FF",
        emissive: "#00F0FF",
        emissiveIntensity: 1.8,
        roughness: 0.1,
      }),
      goldGlow: new THREE.MeshStandardMaterial({
        color: "#FFD700",
        emissive: "#D4AF37",
        emissiveIntensity: 1.2,
        roughness: 0.2,
      }),
    };
  }, []);

  useFrame((state) => {
    if (!kingGroupRef.current) return;

    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Smooth Cursor Physics Interpolation
    const targetRotY = mouseX * 0.6 + t * 0.15 + scrollProgress * Math.PI * 2;
    const targetRotX = -mouseY * 0.35 + Math.sin(t * 0.8) * 0.05;
    const targetRotZ = mouseX * 0.15;

    kingGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      kingGroupRef.current.rotation.y,
      targetRotY,
      0.06
    );
    kingGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      kingGroupRef.current.rotation.x,
      targetRotX,
      0.06
    );
    kingGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      kingGroupRef.current.rotation.z,
      targetRotZ,
      0.06
    );

    // Scroll Position Interpolation
    const targetX = Math.sin(scrollProgress * Math.PI) * 1.5;
    const targetY = (1 - scrollProgress * 2) * 0.3;
    kingGroupRef.current.position.x = THREE.MathUtils.lerp(
      kingGroupRef.current.position.x,
      targetX,
      0.05
    );
    kingGroupRef.current.position.y = THREE.MathUtils.lerp(
      kingGroupRef.current.position.y,
      targetY,
      0.05
    );

    // Rotate Orbiting Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.8;
      ring1Ref.current.rotation.y = t * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.6;
      ring2Ref.current.rotation.z = t * 0.9;
    }

    // Pulse Glowing Core
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.12;
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Floating Crown subtle breathing
    if (crownRef.current) {
      crownRef.current.position.y = 2.45 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={kingGroupRef} position={[0, -0.4, 0]} scale={1.2}>
        {/* === BASE PLATFORM === */}
        <mesh position={[0, -1.8, 0]} material={materials.gold}>
          <cylinderGeometry args={[1.3, 1.4, 0.25, 32]} />
        </mesh>
        <mesh position={[0, -1.6, 0]} material={materials.chrome}>
          <cylinderGeometry args={[1.1, 1.25, 0.2, 32]} />
        </mesh>
        <mesh position={[0, -1.4, 0]} material={materials.gold}>
          <torusGeometry args={[1.05, 0.08, 16, 32]} />
        </mesh>

        {/* === LOWER PEDESTAL === */}
        <mesh position={[0, -1.0, 0]} material={materials.chrome}>
          <cylinderGeometry args={[0.75, 1.05, 0.7, 32]} />
        </mesh>
        <mesh position={[0, -0.65, 0]} material={materials.gold}>
          <cylinderGeometry args={[0.65, 0.75, 0.15, 32]} />
        </mesh>

        {/* === WAIST & CORE REACTOR === */}
        <mesh position={[0, 0.2, 0]} material={materials.chrome}>
          <cylinderGeometry args={[0.55, 0.7, 1.2, 32]} />
        </mesh>

        {/* Inner Glowing Reactor Core */}
        <mesh ref={coreRef} position={[0, 0.2, 0]} material={materials.cyanGlow}>
          <sphereGeometry args={[0.32, 24, 24]} />
        </mesh>

        {/* Tactical Window Cutouts */}
        {[0, 90, 180, 270].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((angle * Math.PI) / 180) * 0.58,
              0.2,
              Math.sin((angle * Math.PI) / 180) * 0.58,
            ]}
            rotation={[0, -(angle * Math.PI) / 180, 0]}
            material={materials.goldGlow}
          >
            <boxGeometry args={[0.08, 0.6, 0.04]} />
          </mesh>
        ))}

        {/* === UPPER CHEST & COLLAR === */}
        <mesh position={[0, 0.9, 0]} material={materials.gold}>
          <cylinderGeometry args={[0.8, 0.55, 0.35, 32]} />
        </mesh>
        <mesh position={[0, 1.1, 0]} material={materials.chrome}>
          <torusGeometry args={[0.78, 0.06, 16, 32]} />
        </mesh>

        {/* === HEAD / CRANIUM === */}
        <mesh position={[0, 1.6, 0]} material={materials.gold}>
          <sphereGeometry args={[0.75, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        </mesh>
        <mesh position={[0, 2.05, 0]} material={materials.chrome}>
          <cylinderGeometry args={[0.55, 0.7, 0.3, 32]} />
        </mesh>

        {/* === FLOATING IMPERIAL CROWN & CROSS === */}
        <group ref={crownRef} position={[0, 2.45, 0]}>
          <mesh material={materials.gold}>
            <torusGeometry args={[0.42, 0.06, 16, 32]} />
          </mesh>
          {[0, 90, 180, 270].map((angle, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((angle * Math.PI) / 180) * 0.42,
                0.12,
                Math.sin((angle * Math.PI) / 180) * 0.42,
              ]}
              material={materials.gold}
            >
              <coneGeometry args={[0.08, 0.22, 16]} />
            </mesh>
          ))}

          {/* Central King's Cross */}
          <mesh position={[0, 0.35, 0]} material={materials.goldGlow}>
            <boxGeometry args={[0.1, 0.45, 0.1]} />
          </mesh>
          <mesh position={[0, 0.42, 0]} material={materials.goldGlow}>
            <boxGeometry args={[0.32, 0.09, 0.09]} />
          </mesh>
        </group>

        {/* === ORBITING HOLOGRAPHIC TACTICAL RINGS === */}
        <mesh ref={ring1Ref} position={[0, 0.2, 0]}>
          <torusGeometry args={[1.2, 0.02, 16, 64]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
        </mesh>

        <mesh ref={ring2Ref} position={[0, 0.2, 0]}>
          <torusGeometry args={[1.4, 0.015, 16, 64]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}
