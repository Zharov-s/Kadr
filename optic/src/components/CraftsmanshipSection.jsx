import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Material Selection",
    description: "We use premium TR90, flexible Ultem, and aerospace-grade titanium, ensuring every frame is lightweight and supremely durable.",
    icon: "◆",
  },
  {
    number: "02",
    title: "Master Cutting",
    description: "Each frame blank is hand-cut by artisans using century-old patterns. Computer-aided precision ensures micron-level accuracy in every dimension.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Temple Forming",
    description: "Temple arms are individually bent, heated, and shaped by hand over brass mandrels — a skill that takes years to perfect.",
    icon: "◉",
  },
  {
    number: "04",
    title: "Surface Finishing",
    description: "Frames undergo 18 stages of polishing: from coarse grit to mirror-polish, with hand-buffing at every stage to achieve perfection.",
    icon: "◎",
  },
];

const stats = [
  { value: "100+", label: "Years of Heritage" },
  { value: "72h", label: "Crafting Time per Frame" },
  { value: "18", label: "Polishing Stages" },
  { value: "0.01mm", label: "Tolerance Precision" },
];

export default function CraftsmanshipSection() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section id="quality" className="py-32 bg-[#0d0d0d] relative overflow-hidden">
      {/* Side accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.15), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.15), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-[#00d4ff]/70 mb-6 flex items-center gap-3">
              <span className="w-10 h-px bg-[#00d4ff]" />
              Our Craft
            </span>
            <h2
              className="text-5xl md:text-6xl font-extralight leading-none tracking-tight mb-8 text-white"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Mastery
              <br />
              <span className="neon-text italic">in Every Detail</span>
            </h2>
            <p className="text-white/35 leading-relaxed mb-8 max-w-md">
              The Florentine craft tradition has been passed from master to apprentice for over a century. In our workshops, time is not a constraint — it is an ingredient.
            </p>
            <button className="btn-neon px-8 py-3.5 rounded-sm">
              Visit Our Stores
            </button>
          </motion.div>

          {/* Right steps */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-sm border border-white/10 group-hover:border-[#00d4ff]/50 transition-all duration-300 flex items-center justify-center text-white/30 group-hover:text-[#00d4ff] group-hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]">
                    <span className="text-xs">{step.icon}</span>
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 mt-3 bg-white/[0.06]" />}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-[0.3em] text-[#00d4ff]/40">{step.number}</span>
                    <h3 className="text-xs tracking-[0.2em] uppercase text-white/70 font-light">{step.title}</h3>
                  </div>
                  <p className="text-xs text-white/30 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="divider-neon mb-16" />
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extralight neon-text mb-2">{stat.value}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/30">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
