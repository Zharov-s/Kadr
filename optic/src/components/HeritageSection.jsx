import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  { year: "2010", event: "Founded by Peyush Bansal, revolutionizing eyewear in India." },
  { year: "2015", event: "Introduced 3D try-on technology to the eyewear market." },
  { year: "2019", event: "Unveiled an omni-channel optical experience across the nation." },
  { year: "2021", event: "Launched a vision fund to invest in eyewear startups." },
  { year: "2026", event: "Introducing the Smart Collection — the future of vision." },
];

function OctagonAnim() {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      {/* Slow outer rotation */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 240 240" className="w-full h-full">
          <defs>
            <linearGradient id="octG1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <polygon
            points="120,8 192,44 224,120 192,196 120,232 48,196 16,120 48,44"
            stroke="url(#octG1)" strokeWidth="1.5" fill="rgba(0,212,255,0.03)"
          />
          {/* Tick marks at vertices */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const rad = (deg - 90) * Math.PI / 180;
            const x1 = 120 + 112 * Math.cos(rad);
            const y1 = 120 + 112 * Math.sin(rad);
            const x2 = 120 + 104 * Math.cos(rad);
            const y2 = 120 + 104 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.6" />;
          })}
        </svg>
      </motion.div>

      {/* Fast inner rotation */}
      <motion.div
        className="absolute"
        style={{ width: "65%", height: "65%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 160 160" className="w-full h-full">
          <polygon
            points="80,6 130,30 154,80 130,130 80,154 30,130 6,80 30,30"
            stroke="#00d4ff" strokeWidth="1" fill="none" strokeOpacity="0.35"
          />
        </svg>
      </motion.div>

      {/* Pulsing center orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.25), transparent 70%)", boxShadow: "0 0 40px rgba(0,212,255,0.3)" }}
      >
        <div className="w-4 h-4 rounded-full bg-[#00d4ff] opacity-80" style={{ boxShadow: "0 0 16px #00d4ff" }} />
      </motion.div>

      {/* Cross lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 240 240" className="w-full h-full absolute inset-0" style={{ opacity: 0.1 }}>
          <line x1="0" y1="120" x2="240" y2="120" stroke="#00d4ff" strokeWidth="0.5" />
          <line x1="120" y1="0" x2="120" y2="240" stroke="#00d4ff" strokeWidth="0.5" />
          <line x1="44" y1="44" x2="196" y2="196" stroke="#00d4ff" strokeWidth="0.5" />
          <line x1="196" y1="44" x2="44" y2="196" stroke="#00d4ff" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}

export default function HeritageSection() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="our-story" className="py-32 bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Top block ── */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32" ref={ref}>
          {/* Animated shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative h-[50vh] flex items-center justify-center"
          >
            <OctagonAnim />

            {/* Floating badge */}
            <motion.div
              style={{ y }}
              className="absolute bottom-10 left-6 glass-neon px-5 py-4 rounded-sm"
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#00d4ff]/60 mb-1">Est.</div>
              <div className="text-4xl font-extralight neon-text">2010</div>
              <div className="text-[10px] text-white/35 mt-1">New Delhi, India</div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#00d4ff]/70 mb-6 flex items-center gap-3">
              <span className="w-10 h-px bg-[#00d4ff] inline-block" />
              Our Story
            </span>
            <h2
              className="text-5xl md:text-6xl font-extralight leading-none tracking-tight mb-8 text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              A Century of
              <br />
              <span className="neon-text italic">Excellence</span>
            </h2>
            <p className="text-white/35 leading-relaxed mb-6 max-w-md">
              When the studio started its journey, the vision was clear: to bring high-quality, perfectly fitting eyewear to everyone. That promise endures today.
            </p>
            <p className="text-white/25 leading-relaxed mb-10 max-w-md text-sm">
              Today, the studio stands at the forefront of eyewear technology and design. No shortcuts. No compromises.
            </p>
            <button className="btn-white px-8 py-3.5 rounded-sm">
              Our Full Story
            </button>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div ref={timelineRef}>
          <div className="text-center mb-14">
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#00d4ff]/60">
              — A Timeline of Milestones —
            </span>
          </div>
          <div className="relative">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.25), transparent)" }}
            />
            <div className="space-y-12">
              {timelineEvents.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.13, duration: 0.6 }}
                  className={`relative flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-10" : "text-left pl-10"}`}>
                    <div className="text-[11px] tracking-[0.3em] uppercase text-[#00d4ff]/50 mb-1">{item.year}</div>
                    <p className="text-sm text-white/35 leading-relaxed">{item.event}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-[#00d4ff]/50 bg-[#080808] flex items-center justify-center" style={{ boxShadow: "0 0 10px rgba(0,212,255,0.3)" }}>
                    <div className="w-1 h-1 rounded-full bg-[#00d4ff]" />
                  </div>
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
