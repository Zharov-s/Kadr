

import { useState } from "react";
import { motion } from "framer-motion";
import VirtualFitModal from "./VirtualFitModal";

/* ─── NEON GRID CSS BG ─── */
function NeonGridBG() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="gridBg" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#gridBg)" />
      </svg>
    </div>
  );
}

/* ─── CSS PARTICLES ─── */
function CSSParticles() {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 1, delay: Math.random() * 4, dur: 3 + Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.div key={d.id} className="absolute rounded-full bg-[#00d4ff]"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], y: [0, -28] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeOut" }} />
      ))}
    </div>
  );
}

/* ─── HERO ─── */
export default function HeroSection() {
  const [isVirtualFitOpen, setIsVirtualFitOpen] = useState(false);


  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center overflow-hidden bg-[#080808]">
      <NeonGridBG />
      <CSSParticles />

      {/* Scan line */}
      <motion.div className="absolute left-0 right-0 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.12),transparent)" }}
        animate={{ top: ["0%", "100%"] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} />

      {/* Radial glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[70vh] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 50%,rgba(0,212,255,0.07),transparent 70%)" }} />

      {/* TEXT */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-8 md:px-16 pt-32 pb-12 md:pt-24 pointer-events-auto md:w-1/2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 mb-7">
          <span className="w-10 h-px bg-[#00d4ff]" />
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#00d4ff]/80 font-light">New Collection 2026</span>
        </motion.div>

        <motion.div
          className="text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-extralight mb-7"
          style={{ fontFamily: "Georgia,serif" }}
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }}
        >
          <div className="overflow-hidden inline-block py-1">
            <motion.span className="inline-block text-white" variants={{ hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } } }}>See The</motion.span>
          </div><br />
          <div className="overflow-hidden inline-block py-1">
            <motion.span className="inline-block neon-text italic pb-2" variants={{ hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } } }}>World</motion.span>
          </div><br />
          <div className="overflow-hidden inline-block py-1">
            <motion.span className="inline-block white-gradient-text" variants={{ hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } } }}>Differently</motion.span>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/45 text-sm leading-relaxed mb-10 max-w-xs">
          Do More, Be More. Innovative eyewear crafted with cutting-edge technology and unparalleled precision.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap items-center gap-4">
          <button className="btn-white px-8 py-3.5 rounded-sm">Explore Collection</button>
          <button className="btn-neon px-8 py-3.5 rounded-sm" onClick={() => setIsVirtualFitOpen(true)}>
            Virtual Try-On
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex gap-8 mt-14">
          {[{ value: "2010", label: "Est." }, { value: "200+", label: "Cities" }, { value: "3D", label: "Try On" }].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-extralight neon-text-dim">{s.value}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/25 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* GIANT CINEMATIC SKETCHFAB CANVAS */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2, ease: "easeOut" }}
        className="absolute inset-0 md:left-[35%] w-full md:w-[65%] h-full z-10 pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <div className="absolute w-80 h-80 rounded-full pointer-events-none mix-blend-screen"
          style={{ background: "radial-gradient(circle,rgba(0,212,255,0.1),transparent 70%)", filter: "blur(40px)" }} />

        <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-6 pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(0,212,255,0.18),transparent)", filter: "blur(12px)" }} />

        <motion.div
           className="w-[120%] md:w-[90%] max-w-[1000px] h-[60vh] md:h-[75vh] absolute right-[-10%] md:right-[-5%] flex items-center justify-center mix-blend-screen"
           animate={{
             y: [0, -20, 15, -10, 0],
             scale: [1, 1.2, 0.88, 1.15, 1], // More intense zoom
             rotateZ: [0, -4, 5, -2, 0], // More intense roll
             rotateX: [0, -7, 8, -4, 0], // More intense tilt
             rotateY: [0, -15, 12, -8, 0], // More intense pan
             filter: [
               "drop-shadow(-30px 20px 50px rgba(0,212,255,0.4))", // Light from left front
               "drop-shadow(30px 30px 60px rgba(0,212,255,0.1))",  // Light fades and moves right
               "drop-shadow(0px -10px 70px rgba(0,212,255,0.5))",  // Flash of light from top
               "drop-shadow(-10px 20px 40px rgba(0,212,255,0.2))", // Dim and settle
               "drop-shadow(-30px 20px 50px rgba(0,212,255,0.4))"  // Return to start
             ]
           }}
           transition={{
             duration: 20, // Long cinematic loop
             ease: "easeInOut",
             times: [0, 0.35, 0.65, 0.85, 1], // Variable speeds (fast burst in middle)
             repeat: Infinity,
           }}
        >
          <div className="w-full h-full pointer-events-auto">
            <iframe
              title="Ray-Ban Stories"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/1afc16df397c40d8a0ff4b61c74ea652/embed?autostart=1&transparent=1&ui_theme=dark&ui_watermark=0&ui_infos=0&ui_stop=0&ui_inspector=0&autospin=0.35"
              className="w-full h-full bg-transparent border-none outline-none ring-0 pointer-events-none"
            />
          </div>
        </motion.div>

        <div className="absolute top-12 right-8 w-10 h-10 border-t border-r border-[#00d4ff]/25 pointer-events-none hidden md:block" />
        <div className="absolute bottom-12 left-8 w-10 h-10 border-b border-l border-[#00d4ff]/25 pointer-events-none hidden md:block" />

        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-24 right-10 glass-neon px-4 py-3 rounded-sm z-10 pointer-events-none">
          <div className="text-[9px] tracking-[0.3em] uppercase text-[#00d4ff]/60 mb-0.5">Material</div>
          <div className="text-xs text-white/70 font-light">Aerospace Titanium</div>
        </motion.div>

        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-24 left-8 glass-neon px-4 py-3 rounded-sm z-10 pointer-events-none">
          <div className="text-[9px] tracking-[0.3em] uppercase text-[#00d4ff]/60 mb-0.5">Origin</div>
          <div className="text-xs text-white/70 font-light">New Delhi, India</div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/25">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10" style={{ background: "linear-gradient(to bottom,#00d4ff80,transparent)" }} />
      </motion.div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2">
        <span className="text-[8px] tracking-[0.4em] uppercase text-white/20" style={{ writingMode: "vertical-rl" }}>
          Lenskart • Est. 2010
        </span>
      </div>

      {/* Virtual Try-On Modal Overlay */}
      <VirtualFitModal isOpen={isVirtualFitOpen} onClose={() => setIsVirtualFitOpen(false)} />
    </section>
  );
}
