import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
