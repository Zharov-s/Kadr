import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { assetPath } from "@/lib/assets";

export default function VideoSection() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="relative py-0 overflow-hidden bg-[#080808]">
      <div className="divider-neon mx-auto max-w-5xl" />

      <motion.div ref={ref} className="relative h-[80vh] overflow-hidden">
        {/* Video background */}
        <motion.div style={{ scale }} className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4) contrast(1.1) saturate(0.8)" }}
          >
            <source src={assetPath("brand-video.mp4")} type="video/mp4" />
          </video>
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/60" />

        {/* Neon scan overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #00d4ff, transparent 2px, transparent 6px)", backgroundSize: "100% 8px" }}
        />

        {/* Centered content */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <span className="text-xs tracking-[0.5em] uppercase text-[#00d4ff]/70 mb-6 block">
              — The Optical Experience —
            </span>
            <h2
              className="text-5xl md:text-7xl font-extralight leading-none tracking-tight text-white mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Crafted for
              <br />
              <span className="neon-text italic">Perfectionists</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed mb-10">
              Our designers and engineers are devoted to the pursuit of optical perfection. Each pair of glasses is crafted with precision to deliver unparalleled clarity and comfort.
            </p>
            <button className="btn-neon px-10 py-4 rounded-sm">
              Discover Our Process
            </button>
          </motion.div>
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#00d4ff]/30" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[#00d4ff]/30" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[#00d4ff]/30" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#00d4ff]/30" />

        {/* Live indicator */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full neon-pulse" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#00d4ff]/50">Film</span>
        </div>
      </motion.div>

      <div className="divider-neon mx-auto max-w-5xl" />
    </section>
  );
}
