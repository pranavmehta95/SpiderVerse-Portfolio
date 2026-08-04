"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

export default memo(function SectionHeader({ title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-16 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-2"
      >
        {/* Massive Heading */}
        <h2 
          className="font-comic text-[6rem] md:text-[8rem] text-white leading-none tracking-tighter"
          style={{
            textShadow: "3px 3px 0 #E11D48, 6px 6px 0 rgba(225,29,72,0.15)",
            WebkitTextStroke: "1px rgba(255,255,255,0.05)",
          }}
        >
          {title}
        </h2>
        
        {/* Subtitle Line */}
        <div className="flex items-center gap-4">
          <span className="text-[#FF4D6D] font-sans font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
            {subtitle}
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-r from-[#FF4D6D] to-transparent" />
        </div>

        {/* Description */}
        <p className="mt-4 text-white/40 font-sans text-sm md:text-base max-w-md leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
});
