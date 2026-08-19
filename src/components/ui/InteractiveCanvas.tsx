"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A single instanced mesh for high performance
function ParticleTrail() {
  const count = 3000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Track particles: position, velocity, life, target
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 10,
        vx: 0,
        vy: 0,
        vz: 0,
        life: Math.random(),
        scale: Math.random() * 0.15 + 0.05,
      });
    }
    return temp;
  }, [count]);

  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const targetMouse = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth mouse interpolation
    mouse.current.lerp(targetMouse.current, 0.1);

    // Convert screen coordinates to world coordinates roughly
    const vMouse = new THREE.Vector3(
      mouse.current.x * 20,
      mouse.current.y * 10,
      0
    );

    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      // Swarm behavior towards mouse
      const dx = vMouse.x - p.x;
      const dy = vMouse.y - p.y;
      const dz = vMouse.z - p.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // Force field around cursor
      if (dist < 5) {
        const force = (5 - dist) / 5;
        p.vx += (dx / dist) * force * 0.05;
        p.vy += (dy / dist) * force * 0.05;
        p.vz += (dz / dist) * force * 0.02;
      }

      // Add some noise
      p.vx += (Math.sin(time * 0.5 + i) * 0.01);
      p.vy += (Math.cos(time * 0.5 + i) * 0.01);

      // Friction
      p.vx *= 0.92;
      p.vy *= 0.92;
      p.vz *= 0.92;

      // Update position
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Wrap around bounds softly
      if (p.x > 25) p.x = -25;
      if (p.x < -25) p.x = 25;
      if (p.y > 15) p.y = -15;
      if (p.y < -15) p.y = 15;
      if (p.z > 5) p.z = -5;
      if (p.z < -5) p.z = 5;

      p.life -= 0.005;
      if (p.life < 0) p.life = 1;

      // Scale pulses with life
      const currentScale = p.scale * Math.sin(p.life * Math.PI);

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial 
        color="#c5a059" 
        transparent 
        opacity={0.4} 
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

export function InteractiveCanvas() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none opacity-60 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 2]}
      >
        <ParticleTrail />
      </Canvas>
    </div>
  );
}
