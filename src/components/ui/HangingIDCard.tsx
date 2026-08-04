"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface HangingIDCardProps {
  onClick: () => void;
}

// A spider icon SVG inline — original design, not copyrighted
function SpiderIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      {/* Body */}
      <ellipse cx="30" cy="34" rx="8" ry="11" fill="white" opacity="0.9" />
      <ellipse cx="30" cy="22" rx="6" ry="7" fill="white" opacity="0.9" />
      {/* Eyes */}
      <circle cx="27" cy="20" r="2" fill="black" />
      <circle cx="33" cy="20" r="2" fill="black" />
      {/* Left legs */}
      <line x1="22" y1="28" x2="6" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="22" y1="32" x2="4" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="22" y1="36" x2="6" y2="44" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Right legs */}
      <line x1="38" y1="28" x2="54" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="38" y1="32" x2="56" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="38" y1="36" x2="54" y2="44" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export default function HangingIDCard({ onClick }: HangingIDCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer flex flex-col items-center origin-top z-20"
      initial={{ rotate: -3 }}
      animate={{
        rotate: isHovered ? [-8, 8, -6, 6, -3, 3, 0] : [-3, 3, -3],
      }}
      transition={{
        rotate: isHovered
          ? { duration: 1.5, ease: "easeInOut" }
          : { repeat: Infinity, duration: 5, ease: "easeInOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Spider Web SVG — white, corner-style, subtle */}
      <svg
        viewBox="0 0 200 220"
        className="w-44 -mb-1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="softGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          stroke="white"
          strokeWidth="0.8"
          fill="none"
          opacity={isHovered ? 0.7 : 0.35}
          filter="url(#softGlow)"
          style={{ transition: "opacity 0.4s" }}
        >
          {/* Hub = top-right corner (190, 0) */}
          {/* Spokes radiating out */}
          <line x1="190" y1="0" x2="100" y2="220" /> {/* center-down — this is the hang string */}
          <line x1="190" y1="0" x2="140" y2="220" />
          <line x1="190" y1="0" x2="180" y2="220" />
          <line x1="190" y1="0" x2="50" y2="180" />
          <line x1="190" y1="0" x2="10" y2="120" />
          <line x1="190" y1="0" x2="0" y2="60" />
          <line x1="190" y1="0" x2="190" y2="220" />

          {/* Concentric arcs (silk rings) */}
          {/* Ring 1 — close */}
          <path d="M 155 0 C 190 20 190 40 190 40" />
          <path d="M 190 0 Q 180 20 175 40" />
          <path d="M 120 0 C 160 55 190 60 190 60" />
          {/* Ring 2 — medium */}
          <path d="M 80  0 C 140 80 190 80 190 80" />
          <path d="M 40  0 C 120 110 190 110 190 110" />
          {/* Ring 3 — wide */}
          <path d="M 10  10 C 90  150 190 150 190 150" />
          <path d="M 0   40 C 60  185 190 185 190 185" />
        </g>
        {/* Primary hang string — slightly brighter */}
        <line
          x1="190" y1="0"
          x2="100" y2="220"
          stroke="white"
          strokeWidth="1.2"
          opacity={isHovered ? 0.85 : 0.55}
          style={{ transition: "opacity 0.4s" }}
        />
      </svg>

      {/* Lanyard hole */}
      <div className="w-6 h-3 rounded-t-full border border-white/30 bg-zinc-800 -mb-px" />

      {/* The Card */}
      <motion.div
        className="w-44 bg-zinc-950 rounded-xl border border-white/15 shadow-2xl overflow-hidden flex flex-col relative"
        animate={{
          boxShadow: isHovered
            ? "0 0 25px rgba(255,255,255,0.12), 0 0 60px rgba(255,255,255,0.05)"
            : "0 8px 32px rgba(0,0,0,0.7)",
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Top red stripe — thin, like a security badge */}
        <div className="h-1.5 w-full bg-gradient-to-r from-white/5 via-white/30 to-white/5" />

        {/* Header */}
        <div className="px-4 pt-3 pb-2 border-b border-white/8 flex items-center justify-between">
          <span className="text-[10px] font-heading font-black text-white/40 uppercase tracking-[0.2em]">
            ID
          </span>
          {/* Small web icon in corner */}
          <svg viewBox="0 0 20 20" className="w-4 h-4 opacity-30" fill="none" stroke="white" strokeWidth="0.8">
            <line x1="10" y1="0" x2="10" y2="20" />
            <line x1="0" y1="10" x2="20" y2="10" />
            <line x1="3" y1="3" x2="17" y2="17" />
            <line x1="17" y1="3" x2="3" y2="17" />
            <circle cx="10" cy="10" r="4" />
            <circle cx="10" cy="10" r="8" />
          </svg>
        </div>

        {/* Avatar + Spider */}
        <div className="flex flex-col items-center pt-5 pb-3 gap-2">
          <div className="w-16 h-16 rounded-full border border-white/15 flex items-center justify-center relative overflow-hidden">
            <img
              src="/pranav.png"
              alt="Pranav"
              className="w-full h-full object-cover rounded-full"
            />
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
            )}
          </div>
          <div className="text-center">
            <p className="text-neutral-500 font-heading font-bold text-sm tracking-wide">Pranav Kumar</p>
            <p className="text-white/30 text-[10px] font-sans uppercase tracking-[0.2em] mt-0.5">
              Neighborhood · LVL 99
            </p>
          </div>
        </div>

        {/* Click hint */}
        <div className="mx-3 mb-3 py-2 border border-white/10 rounded-lg flex items-center justify-center gap-1.5">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span className="text-white/40 text-[10px] font-sans uppercase tracking-widest">
            tap to open
          </span>
        </div>

        {/* Barcode */}
        <div className="h-8 border-t border-white/8 flex items-center justify-center px-3 bg-black/30">
          <div className="flex gap-[2px] h-4 items-end opacity-25">
            {Array.from({ length: 22 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[1px]"
                style={{ width: i % 3 === 0 ? "3px" : "1.5px", height: `${50 + (i % 5) * 10}%` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
