"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// NAV ITEMS — balanced radial positions (% of viewport)
// ─────────────────────────────────────────────────────────────
// Pentagonal layout — 5 nodes
const NAV_ITEMS = [
  { name: "Home",       href: "#home",       x: 50,  y: 16 },  // top
  { name: "Projects",   href: "#projects",   x: 77,  y: 36 },  // top-right
  { name: "Experience", href: "#experience", x: 65,  y: 73 },  // bot-right
  { name: "Contact",    href: "#contact",    x: 35,  y: 73 },  // bot-left
  { name: "About",      href: "#about",      x: 23,  y: 36 },  // top-left
];

// Web center — exact center for web
const WEB_CX = 50;
const WEB_CY = 48;

// Spider logo anchor (viewport %)
const LOGO_X = 4.5;
const LOGO_Y = 8;

// Pentagonal ring connections — adjacent nodes in order
const CROSS_WEBS: [number, number][] = [
  [0, 1], // Home → Projects
  [1, 2], // Projects → Experience
  [2, 3], // Experience → Contact
  [3, 4], // Contact → About
  [4, 0], // About → Home (closes the ring)
];

// ─────────────────────────────────────────────────────────────
// SPIDER LOGO — mouse-tracking, breathing, eye-blink
// ─────────────────────────────────────────────────────────────
function SpiderLogo({
  isOpen, isHovered, eyeOffset,
}: {
  isOpen: boolean; isHovered: boolean; eyeOffset: { x: number; y: number };
}) {
  const [eyeOpen, setEyeOpen] = useState(true);
  useEffect(() => {
    const blink = () => {
      setEyeOpen(false);
      setTimeout(() => setEyeOpen(true), 120);
    };
    const interval = setInterval(blink, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const glowOpacity = isOpen ? 0.8 : isHovered ? 0.6 : 0.3;

  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="sGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E62429" stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor="#E62429" stopOpacity="0" />
        </radialGradient>
        <filter id="sFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="eyeGlowF">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Ambient red halo */}
      <circle cx="40" cy="40" r="38" fill="url(#sGlow)" />
      {/* Abdomen */}
      <ellipse cx="40" cy="50" rx="11" ry="14" fill="white" filter="url(#sFilter)" />
      {/* Hourglass marking */}
      <path d="M35 46 L40 52 L45 46 M35 54 L40 48 L45 54" stroke="#E62429" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      {/* Cephalothorax */}
      <ellipse cx="40" cy="33" rx="9" ry="10" fill="white" />
      {/* Eyes — track mouse */}
      {eyeOpen ? (
        <>
          <circle cx={36.5 + eyeOffset.x} cy={30 + eyeOffset.y} r="2.5" fill="#E62429" filter="url(#eyeGlowF)" />
          <circle cx={43.5 + eyeOffset.x} cy={30 + eyeOffset.y} r="2.5" fill="#E62429" filter="url(#eyeGlowF)" />
          <circle cx={36.5 + eyeOffset.x * 0.5} cy={30 + eyeOffset.y * 0.5} r="1" fill="#111" />
          <circle cx={43.5 + eyeOffset.x * 0.5} cy={30 + eyeOffset.y * 0.5} r="1" fill="#111" />
        </>
      ) : (
        <>
          <line x1="34" y1="30" x2="39" y2="30" stroke="#E62429" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="41" y1="30" x2="46" y2="30" stroke="#E62429" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {/* Legs — left */}
      <path d="M31 32 C22 26 12 24 8 18"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M31 36 C20 34 10 34 4 30"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M31 41 C22 42 12 46 8 52"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M33 46 C26 50 20 58 18 64" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Legs — right */}
      <path d="M49 32 C58 26 68 24 72 18"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M49 36 C60 34 70 34 76 30"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M49 41 C58 42 68 46 72 52"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M47 46 C54 50 60 58 62 64"  stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SHOCKWAVE
// ─────────────────────────────────────────────────────────────
function Shockwave({ trigger }: { trigger: boolean }) {
  return (
    <AnimatePresence>
      {trigger && [0, 0.18, 0.36].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/60 pointer-events-none"
          style={{ left: "50%", top: "50%", x: "-50%", y: "-50%", width: 80, height: 80 }}
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 12, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.2, 0.8, 0.4, 1] }}
        />
      ))}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// HOVER PARTICLES around spider logo
// ─────────────────────────────────────────────────────────────
function SpiderParticles({ active }: { active: boolean }) {
  const pts = useMemo(() =>
    Array.from({ length: 10 }).map((_, i) => ({
      angle: (i / 10) * 360 + Math.random() * 36,
      r: 28 + Math.random() * 14,
    })), []);

  return (
    <AnimatePresence>
      {active && pts.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + Math.random() * 2,
            height: 2 + Math.random() * 2,
            background: i % 3 === 0 ? "#E62429" : "white",
            left: "50%", top: "50%",
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.r,
            y: Math.sin((p.angle * Math.PI) / 180) * p.r,
            opacity: [0, 0.9, 0],
            scale: [0, 1, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity, repeatDelay: 1.5 }}
        />
      ))}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// UNIFIED WEB SVG — spokes + arcs + cross-threads
// ─────────────────────────────────────────────────────────────
function WebCanvas({ isOpen }: { isOpen: boolean }) {
  // Build spoke paths from web center to each nav item
  const spokes = NAV_ITEMS.map((item, i) => {
    const d = `M ${WEB_CX}% ${WEB_CY}% L ${item.x}% ${item.y}%`;
    return { d, delay: 0.08 + i * 0.06 };
  });

  // Spider-to-center thread
  const spiderToCenter = `M ${LOGO_X}% ${LOGO_Y}% Q ${(LOGO_X + WEB_CX) / 2}% ${(LOGO_Y + WEB_CY) / 2 + 5}% ${WEB_CX}% ${WEB_CY}%`;

  // Cross threads between adjacent nav items (arcs with natural sag)
  const crossPaths = CROSS_WEBS.map(([a, b]) => {
    const ax = NAV_ITEMS[a].x, ay = NAV_ITEMS[a].y;
    const bx = NAV_ITEMS[b].x, by = NAV_ITEMS[b].y;
    const mx = (ax + bx) / 2, my = (ay + by) / 2 + 2.5;
    return `M ${ax}% ${ay}% Q ${mx}% ${my}% ${bx}% ${by}%`;
  });

  // Wave keyframes for each path
  function waveVariants(d: string, sagX = 0, sagY = 3) {
    const parts = d.split(" ");
    // We'll animate by slightly shifting the stroke-dashoffset for ripple
    return {
      initial: { pathLength: 0, opacity: 0 },
      animate: { pathLength: 1, opacity: 1 },
      exit: { pathLength: 0, opacity: 0 },
    };
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.svg
          className="fixed inset-0 w-full h-full pointer-events-none z-38"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <defs>
            <filter id="webGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Spider → center */}
          <motion.path
            d={spiderToCenter}
            stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeLinecap="round"
            filter="url(#webGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{ duration: 0.5, delay: 0.02, ease: "easeOut" }}
          />

          {/* Main spokes — center to each item */}
          {spokes.map((s, i) => (
            <motion.path
              key={`spoke-${i}`}
              d={s.d}
              stroke="rgba(255,255,255,0.3)" strokeWidth="0.9" fill="none" strokeLinecap="round"
              filter="url(#webGlow)"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                // After drawing, gently pulse opacity
                opacity: [1, 0.55, 1],
              }}
              exit={{ pathLength: 0 }}
              transition={{
                pathLength: { duration: 0.45, delay: s.delay, ease: "easeOut" },
                opacity: { duration: 2.5, delay: s.delay + 0.5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}

          {/* Bright filament on spokes */}
          {spokes.map((s, i) => (
            <motion.path
              key={`spoke-hl-${i}`}
              d={s.d}
              stroke="rgba(255,255,255,0.6)" strokeWidth="0.3" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 0.4, delay: s.delay + 0.08, ease: "easeOut" }}
            />
          ))}

          {/* Cross-web arcs — slightly delayed */}
          {crossPaths.map((d, i) => (
            <motion.path
              key={`cross-${i}`}
              d={d}
              stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" fill="none" strokeLinecap="round"
              filter="url(#webGlow)"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                opacity: [1, 0.4, 1],
              }}
              exit={{ pathLength: 0 }}
              transition={{
                pathLength: { duration: 0.5, delay: 0.5 + i * 0.04, ease: "easeOut" },
                opacity: { duration: 3, delay: 1 + i * 0.05, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}

          {/* Node dots at each nav item */}
          {NAV_ITEMS.map((item, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={`${item.x}%`} cy={`${item.y}%`} r="2.5"
              fill="rgba(255,255,255,0.55)"
              filter="url(#webGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.25, type: "spring" }}
            />
          ))}
        </motion.svg>
      )}
    </AnimatePresence>
  );
}

// Spider.png at the center of the web — rendered as a DOM element above the SVG
function WebCenterSpider({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed pointer-events-none z-[39]"
          style={{
            left: `${WEB_CX}%`,
            top: `${WEB_CY}%`,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 30 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200, damping: 18 }}
        >
          {/* Pulsing red glow behind spider */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, #E62429 0%, transparent 70%)", transform: "scale(1.8)" }}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1.6, 2, 1.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Spider PNG */}
          <motion.img
            src="/spider.png"
            alt="Spider"
            className="relative w-44 h-44 object-contain drop-shadow-[0_0_32px_rgba(230,36,41,1)]"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// FLOATING AMBIENT PARTICLES (open state)
// ─────────────────────────────────────────────────────────────
function AmbientParticles({ active }: { active: boolean }) {
  const pts = useMemo(() =>
    Array.from({ length: 18 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      dur: 4 + Math.random() * 5,
      delay: Math.random() * 3,
      red: Math.random() > 0.7,
    })), []);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-35">
          {pts.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.red ? "rgba(230,36,41,0.7)" : "rgba(255,255,255,0.5)",
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.8, 0], y: [-10, -40, -70] }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// COMIC BURST on click
// ─────────────────────────────────────────────────────────────
function ComicBurst({ x, y, trigger }: { x: number; y: number; trigger: boolean }) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="fixed pointer-events-none z-[60]"
          style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <svg viewBox="0 0 60 60" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg">
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
              <line
                key={i}
                x1="30" y1="30"
                x2={30 + Math.cos((a * Math.PI) / 180) * 26}
                y2={30 + Math.sin((a * Math.PI) / 180) * 26}
                stroke={i % 3 === 0 ? "#E62429" : "white"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
            <circle cx="30" cy="30" r="8" fill="white" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// NAV SIGN — hanging card with spring physics
// ─────────────────────────────────────────────────────────────
interface NavSignProps {
  item: typeof NAV_ITEMS[0];
  index: number;
  isActive: boolean;
  onNavigate: (href: string, x: number, y: number) => void;
}
function NavSign({ item, index, isActive, onNavigate }: NavSignProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Spring-based rotation for rope physics
  const rotate = useSpring(0, { stiffness: 120, damping: 8, mass: 0.6 });
  useEffect(() => {
    if (hovered) {
      rotate.set(-4);
      setTimeout(() => rotate.set(4), 200);
      setTimeout(() => rotate.set(-2), 400);
      setTimeout(() => rotate.set(2), 600);
      setTimeout(() => rotate.set(0), 800);
    }
  }, [hovered]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rect = cardRef.current?.getBoundingClientRect();
    onNavigate(item.href, rect?.x ?? 0, rect?.y ?? 0);
  };

  const glow = isActive
    ? "0 0 30px rgba(230,36,41,0.7), 0 8px 32px rgba(0,0,0,0.8)"
    : hovered
      ? "0 0 20px rgba(230,36,41,0.4), 0 6px 24px rgba(0,0,0,0.7)"
      : "0 4px 20px rgba(0,0,0,0.6)";

  return (
    <motion.div
      className="fixed z-50"
      style={{ left: `${item.x}%`, top: `${item.y}%`, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, y: -50, scale: 0.7, rotate: -20 }}
      animate={{ opacity: 1, y: 0,   scale: 1,   rotate: 0 }}
      exit={{ opacity: 0, y: -30, scale: 0.8, rotate: 10,
        transition: { duration: 0.3, delay: (NAV_ITEMS.length - index) * 0.04 }
      }}
      transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.25 + index * 0.07 }}
    >
      {/* Hanging rope from web node to card top */}
      <div className="flex flex-col items-center">
        <div
          className="w-[1px] h-6"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.15))" }}
        />
        {/* Small bracket hook */}
        <div className="w-5 h-2 border border-white/25 border-b-0 rounded-t-sm mb-0" />
      </div>

      <motion.a
        ref={cardRef}
        href={item.href}
        onClick={handleClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ rotate, boxShadow: glow, transformOrigin: "top center" }}
        className="relative block cursor-pointer select-none"
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ y: { type: "spring", stiffness: 200, damping: 12 } }}
      >
        {/* Card shell */}
        <div
          className="relative px-6 py-3 overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(20,20,20,0.97) 0%, rgba(10,10,10,0.99) 100%)",
            border: isActive ? "1.5px solid rgba(230,36,41,0.7)" : "1.5px solid rgba(255,255,255,0.14)",
            borderRadius: "4px",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Left depth edge */}
          <div className="absolute left-0 inset-y-0 w-[2px] bg-gradient-to-b from-white/20 via-white/5 to-white/20 rounded-l-[4px]" />
          {/* Bottom depth edge */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-white/20 via-white/5 to-white/20 rounded-b-[4px]" />

          {/* Active indicator animated border */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-[4px] border border-primary-red pointer-events-none"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Active particles */}
          {isActive && (
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-red"
              animate={{ opacity: [0, 1, 0], y: [0, -8, -16] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}

          {/* Nav text */}
          <span
            style={{
              fontFamily: "var(--font-bangers), cursive",
              letterSpacing: "0.14em",
              fontSize: "clamp(13px, 1.5vw, 19px)",
              color: isActive ? "#E62429" : hovered ? "#ff6b6b" : "rgba(255,255,255,0.92)",
              textShadow: (isActive || hovered) ? "0 0 16px rgba(230,36,41,0.7)" : "none",
              transition: "color 0.2s, text-shadow 0.2s",
              display: "block",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {item.name}
          </span>

          {/* Hover glow fill */}
          <motion.div
            className="absolute inset-0 rounded-[4px] pointer-events-none"
            animate={{ opacity: hovered || isActive ? 1 : 0 }}
            style={{ background: "radial-gradient(ellipse, rgba(230,36,41,0.12) 0%, transparent 70%)" }}
          />
        </div>
      </motion.a>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN NAVIGATION
// ─────────────────────────────────────────────────────────────
export default function Navigation() {
  const [isOpen, setIsOpen]         = useState(false);
  const [isHovered, setIsHovered]   = useState(false);
  const [shockwave, setShockwave]   = useState(false);
  const [logoScale, setLogoScale]   = useState(1);
  const [activeSection, setActive]  = useState("home");
  const [burst, setBurst]           = useState({ trigger: false, x: 0, y: 0 });

  // Mouse tracking for spider eye rotation
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = logoRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      setEyeOffset({ x: Math.max(-1.5, Math.min(1.5, dx * 3)), y: Math.max(-1, Math.min(1, dy * 2)) });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = NAV_ITEMS.map(n => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleLogoClick = useCallback(() => {
    if (!isOpen) {
      // Open sequence: compress → vibrate → expand
      setLogoScale(0.75);
      setTimeout(() => setLogoScale(1.05), 140);
      setTimeout(() => setLogoScale(0.95), 240);
      setTimeout(() => setLogoScale(1.08), 320);
      setTimeout(() => setLogoScale(1),    420);
      setShockwave(true);
      setTimeout(() => setShockwave(false), 1400);
      setTimeout(() => setIsOpen(true), 180);
    } else {
      setIsOpen(false);
    }
  }, [isOpen]);

  const handleNavigate = useCallback((href: string, x: number, y: number) => {
    setBurst({ trigger: true, x, y });
    setTimeout(() => setBurst(b => ({ ...b, trigger: false })), 600);
    setTimeout(() => {
      setIsOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }, []);

  // Mouse-reactive body rotation
  const [bodyRot, setBodyRot] = useState(0);
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const onM = (e: MouseEvent) => {
      const dx = e.clientX - (r.left + r.width / 2);
      setBodyRot(Math.max(-8, Math.min(8, dx / 50)));
    };
    window.addEventListener("mousemove", onM);
    return () => window.removeEventListener("mousemove", onM);
  }, []);

  return (
    <>
      {/* ── SPIDER LOGO ──────────────────────────────────────── */}
      <div ref={logoRef} className="fixed top-4 left-4 z-50">
        <div className="relative w-16 h-16">
          <Shockwave trigger={shockwave} />
          <SpiderParticles active={isHovered && !isOpen} />
          <motion.button
            onClick={handleLogoClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
              scale: logoScale,
              y: isHovered ? -4 : [0, -5, 0],
              rotate: bodyRot,
              scaleX: [1, 1.05, 1],
              scaleY: [1, 0.95, 1],
            }}
            transition={{
              scale:  { duration: 0.15 },
              y:      isHovered ? { duration: 0.15 } : { repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 12 },
              rotate: { type: "spring", stiffness: 100, damping: 20 },
              scaleX: { repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 12 },
              scaleY: { repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 12 },
            }}
            className="relative w-16 h-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            style={{ cursor: "none" }}
          >
            {/* Red ambient glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
              animate={{
                opacity: isOpen ? 1 : isHovered ? 0.75 : 0.35,
                scale:   isOpen ? 1.6 : isHovered ? 1.2 : 1,
              }}
              style={{ background: "radial-gradient(circle, #E62429 0%, transparent 65%)" }}
              transition={{ duration: 0.45 }}
            />
            <SpiderLogo isOpen={isOpen} isHovered={isHovered} eyeOffset={eyeOffset} />
          </motion.button>
        </div>
      </div>

      {/* ── OVERLAY ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30"
            style={{ background: "radial-gradient(ellipse at 5% 8%, rgba(230,36,41,0.08) 0%, rgba(0,0,0,0.82) 60%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Film grain overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AMBIENT PARTICLES ─────────────────────────────────── */}
      <AmbientParticles active={isOpen} />

      {/* ── UNIFIED WEB SVG ───────────────────────────────────── */}
      <WebCanvas isOpen={isOpen} />

      {/* ── SPIDER CENTER IMAGE ────────────────────────────────── */}
      <WebCenterSpider isOpen={isOpen} />

      {/* ── NAV SIGNS ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && NAV_ITEMS.map((item, i) => (
          <NavSign
            key={item.name}
            item={item}
            index={i}
            isActive={activeSection === item.href.replace("#", "")}
            onNavigate={handleNavigate}
          />
        ))}
      </AnimatePresence>

      {/* ── COMIC BURST ───────────────────────────────────────── */}
      <ComicBurst x={burst.x} y={burst.y} trigger={burst.trigger} />

      {/* ── CLOSE HINT ────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.p
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 text-white/20 text-[9px] font-sans uppercase tracking-[0.4em] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            click spider to close
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
