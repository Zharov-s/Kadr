import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stores = [
  { city: "New Delhi", address: "Connaught Place, Block E", country: "India", hours: "Mon–Sat 10–21", flagship: true },
  { city: "Mumbai", address: "Bandra Kurla Complex", country: "India", hours: "Mon–Sat 10–21", flagship: false },
  { city: "Bengaluru", address: "Indiranagar, 100 Feet Rd", country: "India", hours: "Mon–Sat 10–21", flagship: false },
  { city: "Gurugram", address: "Cyber Hub, DLF Phase 2", country: "India", hours: "Mon–Sat 10–21", flagship: false },
];

export default function StoresSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stores" className="py-32 bg-[#080808] relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#00d4ff]/70 mb-4 block">— Visit Us —</span>
          <h2
            className="text-5xl font-extralight leading-none tracking-tight text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Premium Stores
          </h2>
          <p className="text-white/35 mt-4 text-sm max-w-md mx-auto">
            Experience Lenskart in person. Discover our vast collections, get a precise eye test, and find your perfect frame with 3D try-on.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stores.map((store, i) => (
            <motion.div
              key={store.city}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group relative border border-white/[0.06] hover:border-[#00d4ff]/30 transition-all duration-500 p-6 rounded-sm cursor-pointer"
              style={{ transition: "border-color 0.4s, box-shadow 0.4s" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.06), inset 0 0 30px rgba(0,212,255,0.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              {store.flagship && (
                <div className="absolute top-4 right-4 text-[8px] tracking-[0.3em] uppercase text-[#00d4ff] border border-[#00d4ff]/30 px-2 py-0.5 rounded-sm" style={{ boxShadow: "0 0 8px rgba(0,212,255,0.15)" }}>
                  Flagship
                </div>
              )}
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#00d4ff]/50 block mb-1">{store.country}</span>
              <h3 className="text-xl font-extralight tracking-wide text-white/85 mb-4">{store.city}</h3>
              <p className="text-xs text-white/30 leading-relaxed mb-1">{store.address}</p>
              <p className="text-xs text-white/20 mb-6">{store.hours}</p>
              <div className="divider-neon mb-5 opacity-25" />
              <button className="text-[10px] tracking-[0.3em] uppercase text-[#00d4ff]/40 group-hover:text-[#00d4ff] transition-colors flex items-center gap-2">
                Book Appointment <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
