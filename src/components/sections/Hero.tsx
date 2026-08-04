"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import HangingIDCard from "@/components/ui/HangingIDCard";
import HeroModal from "@/components/ui/HeroModal";

const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for parallax (smoothed with lerp)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Reduce range from 20 to 8 for subtler movement
      const PARALLAX_STRENGTH = 3;
      targetRef.current = {
        x: (e.clientX / innerWidth - 0.5) * 8,
        y: (e.clientY / innerHeight - 0.5) * 8,
      };
    };

    // Lerp factor: 0.06 = smooth
    const LERP = 0.06;
    const EPSILON = 0.001; // stop updating state when movement is imperceptible
    const animate = () => {
      const dx = (targetRef.current.x - currentRef.current.x) * LERP;
      const dy = (targetRef.current.y - currentRef.current.y) * LERP;
      currentRef.current.x += dx;
      currentRef.current.y += dy;
      // Only trigger a re-render if the movement is visible
      if (Math.abs(dx) > EPSILON || Math.abs(dy) > EPSILON) {
        setMousePosition({
          x: targetRef.current.x,
          y: targetRef.current.y,
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // ── City parallax — pure motion values, no React state ──────────
  // Raw mouse position (normalised -0.5 → 0.5)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Spring config — smooth inertia, premium feel
  const springCfg = { stiffness: 60, damping: 20, mass: 1 };
  const smoothX = useSpring(rawMouseX, springCfg);
  const smoothY = useSpring(rawMouseY, springCfg);

  // Per-layer transform ranges
  // Middle layer  ±10px X, ±5px Y
  const midX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const midY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);
  // Foreground    ±18px X, ±10px Y
  const fgX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const fgY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // Scroll parallax per layer
  const midScrollY = useTransform(scrollY, [0, 800], [0, -40]);
  const fgScrollY = useTransform(scrollY, [0, 800], [0, -70]);

  // Feed mouse events into motion values (no setState = no re-render)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX / window.innerWidth - 0.5);
      rawMouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawMouseX, rawMouseY]);

  // Comic text reveal variants
  const textVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -90, transformOrigin: "bottom" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1.5,
      }
    })
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* 3D Background */}
      <motion.div
        className="absolute inset-0 z-0 transition-all duration-1000 ease-out"
        style={{
          filter: isModalOpen ? "blur(10px) brightness(0.3)" : "blur(0px) brightness(1)",
          x: mousePosition.x * -1,
          y: mousePosition.y * -1
        }}
      >
        <Scene />
      </motion.div>

      {/* Halftone / Comic Texture Overlay */}
      <div className="absolute inset-0 halftone-bg mix-blend-overlay z-[1] pointer-events-none opacity-30"></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">

        {/* Layered Typography */}
        <motion.div
          className="relative z-[30] flex flex-col items-start mb-30"
          style={{
            y: y1,
            x: mousePosition.x * 0.5,
          }}
        >
          <motion.div className="overflow-hidden mb-2">
            <motion.span
              className="block text-2xl md:text-3xl font-heading font-black text-white bg-black px-4 py-1 border-2 border-primary-red inline-block -rotate-2"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
              INTO THE
            </motion.span>
          </motion.div>

          <div className="flex flex-col">
            {["PRANAV'S", "VERSE"].map((word, i) => (
              <motion.h1
                key={word}
                custom={i}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-[11vw] sm:text-[12vw] md:text-[8rem] lg:text-[10rem] font-comic tracking-wider leading-[0.8] text-white comic-text-shadow origin-bottom-left"
                style={{
                  rotateZ: i === 1 ? -2 : 2,
                  marginLeft: i === 1 ? "2rem" : "0",
                  zIndex: 10 - i
                }}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="md:ml-32 lg:ml-70 mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl font-sans font-bold text-white max-w-[85vw] sm:max-w-lg bg-black/50 p-4 border border-white/10 backdrop-blur-md rounded-lg"
          >
            Building AI-powered applications with modern web technologies.
          </motion.p>
        </motion.div>

      </div>

      {/* The Hanging Interactive Object - Now anchored to the viewport instead of the centered container */}
      <div className="absolute top-0 right-0 md:right-4 xl:right-8 h-full flex items-start pt-0 z-30 pointer-events-none transform scale-50 sm:scale-75 md:scale-100 origin-top-right">
        <div className="pointer-events-auto">
          <HangingIDCard onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* ── CITY SKYLINE LAYERS ───────────────────────────────── */}

      {/* Layer 1 — Background (static) */}
      <img
        src="/background-buildings.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "auto",
          pointerEvents: "none",
          zIndex: 2,
          opacity: 0.55,
          filter: "brightness(0.6) saturate(0.8)",
        }}
      />

      {/* Layer 2 — Middle (subtle mouse + scroll) */}
      <motion.img
        src="/middle-buildings.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "auto",
          pointerEvents: "none",
          zIndex: 8,
          opacity: 0.75,
          filter: "brightness(0.75) saturate(0.9)",
          x: midX,
          y: midScrollY,
          willChange: "transform",
        }}
      />

      {/* Layer 3 — Foreground (most parallax) */}
      <motion.img
        src="/foreground-buildings.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "auto",
          pointerEvents: "none",
          zIndex: 20,
          opacity: 0.9,
          filter: "brightness(0.85) saturate(1.05)",
          x: fgX,
          y: fgScrollY,
          willChange: "transform",
        }}
      />

      {/* Custom Scroll Indicator */}

      {/* <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/50 font-heading font-bold text-xs uppercase tracking-[0.2em] [writing-mode:vertical-lr]">Scroll</span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1 h-12 bg-gradient-to-b from-primary-red to-transparent rounded-full"
        />
      </motion.div> */}

      {/* Immersive Modal */}
      <HeroModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
