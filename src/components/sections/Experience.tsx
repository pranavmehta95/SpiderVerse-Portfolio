"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// TYPES — future-proof, extend freely
// ─────────────────────────────────────────────────────────────
type ExperienceType =
  | "Professional Training"
  | "Internship"
  | "Freelance"
  | "Full-time"
  | "Research"
  | "Hackathon";

interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  sub?: string;
  duration: string;
  year: string;
  bullets: string[];
  certificateUrl?: string;
}

// ─────────────────────────────────────────────────────────────
// DATA — add future entries here
// ─────────────────────────────────────────────────────────────
const EXPERIENCES: Experience[] = [
  {
    id: "lpu-java",
    type: "Professional Training",
    title: "Placement Ace: Java Bootcamp (LeetCode & Codeforces Edition)",
    organization: "Centre for Professional Enhancement",
    sub: "Lovely Professional University",
    duration: "10 June 2025 – 11 July 2025",
    year: "2025",
    bullets: [
      "Strengthened Java programming fundamentals.",
      "Solved algorithmic problems using LeetCode and Codeforces.",
      "Improved problem-solving and coding interview skills.",
      "Practiced data structures and competitive programming concepts.",
    ],
    certificateUrl: "#",
  },
];

// ─────────────────────────────────────────────────────────────
// FADE UP
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
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// ARROW ICON — for certificate button
// ─────────────────────────────────────────────────────────────
function ArrowUpRightIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// TYPE BADGE
// ─────────────────────────────────────────────────────────────
function TypeBadge({ type }: { type: ExperienceType }) {
  return (
    <span
      className="inline-flex items-center font-sans text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm"
      style={{
        border: "1px solid rgba(225,29,72,0.2)",
        color: "#E11D48",
        backgroundColor: "rgba(225,29,72,0.05)",
      }}
    >
      {type}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// TIMELINE ENTRY
// ─────────────────────────────────────────────────────────────
function TimelineEntry({
  experience,
  index,
  isLast,
}: {
  experience: Experience;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* ── LEFT: year + dot + vertical line ── */}
      <div className="flex flex-col items-center shrink-0" style={{ width: "52px" }}>
        {/* Year */}
        <span
          className="font-heading font-bold mb-4 select-none tabular-nums"
          style={{
            fontSize: "0.78rem",
            color: "#E11D48",
            letterSpacing: "0.1em",
          }}
        >
          {experience.year}
        </span>

        {/* Dot */}
        <div
          className="relative z-10 w-3 h-3 rounded-full shrink-0"
          style={{
            backgroundColor: "#E11D48",
            boxShadow: "0 0 16px rgba(225,29,72,0.55), 0 0 6px rgba(225,29,72,0.8)",
          }}
        />

        {/* Vertical line */}
        {!isLast && (
          <div
            className="flex-1 mt-3"
            style={{
              width: "2px",
              background: "linear-gradient(to bottom, rgba(225,29,72,0.3) 0%, #1a1a1a 40%, #111 100%)",
              minHeight: "60px",
            }}
          />
        )}
      </div>

      {/* ── RIGHT: card ── */}
      <div className="flex-1 pb-12">
        {/* Type badge + duration row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <TypeBadge type={experience.type} />
          <span
            className="font-sans text-[11px] tracking-[0.06em]"
            style={{ color: "#666" }}
          >
            {experience.duration}
          </span>
        </div>

        {/* ── EXPERIENCE CARD ── */}
        <motion.div
          className="relative rounded-[6px] overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            backgroundColor: "#090909",
          }}
          whileHover={{
            y: -4,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(225,29,72,0.07)",
            transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle left-edge red accent */}
          <div
            className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(225,29,72,0.4), transparent)",
            }}
          />

          <div className="p-7 md:p-9 space-y-6">
            {/* Organization */}
            <div className="space-y-1">
              <p
                className="font-sans text-[11px] tracking-[0.2em] uppercase"
                style={{ color: "#8A8A8A" }}
              >
                {experience.organization}
              </p>
              {experience.sub && (
                <p
                  className="font-sans text-[12px] tracking-[0.04em]"
                  style={{ color: "#555" }}
                >
                  {experience.sub}
                </p>
              )}
            </div>

            {/* Title */}
            <h3
              className="font-heading font-bold leading-[1.25]"
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              {experience.title}
            </h3>

            {/* Divider */}
            <div
              className="w-full h-px"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            />

            {/* Bullets */}
            <ul className="space-y-3">
              {experience.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* Dash accent */}
                  <span
                    className="mt-[10px] shrink-0"
                    style={{
                      width: "12px",
                      height: "1.5px",
                      backgroundColor: "#E11D48",
                      opacity: 0.5,
                      display: "block",
                    }}
                  />
                  <span
                    className="font-sans leading-[1.8]"
                    style={{ fontSize: "0.9rem", color: "#8A8A8A" }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div
              className="w-full h-px"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            />

            {/* Certificate button */}
            {experience.certificateUrl && (
              <div className="pt-1">
                <motion.a
                  href={experience.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-sans text-[12px] tracking-[0.06em] px-5 py-3 rounded-[5px]"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#666",
                    backgroundColor: "transparent",
                    fontWeight: 500,
                  }}
                  whileHover={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#FFFFFF",
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  aria-label="View training certificate"
                >
                  View Certificate
                  <ArrowUpRightIcon />
                </motion.a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Top border */}
      <div className="w-full h-px bg-white/[0.06]" />

      <div className="max-w-[860px] mx-auto px-6 md:px-12 py-24 md:py-36">

        {/* ── SECTION HEADER ── */}
        <div className="mb-14 md:mb-18">
          <FadeUp delay={0}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-px" style={{ backgroundColor: "#E11D48" }} />
              <span
                className="font-sans text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "#E11D48" }}
              >
                Career
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.07}>
            <h2
              className="font-heading font-bold leading-[1.02] mb-4"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 4.5rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.035em",
              }}
            >
              Experience
            </h2>
          </FadeUp>

          <FadeUp delay={0.13}>
            <p
              className="font-sans leading-[1.8] max-w-[400px]"
              style={{ fontSize: "0.93rem", color: "#8A8A8A" }}
            >
              My journey of learning, training and building software.
            </p>
          </FadeUp>
        </div>

        {/* ── TIMELINE ── */}
        {/* Fade-in connector from header to first dot */}
        <FadeUp delay={0.16}>
          <div className="flex gap-6 md:gap-10">
            <div className="shrink-0 flex justify-center" style={{ width: "52px" }}>
              <div
                style={{
                  width: "2px",
                  height: "28px",
                  background: "linear-gradient(to bottom, transparent, rgba(225,29,72,0.25))",
                }}
              />
            </div>
          </div>
        </FadeUp>

        <div>
          {EXPERIENCES.map((exp, i) => (
            <TimelineEntry
              key={exp.id}
              experience={exp}
              index={i}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}
        </div>

        {/* ── FUTURE PLACEHOLDER ── */}
        <FadeUp delay={0.28}>
          <div className="flex gap-6 md:gap-10 items-center mt-2">
            <div className="shrink-0 flex justify-center" style={{ width: "52px" }}>
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  border: "1.5px solid #282828",
                  backgroundColor: "transparent",
                }}
              />
            </div>
            <span
              className="font-sans text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "#282828" }}
            >
              More coming soon
            </span>
          </div>
        </FadeUp>
      </div>

      {/* Bottom border */}
      <div className="w-full h-px bg-white/[0.06]" />
    </section>
  );
}
