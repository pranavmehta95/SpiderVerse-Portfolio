"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useMotionTemplate } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function SpiderWebIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.08] text-white">
      <path d="M200 0V400M0 200H400M58 58L342 342M58 342L342 58" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" strokeDasharray="12 12" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "Email", href: "mailto:pranavmehta192@email.com", icon: <MailIcon />, sub: "pranavmehta192@email.com" },
  { label: "GitHub", href: "https://github.com/pranavmehta95", icon: <GithubIcon />, sub: "pranavmehta95" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pranavkumar37/", icon: <LinkedInIcon />, sub: "pranavkumar37" },
  { label: "Twitter", href: "https://x.com/PranavMeht28577", icon: <TwitterIcon />, sub: "@PranavMehta28577" },
];

// ────────────────────────────────────────────────────────mehta192
// TWINKLING STARS
// ─────────────────────────────────────────────────────────────
function Stars({ inView }: { inView: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stars = useMemo(() =>
    Array.from({ length: 70 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() > 0.82 ? 2 : 1,
      dur: 3 + Math.random() * 5,
      delay: Math.random() * 7,
      opacity: 0.3 + Math.random() * 0.5,
    })), []
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={inView ? { opacity: [s.opacity, s.opacity * 0.1, s.opacity] } : { opacity: s.opacity }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FLOATING DUST PARTICLES
// ─────────────────────────────────────────────────────────────
function DustParticles({ inView }: { inView: boolean }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo(() =>
    Array.from({ length: 24 }, () => ({
      x: Math.random() * 100,
      y: 30 + Math.random() * 70, // lower portion mostly
      dur: 14 + Math.random() * 14,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 60,
    })), []
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: "2px",
            height: "2px",
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
          animate={inView ? { y: [-20, 20], x: [0, p.drift, 0], opacity: [0, 0.4, 0] } : { opacity: 0 }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MOON GLOW — Reduced opacity so heading remains focal point
// ─────────────────────────────────────────────────────────────
function MoonGlow({ inView }: { inView: boolean }) {
  return (
    <>
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "58%",
          top: "26%",
          transform: "translate(-50%, -50%)",
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 35%, transparent 70%)",
          borderRadius: "50%",
        }}
        animate={inView ? { opacity: [0.5, 0.8, 0.5], scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "58%",
          top: "26%",
          transform: "translate(-50%, -50%)",
          width: "520px",
          height: "520px",
          background: "radial-gradient(circle, rgba(225,29,72,0.04) 0%, transparent 58%)",
          borderRadius: "50%",
        }}
        animate={inView ? { opacity: [0.3, 0.6, 0.3], scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// ATMOSPHERIC FOG
// ─────────────────────────────────────────────────────────────
function SkylineFog({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        bottom: "0%",
        height: "40%",
        background: "linear-gradient(to bottom, transparent 0%, rgba(100,120,140,0.03) 40%, rgba(60,80,100,0.06) 80%, transparent 100%)",
      }}
      animate={inView ? { x: ["-2%", "2%", "-2%"], opacity: [0.5, 0.8, 0.5] } : {}}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// SPIDER-WEB OVERLAY
// ─────────────────────────────────────────────────────────────
function WebOverlay({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="absolute bottom-[-5%] right-[-5%] pointer-events-none w-[400px] h-[400px] md:w-[550px] md:h-[550px] z-0"
      style={{
        filter: "blur(0.8px)",
        WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
        maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)"
      }}
      animate={inView ? { rotate: [0, 2, 0], scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    >
      <SpiderWebIcon />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// SPIDER-MAN EASTER EGG — resting on footer edge
// ─────────────────────────────────────────────────────────────
function SpiderManEasterEgg({ inView }: { inView: boolean }) {
  return (
    <div className="absolute bottom-0 right-[4%] sm:right-[8%] md:right-[12%] lg:right-[15%] z-10 origin-bottom flex flex-col items-center">
      {/* Thread */}
      <motion.div
        className="w-[1px] h-32 md:h-48 mb-[-10px] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255,255,255,0.1), transparent)",
        }}
        animate={inView ? { opacity: [0.3, 0.7, 0.3] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spider-Man */}
      <motion.img
        src="/spider.png"
        alt="Spider-Man"
        title="Friendly Neighborhood..."
        className="w-auto h-[65px] sm:h-[80px] md:h-[100px] lg:h-[130px] opacity-[0.92] cursor-pointer origin-bottom"
        style={{ filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.8))" }}
        animate={inView ? {
          y: [0, -2, 0],
          scale: [1, 1.01, 1],
          rotate: [0, 0, 0, 0, 1.5, -1, 0] // Random leg twitch every ~10s
        } : {}}
        transition={{
          y: { duration: 6, ease: "easeInOut", repeat: Infinity },
          scale: { duration: 5, ease: "easeInOut", repeat: Infinity },
          rotate: { duration: 10, ease: "easeInOut", repeat: Infinity, times: [0, 0.8, 0.9, 0.93, 0.96, 0.98, 1] }
        }}
        whileHover={{
          scale: 1.03,
          rotate: 2.5,
          opacity: 1,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FADE UP — shared entrance wrapper
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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAGNETIC BUTTON HOVER EFFECT
// ─────────────────────────────────────────────────────────────
function MagneticButton({
  children,
  href,
  className,
  style,
  hoverStyle,
  primary
}: {
  children: React.ReactNode;
  href: string;
  className: string;
  style: any;
  hoverStyle: any;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={className}
      style={style}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{
        ...hoverStyle,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {/* Icon slide is handled within children via CSS classes, but we can do a simple global child selector override if we need, or let React handle it. */}
      {/* Using Framer Motion variants for the icon if needed, but a CSS class is easier. */}
      <span className="flex items-center gap-2.5 group">
        {children}
      </span>
    </motion.a>
  );
}


// ─────────────────────────────────────────────────────────────
// CONTACT CARD (with localized spotlight)
// ─────────────────────────────────────────────────────────────
function ContactCard({ social, index, total }: { social: typeof SOCIALS[0], index: number, total: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const baseClasses = "relative flex items-center gap-6 px-6 md:px-10 py-7 md:py-9 group rounded-xl overflow-hidden border-white/10";
  const mobileBorders = index < total - 1 ? "border-b" : "";
  const desktopBorders = `${index % 2 === 0 ? "md:border-r" : ""} ${index >= total - 2 ? "md:border-b-0" : "md:border-b"}`;

  return (
    <motion.a
      href={social.href}
      target={social.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={social.label}
      onMouseMove={handleMouseMove}
      className={`${baseClasses} ${mobileBorders} ${desktopBorders}`}
      style={{
        color: "#888",
        backgroundColor: "rgba(0,0,0,0)", // Base bg
      }}
      whileHover="hover"
      initial="rest"
      variants={{
        rest: { y: 0, zIndex: 1, borderColor: "rgba(255,255,255,0.0)", boxShadow: "none" },
        hover: {
          y: -6,
          scale: 1.02,
          zIndex: 10,
          backgroundColor: "rgba(20,20,20,0.9)",
          borderColor: "rgba(255,255,255,0.3)",
          boxShadow: "0 12px 40px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(225,29,72,0.2)",
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }
      }}
    >
      {/* Radial Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />

      {/* Subtle left accent on hover */}
      <motion.div
        className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full"
        style={{ background: "#E11D48", opacity: 0 }}
        variants={{ hover: { opacity: 1, transition: { duration: 0.25 } } }}
      />

      {/* Icon */}
      <motion.span
        className="shrink-0 relative z-10 text-[#666]"
        variants={{
          hover: { color: "#E11D48", rotate: 5, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 20 } }
        }}
      >
        {social.icon}
      </motion.span>

      {/* Text */}
      <div className="text-left min-w-0 relative z-10">
        <motion.p
          className="font-sans tracking-[0.18em] uppercase font-medium text-[#B0B0B0]"
          style={{ fontSize: "0.75rem" }}
          variants={{ hover: { color: "#FFFFFF", transition: { duration: 0.25 } } }}
        >
          {social.label}
        </motion.p>
        <motion.p
          className="font-sans truncate mt-1 text-[#555]"
          style={{ fontSize: "0.8rem" }}
          variants={{ hover: { color: "#888", transition: { duration: 0.25 } } }}
        >
          {social.sub}
        </motion.p>
      </div>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────
// UNIFIED CONTACT PANEL
// ─────────────────────────────────────────────────────────────
function ContactPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-xl relative z-20"
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        backgroundColor: "rgba(0,0,0,0.52)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {SOCIALS.map((social, i) => (
          <ContactCard
            key={social.label}
            social={social}
            index={i}
            total={SOCIALS.length}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT SECTION + FOOTER
// ─────────────────────────────────────────────────────────────
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "0px" }); // Monitor if section is in view to pause animations

  return (
    <>
      <section
        ref={ref}
        id="contact"
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#050505" }}
      >
        {/* ── BACKGROUND IMAGE ── */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 28%",
            backgroundRepeat: "no-repeat",
            filter: "grayscale(0.2) brightness(0.72)",
          }}
        />

        {/* ── CINEMATIC GRADIENT OVERLAY ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 55% 50% at 60% 26%, rgba(3,3,3,0.15) 0%, rgba(3,3,3,0.65) 60%, rgba(3,3,3,0.95) 100%)",
            ].join(", "),
          }}
        />

        {/* ── VIGNETTE ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.92) 100%)",
          }}
        />

        {/* ── BOTTOM FADE — skyline dissolves into footer ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
          style={{
            height: "60%",
            background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.7) 50%, #050505 100%)",
          }}
        />

        {/* ── TOP FADE ── */}
        <div
          className="absolute top-0 left-0 right-0 z-[3] pointer-events-none"
          style={{
            height: "16%",
            background: "linear-gradient(to top, transparent 0%, #050505 100%)",
          }}
        />

        {/* ── BACKGROUND ANIMATIONS (paused when out of view) ── */}
        <div className="absolute inset-0 z-[4] pointer-events-none">
          <Stars inView={inView} />
          <DustParticles inView={inView} />
          <MoonGlow inView={inView} />
        </div>
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <SkylineFog inView={inView} />
          <WebOverlay inView={inView} />
        </div>

        {/* ── CONTENT ── */}
        <div className="relative z-20 w-full max-w-[660px] mx-auto px-6 md:px-8 py-28 md:py-40 flex flex-col items-center text-center">

          {/* Label */}
          {/* <FadeUp delay={0}>
            <div className="flex items-center gap-3 mb-9">
              <div className="w-5 h-px" style={{ backgroundColor: "#E11D48" }} />
              <span
                className="font-sans text-[10px] tracking-[0.35em] uppercase"
                style={{ color: "#E11D48" }}
              >
                Contact
              </span>
              <div className="w-5 h-px" style={{ backgroundColor: "#E11D48" }} />
            </div>
          </FadeUp> */}

          {/* Headline */}
          <FadeUp delay={0.08}>
            <h2
              className="font-heading font-bold leading-[1.08] mb-9"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 4.2rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.035em",
              }}
            >
              The Next Mission
              <br />
              Starts Here.
            </h2>
          </FadeUp>

          {/* Paragraph */}
          <FadeUp delay={0.16}>
            <p
              className="font-sans leading-[2] mb-14 max-w-[380px]"
              style={{ fontSize: "0.93rem", color: "#f0e3e3ff" }}
            >
              I&apos;m always open to discussing new opportunities, creative ideas
              and exciting projects. Whether you have a question or just want
              to say hello, my inbox is always open.
            </p>
          </FadeUp>

          {/* CTA Buttons */}
          <FadeUp delay={0.24} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {/* Primary */}
            <MagneticButton
              href="mailto:pranavmehta192@email.com"
              primary
              className="inline-flex items-center font-sans font-semibold text-[13px] tracking-[0.06em] px-8 py-4 rounded-lg [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#0a0a0a",
                border: "1px solid #FFFFFF",
              }}
              hoverStyle={{
                backgroundColor: "#E11D48",
                borderColor: "#E11D48",
                color: "#FFFFFF",
                boxShadow: "0 8px 30px rgba(225,29,72,0.35), 0 0 0 1px rgba(225,29,72,0.25)",
              }}
            >
              Get In Touch
              <ArrowRightIcon />
            </MagneticButton>

            {/* Secondary */}
            <MagneticButton
              href="/resume.pdf"
              className="inline-flex items-center font-sans font-medium text-[13px] tracking-[0.06em] px-8 py-4 rounded-lg [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-y-[-2px]"
              style={{
                backgroundColor: "transparent",
                color: "#CFCFCF",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
              hoverStyle={{
                borderColor: "rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#FFFFFF",
                boxShadow: "0 8px 24px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.2)",
              }}
            >
              <DownloadIcon />
              Download Resume
            </MagneticButton>
          </FadeUp>

          {/* Divider */}
          <FadeUp delay={0.32} className="w-full mb-8">
            <div
              className="w-full h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.09), transparent)" }}
            />
          </FadeUp>

          {/* Unified Contact Panel */}
          <div className="w-full">
            <ContactPanel />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#050505", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="relative z-20 max-w-[860px] mx-auto px-6 md:px-12 py-16 flex flex-col items-center gap-2.5 text-center">

          {/* Comic-Book Ending Message */}
          <FadeUp delay={0.1}>
            <div className="mb-16 flex flex-col items-center">
              <div className="w-full h-px mb-6" style={{ background: "linear-gradient(to right, transparent, rgba(225,29,72,0.3), transparent)" }} />
              <p className="font-heading tracking-[0.25em] text-[0.7rem] uppercase text-[#E11D48] mb-4">
                End of Issue #001
              </p>
              <p className="font-sans text-[0.85rem] text-[#888] mb-2 leading-relaxed">
                Thanks for swinging by.
              </p>
              <p className="font-sans text-[0.85rem] text-[#777] italic">
                Until the next mission...
              </p>
              <div className="w-full h-px mt-6" style={{ background: "linear-gradient(to right, transparent, rgba(225,29,72,0.3), transparent)" }} />
            </div>
          </FadeUp>

          <p
            className="font-sans tracking-[0.15em] font-medium"
            style={{ fontSize: "0.78rem", color: "#888" }}
          >
            Designed &amp; Developed by Pranav Kumar
          </p>
          <p
            className="font-sans tracking-[0.05em]"
            style={{ fontSize: "0.72rem", color: "#666" }}
          >
            Built with Next.js &bull; TypeScript &bull; Tailwind CSS
          </p>
          <p
            className="font-sans tracking-[0.1em]"
            style={{ fontSize: "0.68rem", color: "#555", marginTop: "6px" }}
          >
            © 2026 All Rights Reserved.
          </p>
        </div>

        {/* Easter Egg */}
        <SpiderManEasterEgg inView={inView} />
      </footer>
    </>
  );
}
