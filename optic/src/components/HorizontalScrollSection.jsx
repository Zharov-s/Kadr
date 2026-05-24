import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { assetPath } from "@/lib/assets";

const campaigns = [
  "horizontal_scroller/Hustlr-230126.jpg",
  "horizontal_scroller/Meller-1920x520desktop_tiny_-18-12.jpg",
  "horizontal_scroller/cyborgs-230126.jpg",
  "horizontal_scroller/festive-edit-230126.jpg",
  "horizontal_scroller/3x1-celestia_(1).jpg"
];

export default function HorizontalScrollSection() {
  const targetRef = useRef(null);

  // Create a scroll-linked animation over a long vertical scroll area
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate translation precisely.
  // The container holds exactly 5 screens of width (500vw).
  // Translating by -80% of 500vw equals exactly -400vw.
  // This leaves the last 100vw perfectly snug in the viewport, preventing the blank white/black space issue.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505]" id="campaigns">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        {/* Section Header */}
        <div className="px-8 md:px-16 mb-8 md:mb-12 relative z-10 w-full flex items-center justify-between">
           <h2 className="text-3xl md:text-5xl font-extralight tracking-widest text-white uppercase flex items-center gap-6">
              <span className="w-16 h-px bg-[#00d4ff] hidden md:block"></span>
              Featured Campaigns
           </h2>
           <div className="hidden md:flex items-center gap-2 opacity-50">
             <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to explore</span>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="animate-pulse">
               <path d="M5 12h14M12 5l7 7-7 7"/>
             </svg>
           </div>
        </div>

        {/* Mathematically precise 500vw scrolling track */}
        <motion.div style={{ x }} className="flex w-[500vw] h-[55vh] md:h-[70vh] relative z-0">
          {campaigns.map((src, idx) => (
            <div
              key={idx}
              className="relative w-screen h-full px-4 md:px-16 shrink-0 group flex items-center justify-center cursor-crosshair"
            >
              {/* Massive Banner Container */}
              <div className="relative w-full h-full overflow-hidden rounded-md shadow-2xl">
                <motion.div
                  className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${assetPath(src)}")` }}
                />

                {/* Dynamic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

                {/* Decorative Border Frame */}
                <div className="absolute inset-4 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* View Label */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <span className="glass-neon px-8 py-3 rounded-full text-xs uppercase tracking-[0.3em] text-white/90 backdrop-blur-md border border-white/20">
                    Explore Campaign
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Decorative Grid Behind Track */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#00d4ff]/10 -translate-y-1/2 -z-10 pointer-events-none" />
      </div>
    </section>
  );
}
