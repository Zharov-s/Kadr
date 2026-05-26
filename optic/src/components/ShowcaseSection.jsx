import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { assetPath } from "@/lib/assets";

const banners = [
  {
    id: 1,
    image: "images/banner_switch.png",
    brand: "",
    title: "",
    subtitle: "Смените образ мгновенно",
  },
  {
    id: 2,
    image: "images/banner_hustlr.png",
    brand: "",
    title: "",
    subtitle: "Для активного образа жизни",
  },
  {
    id: 3,
    image: "images/banner_zodiac.png",
    brand: "",
    title: "ZODIAC",
    subtitle: "Взгляд в будущее",
  },
  {
    id: 4,
    image: "images/banner_coastline.png",
    brand: "",
    title: "COASTLINE",
    subtitle: "Спортивная серия",
  }
];

export default function ShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="showcase" className="bg-[#080808] relative pt-24 pb-16 flex flex-col items-center overflow-hidden">

      {/* Title Area */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16 relative z-20" ref={ref}>
        <motion.div
          className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight tracking-tight text-white mb-6"
          style={{ fontFamily: "Georgia, serif" }}
          initial="hidden" animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        >
          <div className="overflow-hidden inline-block py-1">
            <motion.span className="inline-block" variants={{ hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } } }}>
              Подберём оправу <span className="neon-text italic">под ваш стиль</span>
            </motion.span>
          </div>
          <br />
          <div className="overflow-hidden inline-block py-1">
            <motion.span className="inline-block" variants={{ hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } } }}>
              Большой выбор — от классики до ярких акцентов
            </motion.span>
          </div>
        </motion.div>

        <motion.p
          className="text-white/40 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Широкий выбор оправ — от классических до ярких. Поможем найти то, что подходит именно вам.
        </motion.p>
      </div>

      {/* Banner Gallery with Arch Masking */}
      <div className="relative w-full h-[55vh] md:h-[70vh] flex">

        {/* Top Arc SVG */}
        <svg className="absolute top-0 w-full h-12 md:h-24 z-20 text-[#080808] pointer-events-none drop-shadow-2xl" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,0 L1440,0 L1440,20 Q720,100 0,20 Z" />
        </svg>

        {/* Banners */}
        {banners.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isMuted = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <motion.div
              key={item.id}
              className="relative h-full overflow-hidden cursor-crosshair border-r border-[#ffffff08] last:border-r-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ flex: "1 1 25%" }}
              animate={{
                flex: hoveredIndex === null ? "1 1 25%" : isHovered ? "1 1 40%" : "1 1 20%",
                filter: isMuted ? "brightness(0.5) contrast(1.2)" : "brightness(1) contrast(1)"
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center origin-center"
                style={{ backgroundImage: `url(${assetPath(item.image)})` }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-[#040404]/40 to-transparent opacity-90 transition-opacity duration-500" />

              {/* Text Content */}
              <motion.div
                className="absolute bottom-12 md:bottom-20 left-6 md:left-10 right-6 z-10"
                animate={{ y: isHovered ? -10 : 0, opacity: isMuted ? 0.3 : 1 }}
                transition={{ duration: 0.5 }}
              >
                {item.brand && (
                  <span className="block text-[9px] tracking-[0.3em] uppercase text-[#00d4ff] mb-2 font-medium">
                    {item.brand}
                  </span>
                )}
                {item.title && (
                  <h3 className="text-2xl md:text-4xl font-light tracking-widest text-white uppercase" style={{ fontFamily: "Georgia, serif" }}>
                    {item.title}
                  </h3>
                )}
                <motion.p
                  className="text-xs text-white/50 tracking-wide mt-2 h-0 overflow-hidden"
                  animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0, marginTop: isHovered ? 8 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.subtitle}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Bottom Arc SVG */}
        <svg className="absolute bottom-0 w-full h-12 md:h-24 z-20 text-[#080808] pointer-events-none drop-shadow-[0_-20px_20px_rgba(0,0,0,0.5)]" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,100 L1440,100 L1440,80 Q720,0 0,80 Z" />
        </svg>

      </div>
    </section>
  );
}
