"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Cpu, Code, PlayCircle, PauseCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeroModal({ isOpen, onClose }: HeroModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isOpen]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/Sunflower.mp3" loop />
      <AnimatePresence>
        {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Backdrop Blur */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-5xl bg-zinc-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-primary-red/20 grid grid-cols-1 md:grid-cols-3 gap-1 h-[80vh] md:h-auto max-h-[800px]"
            initial={{ scale: 0.8, rotateX: 20, y: 50, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-primary-red text-white rounded-full flex items-center justify-center transition-colors border border-white/20"
            >
              <X size={20} />
            </button>

            {/* Left Column - Bio / Status */}
            <div className="col-span-1 bg-black/40 p-8 flex flex-col justify-between border-r border-white/5">
              <div>
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-red to-accent-purple mb-6 p-1"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-full h-full bg-black rounded-full border-2 border-black overflow-hidden relative">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </motion.div>

                <motion.h2
                  className="text-3xl font-heading font-black text-white mb-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  System Status: <span className="text-glow-cyan">Online</span>
                </motion.h2>

                <motion.p
                  className="text-white/60 font-sans leading-relaxed mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Full-Stack Developer focused on AI-driven applications, scalable architectures, and creating impactful digital products.
                </motion.p>
              </div>

              <motion.div
                className="flex gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
                  <Cpu size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
                  <ExternalLink size={20} />
                </a>
              </motion.div>
            </div>

            {/* Middle/Right Column - Dashboard */}
            <div className="col-span-1 md:col-span-2 p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat relative">
              <div className="absolute inset-0 bg-zinc-900/90 mix-blend-multiply"></div>

              <div className="relative z-10 h-full flex flex-col gap-6">

                {/* Tech Stack Banner */}
                <motion.div
                  className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-white/50 uppercase tracking-widest text-xs font-bold mb-4 flex items-center gap-2">
                    <Code size={14} /> Core Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Python", "React", "Next.js", "TypeScript", "Three.js", "Framer Motion", "Tailwind"].map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/90">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Spotify / Current Activity */}
                <motion.div
                  className="bg-gradient-to-r from-[#1DB954]/20 to-black border border-[#1DB954]/30 p-6 rounded-2xl flex items-center gap-6"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div 
                    className="w-16 h-16 bg-black rounded-lg shadow-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <PauseCircle className="text-[#1DB954]" size={32} />
                    ) : (
                      <PlayCircle className="text-[#1DB954]" size={32} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white/50 uppercase tracking-widest text-xs font-bold mb-1">Currently Playing</h3>
                    <p className="text-white font-bold text-lg">Sunflower - Spider-Man: Into the Spider-Verse</p>
                    <p className="text-white/70 text-sm">Post Malone, Swae Lee</p>
                  </div>
                  {/* Equalizer animation */}
                  <div className="ml-auto flex items-end gap-1 h-8 opacity-50">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 bg-[#1DB954] rounded-t"
                        animate={isPlaying ? { height: ["20%", "100%", "40%", "80%", "20%"] } : { height: "20%" }}
                        transition={isPlaying ? { repeat: Infinity, duration: 1.5, delay: i * 0.2 } : { duration: 0.3 }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Current Project */}
                <motion.div
                  className="flex-1 bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group cursor-pointer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-primary-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                  <div className="relative z-20 h-full flex flex-col justify-end">
                    <span className="text-primary-red text-xs font-bold uppercase tracking-widest mb-2 inline-block">Latest Mission</span>
                    <h3 className="text-3xl font-heading font-black text-white mb-2">Multiverse E-Commerce</h3>
                    <p className="text-white/70 text-sm max-w-md">A next-gen 3D shopping experience built with React Three Fiber.</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
