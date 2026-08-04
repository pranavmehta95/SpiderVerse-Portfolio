"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// TINY CORNER WEB — purely decorative, barely visible
// ─────────────────────────────────────────────────────────────
function CornerWeb() {
  return (
    <svg
      className="absolute top-0 right-0 opacity-[0.06] pointer-events-none"
      width="220"
      height="220"
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 15, 30, 45, 60, 75, 90].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const len = 200;
        return (
          <line
            key={i}
            x1="220"
            y1="0"
            x2={220 - Math.cos(rad) * len}
            y2={Math.sin(rad) * len}
            stroke="white"
            strokeWidth="0.5"
          />
        );
      })}
      {[40, 80, 120, 165].map((r, i) => (
        <path
          key={i}
          d={`M ${220 - r} 0 A ${r} ${r} 0 0 1 220 ${r}`}
          stroke="white"
          strokeWidth="0.5"
          fill="none"
        />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// FADE IN WRAPPER
// ─────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// TIMELINE DATA
// ─────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: "2020", label: "Started coding — fell in love with the web" },
  { year: "2022", label: "Built first full-stack product" },
  { year: "2023", label: "Dove deep into design systems & UX" },
  { year: "2024", label: "Focused on performance & developer tooling" },
  { year: "Now",  label: "Crafting experiences that people remember" },
];

// ─────────────────────────────────────────────────────────────
// CONTENT BLOCKS
// ─────────────────────────────────────────────────────────────
const BLOCKS = [
  {
    label: "WHO I AM",
    title: "A developer who thinks in systems and feels in details.",
    body: "I'm Pranav — a frontend-leaning full-stack developer with a deep obsession for the intersection of design and engineering. I don't just build UIs; I build the kind of interfaces that make people pause and think \"that feels right.\" I care about the pixels, the motion, the spacing between words, and the weight of a font.",
  },
  {
    label: "WHAT DRIVES ME",
    title: "Curiosity that doesn't stop at the surface.",
    body: "I'm driven by the question of why — why this architecture, why this interaction, why this color. I find equal joy in debugging a gnarly race condition and in obsessing over a 4px margin. Creativity and problem-solving aren't opposing forces; for me, they're the same thing with different names.",
  },
  {
    label: "CURRENT MISSION",
    title: "Going deeper into the craft.",
    body: "Right now I'm studying how the best teams in the world ship software — the process, the taste, the defaults they set. I'm learning systems design, sharpening my eye for motion design, and building projects that push what I think is possible. The goal: to become the kind of engineer who shapes how products feel, not just how they function.",
  },
];

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Top border */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* Corner web decoration */}
      <CornerWeb />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:sticky lg:top-32 space-y-14">

            {/* Section label */}
            <FadeUp delay={0}>
              <div className="flex items-center gap-3">
                <div className="w-5 h-px" style={{ backgroundColor: "#E11D48" }} />
                <span
                  className="text-[10px] tracking-[0.3em] font-sans uppercase"
                  style={{ color: "#E11D48" }}
                >
                  About
                </span>
              </div>
            </FadeUp>

            {/* Main heading */}
            <FadeUp delay={0.08}>
              <h2
                className="font-heading font-bold leading-[1.1] tracking-tight"
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                  color: "#F5F5F5",
                  letterSpacing: "-0.02em",
                }}
              >
                Builder.
                <br />
                Designer.
                <br />
                <span style={{ color: "#E11D48" }}>Problem solver.</span>
              </h2>
            </FadeUp>

            {/* One-liner */}
            <FadeUp delay={0.14}>
              <p
                className="font-sans leading-relaxed"
                style={{ color: "#888", fontSize: "0.95rem" }}
              >
                I turn complex problems into simple, beautiful software.
              </p>
            </FadeUp>

            {/* Divider */}
            <FadeUp delay={0.18}>
              <div className="w-full h-px bg-white/[0.07]" />
            </FadeUp>

            {/* Timeline */}
            <FadeUp delay={0.22}>
              <div className="space-y-0">
                <p
                  className="text-[10px] tracking-[0.25em] uppercase mb-5 font-sans"
                  style={{ color: "#555" }}
                >
                  Journey
                </p>
                <div className="relative">
                  <div
                    className="absolute left-[38px] top-2 bottom-2 w-px"
                    style={{ backgroundColor: "#1e1e1e" }}
                  />
                  <div className="space-y-6">
                    {TIMELINE.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-5"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.5,
                          delay: 0.28 + i * 0.07,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span
                          className="font-sans text-[11px] w-9 shrink-0 pt-0.5 text-right"
                          style={{
                            color: item.year === "Now" ? "#E11D48" : "#444",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {item.year}
                        </span>
                        <div className="relative z-10 mt-1.5 shrink-0">
                          <div
                            className="w-[5px] h-[5px] rounded-full"
                            style={{
                              backgroundColor:
                                item.year === "Now" ? "#E11D48" : "#333",
                            }}
                          />
                        </div>
                        <span
                          className="font-sans leading-snug"
                          style={{
                            fontSize: "0.82rem",
                            color: item.year === "Now" ? "#ccc" : "#555",
                          }}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Divider */}
            <FadeUp delay={0.44}>
              <div className="w-full h-px bg-white/[0.07]" />
            </FadeUp>

            {/* Meta info */}
            <FadeUp delay={0.48}>
              <div className="space-y-4">
                {[
                  { label: "Current Focus", value: "Product Engineering" },
                  { label: "Location",      value: "India" },
                  { label: "Availability",  value: "Open to opportunities" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span
                      className="font-sans text-[11px] tracking-[0.15em] uppercase"
                      style={{ color: "#444" }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="font-sans text-[13px]"
                      style={{
                        color:
                          row.label === "Availability" ? "#E11D48" : "#888",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-0">
            {BLOCKS.map((block, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.12}>
                <div
                  className="py-12"
                  style={{
                    borderBottom:
                      i < BLOCKS.length - 1 ? "1px solid #161616" : "none",
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-3 h-px"
                      style={{ backgroundColor: "#E11D48" }}
                    />
                    <span
                      className="font-sans text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: "#E11D48" }}
                    >
                      {block.label}
                    </span>
                  </div>

                  <h3
                    className="font-heading font-semibold mb-5 leading-snug"
                    style={{
                      fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                      color: "#EFEFEF",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {block.title}
                  </h3>

                  <p
                    className="font-sans leading-[1.85] max-w-[560px]"
                    style={{
                      fontSize: "0.925rem",
                      color: "#686868",
                    }}
                  >
                    {block.body}
                  </p>
                </div>
              </FadeUp>
            ))}

            {/* Bottom signature */}
            <FadeUp delay={0.48}>
              <div className="pt-12 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                      style={{ backgroundColor: "#E11D48" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: "#E11D48" }}
                    />
                  </span>
                  <span
                    className="font-sans text-[12px]"
                    style={{ color: "#555" }}
                  >
                    Available for work
                  </span>
                </div>
                <span
                  className="font-sans text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: "#2a2a2a" }}
                >
                  Pranav Kumar
                </span>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>

      {/* Bottom border */}
      <div className="w-full h-px bg-white/[0.06]" />
    </section>
  );
}
