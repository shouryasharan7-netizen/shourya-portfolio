"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/sections/Preloader";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Campaign } from "@/components/sections/Campaign";
import { Arsenal } from "@/components/sections/Arsenal";
import { Victories } from "@/components/sections/Victories";
import { Playbook } from "@/components/sections/Playbook";
import { General } from "@/components/sections/General";
import { Dispatch } from "@/components/sections/Dispatch";
import { NavBar } from "@/components/ui/NavBar";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Preloader key="preloader" onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {isLoaded && (
        <>
          <NavBar />
          <main ref={mainRef}>
            <Hero />
            <Manifesto />
            <Campaign />
            <Arsenal />
            <Victories />
            <Playbook />
            <General />
            <Dispatch />
          </main>
        </>
      )}
    </SmoothScrollProvider>
  );
}
