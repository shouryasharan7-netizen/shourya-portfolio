"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { audioEngine } from "@/components/audio/AudioEngine";

interface MainSceneProps {
  scrollProgress: number;
  isHologramMode: boolean;
  empTriggerCount: number;
}

export function MainScene({
  scrollProgress = 0,
  isHologramMode = false,
  empTriggerCount = 0,
}: MainSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneStateRef = useRef<{
    kingGroup: THREE.Group;
    ring1: THREE.Mesh;
    ring2: THREE.Mesh;
    arcReactor: THREE.Mesh;
    plasmaRing: THREE.Mesh;
    crown: THREE.Group;
    scannerRing: THREE.Mesh;
    empWave: THREE.Mesh;
    particles: THREE.Points;
    particleBasePositions: Float32Array;
    particleVelocities: Float32Array;
    grid: THREE.GridHelper;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scrollProgress: number;
    isHologramMode: boolean;
    materials: {
      gold: THREE.MeshStandardMaterial;
      chrome: THREE.MeshStandardMaterial;
      cyanGlow: THREE.MeshStandardMaterial;
      goldGlow: THREE.MeshStandardMaterial;
      holoWireframe: THREE.MeshBasicMaterial;
    };
    mouse: { x: number; y: number; targetX: number; targetY: number };
    empRadius: number;
    empActive: boolean;
  } | null>(null);

  // Synchronize dynamic props with WebGL scene
  useEffect(() => {
    if (sceneStateRef.current) {
      sceneStateRef.current.scrollProgress = scrollProgress;
      sceneStateRef.current.isHologramMode = isHologramMode;

      // Update material modes between Solid Cyber-Imperial and JARVIS Hologram CAD
      const { kingGroup, materials } = sceneStateRef.current;
      kingGroup.traverse((child) => {
        if (child instanceof THREE.Mesh && child !== sceneStateRef.current?.arcReactor) {
          if (isHologramMode) {
            child.material = materials.holoWireframe;
          } else {
            // Restore original material by name / tag
            const matType = child.userData.matType;
            if (matType === "gold") child.material = materials.gold;
            else if (matType === "chrome") child.material = materials.chrome;
            else if (matType === "goldGlow") child.material = materials.goldGlow;
            else if (matType === "cyanGlow") child.material = materials.cyanGlow;
          }
        }
      });
    }
  }, [scrollProgress, isHologramMode]);

  // Trigger EMP Shockwave explosion in WebGL particle field
  useEffect(() => {
    if (empTriggerCount > 0 && sceneStateRef.current) {
      sceneStateRef.current.empActive = true;
      sceneStateRef.current.empRadius = 0.1;
      audioEngine.playEMP();
    }
  }, [empTriggerCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Cinematic Studio & Laser Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const goldSpot = new THREE.SpotLight(0xffe599, 3.0);
    goldSpot.position.set(6, 8, 6);
    goldSpot.angle = 0.6;
    goldSpot.penumbra = 0.8;
    scene.add(goldSpot);

    const cyanSpot = new THREE.SpotLight(0x00f0ff, 3.5);
    cyanSpot.position.set(-6, 5, -4);
    cyanSpot.angle = 0.8;
    cyanSpot.penumbra = 1;
    scene.add(cyanSpot);

    const reactorPoint = new THREE.PointLight(0x00f0ff, 2.0, 8);
    reactorPoint.position.set(0, 0, 1.5);
    scene.add(reactorPoint);

    // 4. Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x181824,
      metalness: 0.95,
      roughness: 0.15,
    });

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });

    const goldGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xd4af37,
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });

    const holoWireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    // 5. Build Procedural Cybernetic King with ARC REACTOR
    const kingGroup = new THREE.Group();
    kingGroup.position.set(0, -0.4, 0);
    kingGroup.scale.set(1.2, 1.2, 1.2);

    const createMesh = (geo: THREE.BufferGeometry, mat: THREE.Material, type: string) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData.matType = type;
      return mesh;
    };

    // Base Tier 1
    const base1 = createMesh(new THREE.CylinderGeometry(1.3, 1.4, 0.25, 32), goldMat, "gold");
    base1.position.y = -1.8;
    kingGroup.add(base1);

    // Base Tier 2
    const base2 = createMesh(new THREE.CylinderGeometry(1.1, 1.25, 0.2, 32), chromeMat, "chrome");
    base2.position.y = -1.6;
    kingGroup.add(base2);

    // Base Collar
    const baseCollar = createMesh(new THREE.TorusGeometry(1.05, 0.08, 16, 32), goldMat, "gold");
    baseCollar.position.y = -1.4;
    baseCollar.rotation.x = Math.PI / 2;
    kingGroup.add(baseCollar);

    // Lower Pedestal
    const ped1 = createMesh(new THREE.CylinderGeometry(0.75, 1.05, 0.7, 32), chromeMat, "chrome");
    ped1.position.y = -1.0;
    kingGroup.add(ped1);

    const ped2 = createMesh(new THREE.CylinderGeometry(0.65, 0.75, 0.15, 32), goldMat, "gold");
    ped2.position.y = -0.65;
    kingGroup.add(ped2);

    // Fluted Waist Body
    const waist = createMesh(new THREE.CylinderGeometry(0.55, 0.7, 1.2, 32), chromeMat, "chrome");
    waist.position.y = 0.2;
    kingGroup.add(waist);

    // ARC REACTOR Core: Concentric Glowing Plasma Rings
    const arcReactor = createMesh(new THREE.SphereGeometry(0.35, 24, 24), cyanGlowMat, "cyanGlow");
    arcReactor.position.y = 0.2;
    kingGroup.add(arcReactor);

    const plasmaRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.42, 0.025, 16, 32),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.9 })
    );
    plasmaRing.position.y = 0.2;
    kingGroup.add(plasmaRing);

    // Tactical Cutout Windows
    [0, 90, 180, 270].forEach((angle) => {
      const rad = (angle * Math.PI) / 180;
      const windowMesh = createMesh(new THREE.BoxGeometry(0.08, 0.6, 0.04), goldGlowMat, "goldGlow");
      windowMesh.position.set(Math.cos(rad) * 0.58, 0.2, Math.sin(rad) * 0.58);
      windowMesh.rotation.y = -rad;
      kingGroup.add(windowMesh);
    });

    // Upper Chest & Neck
    const chest = createMesh(new THREE.CylinderGeometry(0.8, 0.55, 0.35, 32), goldMat, "gold");
    chest.position.y = 0.9;
    kingGroup.add(chest);

    const neck = createMesh(new THREE.TorusGeometry(0.78, 0.06, 16, 32), chromeMat, "chrome");
    neck.position.y = 1.1;
    neck.rotation.x = Math.PI / 2;
    kingGroup.add(neck);

    // Head Sphere
    const head = createMesh(
      new THREE.SphereGeometry(0.75, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7),
      goldMat,
      "gold"
    );
    head.position.y = 1.6;
    kingGroup.add(head);

    const headCap = createMesh(new THREE.CylinderGeometry(0.55, 0.7, 0.3, 32), chromeMat, "chrome");
    headCap.position.y = 2.05;
    kingGroup.add(headCap);

    // Floating Crown & Cross
    const crown = new THREE.Group();
    crown.position.y = 2.45;

    const crownRing = createMesh(new THREE.TorusGeometry(0.42, 0.06, 16, 32), goldMat, "gold");
    crownRing.rotation.x = Math.PI / 2;
    crown.add(crownRing);

    [0, 90, 180, 270].forEach((angle) => {
      const rad = (angle * Math.PI) / 180;
      const spire = createMesh(new THREE.ConeGeometry(0.08, 0.22, 16), goldMat, "gold");
      spire.position.set(Math.cos(rad) * 0.42, 0.12, Math.sin(rad) * 0.42);
      crown.add(spire);
    });

    const crossV = createMesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), goldGlowMat, "goldGlow");
    crossV.position.y = 0.35;
    crown.add(crossV);

    const crossH = createMesh(new THREE.BoxGeometry(0.32, 0.09, 0.09), goldGlowMat, "goldGlow");
    crossH.position.y = 0.42;
    crown.add(crossH);

    kingGroup.add(crown);

    // Counter-Rotating Holographic Gyro Rings with Vector Ticks
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.25, 0.02, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.75 })
    );
    ring1.position.y = 0.2;
    kingGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.45, 0.015, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.65 })
    );
    ring2.position.y = 0.2;
    kingGroup.add(ring2);

    scene.add(kingGroup);

    // 6. JARVIS Laser Scanner Ring (Sweeping vertically)
    const scannerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.015, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85 })
    );
    scannerRing.rotation.x = Math.PI / 2;
    scannerRing.position.y = 0;
    scene.add(scannerRing);

    // 7. EMP Shockwave Expansion Ring
    const empWave = new THREE.Mesh(
      new THREE.RingGeometry(0.1, 0.2, 64),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    empWave.rotation.x = -Math.PI / 2;
    empWave.position.y = -0.4;
    scene.add(empWave);

    // 8. Tactical Infinite Grid Floor
    const grid = new THREE.GridHelper(40, 40, 0xd4af37, 0x181812);
    grid.position.y = -2.6;
    scene.add(grid);

    const floorPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x030305, roughness: 0.6, metalness: 0.85 })
    );
    floorPlate.position.y = -2.65;
    floorPlate.rotation.x = -Math.PI / 2;
    scene.add(floorPlate);

    // 9. GPU Particle Nebula with Kinetic Shockwave Physics
    const particleCount = 2500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldC = new THREE.Color(0xd4af37);
    const cyanC = new THREE.Color(0x00f0ff);
    const whiteC = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const px = radius * Math.cos(phi) * Math.sin(theta);
      const py = radius * Math.sin(phi) + (Math.random() - 0.5) * 4;
      const pz = radius * Math.cos(phi) * Math.cos(theta);

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      basePositions[i * 3] = px;
      basePositions[i * 3 + 1] = py;
      basePositions[i * 3 + 2] = pz;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      const r = Math.random();
      const col = r < 0.65 ? goldC : r < 0.9 ? cyanC : whiteC;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 10. Store State
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    sceneStateRef.current = {
      kingGroup,
      ring1,
      ring2,
      arcReactor,
      plasmaRing,
      crown,
      scannerRing,
      empWave,
      particles,
      particleBasePositions: basePositions,
      particleVelocities: velocities,
      grid,
      camera,
      renderer,
      scrollProgress,
      isHologramMode,
      materials: {
        gold: goldMat,
        chrome: chromeMat,
        cyanGlow: cyanGlowMat,
        goldGlow: goldGlowMat,
        holoWireframe: holoWireframeMat,
      },
      mouse,
      empRadius: 0,
      empActive: false,
    };

    // 11. Interactive Listeners
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        kingGroup.rotation.y += deltaX * 0.008;
        kingGroup.rotation.x += deltaY * 0.008;
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("resize", onResize);

    // 12. High-Performance 60-120 FPS WebGL Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const state = sceneStateRef.current;
      if (!state) return;

      const t = clock.getElapsedTime();

      // Smooth pointer interpolation
      state.mouse.x = THREE.MathUtils.lerp(state.mouse.x, state.mouse.targetX, 0.08);
      state.mouse.y = THREE.MathUtils.lerp(state.mouse.y, state.mouse.targetY, 0.08);

      if (!isDragging) {
        const targetRotY = state.mouse.x * 0.65 + t * 0.15 + state.scrollProgress * Math.PI * 2;
        const targetRotX = -state.mouse.y * 0.35 + Math.sin(t * 0.8) * 0.05;
        const targetRotZ = state.mouse.x * 0.15;

        kingGroup.rotation.y = THREE.MathUtils.lerp(kingGroup.rotation.y, targetRotY, 0.05);
        kingGroup.rotation.x = THREE.MathUtils.lerp(kingGroup.rotation.x, targetRotX, 0.05);
        kingGroup.rotation.z = THREE.MathUtils.lerp(kingGroup.rotation.z, targetRotZ, 0.05);

        const targetX = Math.sin(state.scrollProgress * Math.PI) * 1.5;
        const targetY = (1 - state.scrollProgress * 2) * 0.3 - 0.4;
        kingGroup.position.x = THREE.MathUtils.lerp(kingGroup.position.x, targetX, 0.05);
        kingGroup.position.y = THREE.MathUtils.lerp(kingGroup.position.y, targetY, 0.05);
      }

      // Gyro Rings Spin
      ring1.rotation.x = t * 0.9;
      ring1.rotation.y = t * 0.6;
      ring2.rotation.x = -t * 0.7;
      ring2.rotation.z = t * 1.1;

      // Arc Reactor Pulsing
      const reactorScale = 1 + Math.sin(t * 4) * 0.14;
      arcReactor.scale.set(reactorScale, reactorScale, reactorScale);
      plasmaRing.rotation.z = t * 2;

      // Floating Crown Breathing
      crown.position.y = 2.45 + Math.sin(t * 2) * 0.06;

      // JARVIS Laser Scanner Vertical Sweep
      scannerRing.position.y = Math.sin(t * 2) * 2.2;
      scannerRing.rotation.z = t * 1.5;

      // EMP Shockwave Animation
      if (state.empActive) {
        state.empRadius += 0.35;
        const mat = empWave.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1 - state.empRadius / 15);
        empWave.scale.set(state.empRadius, state.empRadius, state.empRadius);

        if (state.empRadius > 15) {
          state.empActive = false;
          mat.opacity = 0;
        }
      }

      // GPU Particle Nebula Physics
      const posAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
      const pPos = posAttr.array as Float32Array;
      const basePos = state.particleBasePositions;
      const vels = state.particleVelocities;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;

        // EMP force push
        if (state.empActive) {
          const dx = pPos[idx];
          const dy = pPos[idx + 1];
          const dz = pPos[idx + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (Math.abs(dist - state.empRadius) < 1.2) {
            vels[idx] += (dx / dist) * 0.25;
            vels[idx + 1] += (dy / dist) * 0.25;
            vels[idx + 2] += (dz / dist) * 0.25;
          }
        }

        // Spring restoration back to base
        vels[idx] += (basePos[idx] - pPos[idx]) * 0.04;
        vels[idx + 1] += (basePos[idx + 1] - pPos[idx + 1]) * 0.04;
        vels[idx + 2] += (basePos[idx + 2] - pPos[idx + 2]) * 0.04;

        // Damping
        vels[idx] *= 0.88;
        vels[idx + 1] *= 0.88;
        vels[idx + 2] *= 0.88;

        pPos[idx] += vels[idx];
        pPos[idx + 1] += vels[idx + 1];
        pPos[idx + 2] += vels[idx + 2];
      }
      posAttr.needsUpdate = true;

      // Particle Nebula Slow Orbital Rotation
      particles.rotation.y = t * 0.035 + state.mouse.x * 0.25;
      particles.rotation.x = -state.mouse.y * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // 13. Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      scene.clear();
      sceneStateRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      role="img"
      aria-label="JARVIS Holographic 3D Spatial Domain. Drag to rotate and explore."
    />
  );
}
