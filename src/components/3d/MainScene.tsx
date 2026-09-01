"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface MainSceneProps {
  scrollProgress: number;
  isOrbitMode: boolean;
}

export function MainScene({ scrollProgress = 0, isOrbitMode = false }: MainSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    kingGroup: THREE.Group;
    ring1: THREE.Mesh;
    ring2: THREE.Mesh;
    core: THREE.Mesh;
    crown: THREE.Group;
    particles: THREE.Points;
    grid: THREE.GridHelper;
    controls: OrbitControls | null;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scrollProgress: number;
    isOrbitMode: boolean;
    mouse: { x: number; y: number };
  } | null>(null);

  // Update refs when props change
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.scrollProgress = scrollProgress;
      sceneRef.current.isOrbitMode = isOrbitMode;
      if (sceneRef.current.controls) {
        sceneRef.current.controls.enabled = isOrbitMode;
      }
    }
  }, [scrollProgress, isOrbitMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
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

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const goldSpot = new THREE.SpotLight(0xffe599, 2.5);
    goldSpot.position.set(5, 8, 5);
    goldSpot.angle = 0.6;
    goldSpot.penumbra = 0.8;
    scene.add(goldSpot);

    const cyanSpot = new THREE.SpotLight(0x00f0ff, 3.0);
    cyanSpot.position.set(-6, 4, -4);
    cyanSpot.angle = 0.8;
    cyanSpot.penumbra = 1;
    scene.add(cyanSpot);

    const fillPoint = new THREE.PointLight(0xd4af37, 1.2, 10);
    fillPoint.position.set(0, 0, 3);
    scene.add(fillPoint);

    // 4. Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x181822,
      metalness: 0.95,
      roughness: 0.15,
    });

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.8,
      roughness: 0.1,
    });

    const goldGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xd4af37,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });

    // 5. Build Procedural Cybernetic Chess King
    const kingGroup = new THREE.Group();
    kingGroup.position.set(0, -0.4, 0);
    kingGroup.scale.set(1.2, 1.2, 1.2);

    // Base Tier 1
    const base1 = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.4, 0.25, 32), goldMat);
    base1.position.y = -1.8;
    kingGroup.add(base1);

    // Base Tier 2
    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.25, 0.2, 32), chromeMat);
    base2.position.y = -1.6;
    kingGroup.add(base2);

    // Base Collar
    const baseCollar = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.08, 16, 32), goldMat);
    baseCollar.position.y = -1.4;
    baseCollar.rotation.x = Math.PI / 2;
    kingGroup.add(baseCollar);

    // Lower Pedestal
    const ped1 = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.05, 0.7, 32), chromeMat);
    ped1.position.y = -1.0;
    kingGroup.add(ped1);

    const ped2 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 0.15, 32), goldMat);
    ped2.position.y = -0.65;
    kingGroup.add(ped2);

    // Fluted Waist Body
    const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 1.2, 32), chromeMat);
    waist.position.y = 0.2;
    kingGroup.add(waist);

    // Glowing Inner Reactor Core
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), cyanGlowMat);
    core.position.y = 0.2;
    kingGroup.add(core);

    // Tactical Cutout Windows
    [0, 90, 180, 270].forEach((angle) => {
      const rad = (angle * Math.PI) / 180;
      const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.6, 0.04), goldGlowMat);
      windowMesh.position.set(Math.cos(rad) * 0.58, 0.2, Math.sin(rad) * 0.58);
      windowMesh.rotation.y = -rad;
      kingGroup.add(windowMesh);
    });

    // Upper Chest & Neck
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.55, 0.35, 32), goldMat);
    chest.position.y = 0.9;
    kingGroup.add(chest);

    const neck = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.06, 16, 32), chromeMat);
    neck.position.y = 1.1;
    neck.rotation.x = Math.PI / 2;
    kingGroup.add(neck);

    // Head Sphere
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7),
      goldMat
    );
    head.position.y = 1.6;
    kingGroup.add(head);

    const headCap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 0.3, 32), chromeMat);
    headCap.position.y = 2.05;
    kingGroup.add(headCap);

    // Floating Crown & Cross
    const crown = new THREE.Group();
    crown.position.y = 2.45;

    const crownRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 16, 32), goldMat);
    crownRing.rotation.x = Math.PI / 2;
    crown.add(crownRing);

    [0, 90, 180, 270].forEach((angle) => {
      const rad = (angle * Math.PI) / 180;
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 16), goldMat);
      spire.position.set(Math.cos(rad) * 0.42, 0.12, Math.sin(rad) * 0.42);
      crown.add(spire);
    });

    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), goldGlowMat);
    crossV.position.y = 0.35;
    crown.add(crossV);

    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.09, 0.09), goldGlowMat);
    crossH.position.y = 0.42;
    crown.add(crossH);

    kingGroup.add(crown);

    // Orbiting Holographic Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.02, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 })
    );
    ring1.position.y = 0.2;
    kingGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.4, 0.015, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.5 })
    );
    ring2.position.y = 0.2;
    kingGroup.add(ring2);

    scene.add(kingGroup);

    // 6. Tactical Chessboard Grid Floor
    const grid = new THREE.GridHelper(40, 40, 0xd4af37, 0x1e1a10);
    grid.position.y = -2.6;
    scene.add(grid);

    const floorPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x030305, roughness: 0.6, metalness: 0.8 })
    );
    floorPlate.position.y = -2.65;
    floorPlate.rotation.x = -Math.PI / 2;
    scene.add(floorPlate);

    // 7. GPU Particle Nebula
    const particleCount = 2200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldC = new THREE.Color(0xd4af37);
    const cyanC = new THREE.Color(0x00f0ff);
    const whiteC = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) + (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = radius * Math.cos(phi) * Math.cos(theta);

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
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. OrbitControls for Free-Orbit Look Around
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enabled = isOrbitMode;

    // 9. Store Scene State
    const mouse = { x: 0, y: 0 };
    sceneRef.current = {
      kingGroup,
      ring1,
      ring2,
      core,
      crown,
      particles,
      grid,
      controls,
      camera,
      renderer,
      scrollProgress,
      isOrbitMode,
      mouse,
    };

    // 10. Pointer & Window Listeners
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    // 11. 60-120 FPS High-Performance Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const state = sceneRef.current;
      if (!state) return;

      const t = clock.getElapsedTime();

      if (state.isOrbitMode && state.controls) {
        state.controls.update();
      } else {
        // Scroll & Pointer Interpolation
        const targetRotY = state.mouse.x * 0.6 + t * 0.15 + state.scrollProgress * Math.PI * 2;
        const targetRotX = -state.mouse.y * 0.35 + Math.sin(t * 0.8) * 0.05;
        const targetRotZ = state.mouse.x * 0.15;

        kingGroup.rotation.y = THREE.MathUtils.lerp(kingGroup.rotation.y, targetRotY, 0.06);
        kingGroup.rotation.x = THREE.MathUtils.lerp(kingGroup.rotation.x, targetRotX, 0.06);
        kingGroup.rotation.z = THREE.MathUtils.lerp(kingGroup.rotation.z, targetRotZ, 0.06);

        const targetX = Math.sin(state.scrollProgress * Math.PI) * 1.5;
        const targetY = (1 - state.scrollProgress * 2) * 0.3 - 0.4;
        kingGroup.position.x = THREE.MathUtils.lerp(kingGroup.position.x, targetX, 0.05);
        kingGroup.position.y = THREE.MathUtils.lerp(kingGroup.position.y, targetY, 0.05);
      }

      // Orbiting Rings
      ring1.rotation.x = t * 0.8;
      ring1.rotation.y = t * 0.5;
      ring2.rotation.x = -t * 0.6;
      ring2.rotation.z = t * 0.9;

      // Reactor Core Pulse
      const coreScale = 1 + Math.sin(t * 3) * 0.12;
      core.scale.set(coreScale, coreScale, coreScale);

      // Crown Breathing Float
      crown.position.y = 2.45 + Math.sin(t * 2) * 0.05;

      // Particle Nebula Rotation
      particles.rotation.y = t * 0.04 + state.mouse.x * 0.2;
      particles.rotation.x = -state.mouse.y * 0.15 + Math.sin(t * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      scene.clear();
      sceneRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      role="img"
      aria-label="Interactive 3D Cyber-Imperial Domain. Drag to rotate and explore."
    />
  );
}
