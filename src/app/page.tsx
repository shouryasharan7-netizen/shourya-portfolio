"use client";

import { useState, useEffect, useCallback } from "react";
import MagneticCursor from "@/components/ui/MagneticCursor";
import HUDFrame from "@/components/ui/HUDFrame";
import NavBar from "@/components/ui/NavBar";
import NeuralPreloader from "@/components/preloader/NeuralPreloader";
import ActIHero from "@/components/acts/ActI_Hero";
import ActIIDuality from "@/components/acts/ActII_Duality";
import ActIIICommandCenter from "@/components/acts/ActIII_CommandCenter";
import ActIVVault from "@/components/acts/ActIV_Vault";
import ActVArsenal from "@/components/acts/ActV_Arsenal";
import EpilogueTerminal from "@/components/acts/Epilogue_Terminal";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Global UI overlays */}
      <div className="film-grain" aria-hidden="true" />
      <MagneticCursor />
      <HUDFrame />
      <NavBar />

      {/* Preloader */}
      {showPreloader && <NeuralPreloader onComplete={handlePreloaderComplete} />}

      {/* Main cinematic scroll */}
      <main
        id="main-content"
        className="relative bg-[#050508]"
        style={{
          opacity: showPreloader ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* ACT I — Hero */}
        <ActIHero />

        {/* Section divider */}
        <div className="act-divider" />

        {/* ACT II — Duality Engine */}
        <ActIIDuality />

        {/* ACT III — Command Center */}
        <ActIIICommandCenter />

        {/* ACT IV — Innovation Vault */}
        <ActIVVault />

        {/* ACT V — Neural Arsenal */}
        <ActVArsenal />

        {/* EPILOGUE — Transmission Terminal */}
        <EpilogueTerminal />
      </main>
    </>
  );
}
