// No "use client" — this is a Server Component.
// The IntersectionObserver is handled by a tiny Client Component below.

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FadeObserver from "@/components/FadeObserver";

export default function Page() {
  return (
    <>
      <Nav />
      <FadeObserver />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
