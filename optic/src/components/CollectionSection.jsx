import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { assetPath } from "@/lib/assets";

const products = [
  {
    id: 1,
    name: "Air Classic",
    tagline: "Овальная титановая оправа",
    price: "91 900 ₽",
    frameColor: "#d0d0d0",
    lensColor: "#050e18",
    colorName: "Серебристый титан",
    limited: true,
    description: "Лёгкая титановая оправа для повседневного ношения.",
    image: "images/glasses1.jpg",
    shape: "oval",
    neonAccent: "#00d4ff",
  },
  {
    id: 2,
    name: "Vincent Chase",
    tagline: "Прямоугольная ацетатная оправа",
    price: "63 400 ₽",
    frameColor: "#1a1a1a",
    lensColor: "#0a0a18",
    colorName: "Матовый чёрный",
    limited: false,
    description: "Классическая форма, подходит для большинства типов лица.",
    image: "images/glasses2.jpg",
    shape: "rect",
    neonAccent: "#00aaff",
  },
  {
    id: 3,
    name: "Crystal Edge",
    tagline: "Безободковая оправа",
    price: "149 500 ₽",
    frameColor: "#c0c0c0",
    lensColor: "#06101a",
    colorName: "Платиновый туман",
    limited: true,
    description: "Максимальная лёгкость. Минимум металла.",
    image: "images/glasses3.jpg",
    shape: "round",
    neonAccent: "#00ffee",
  },
  {
    id: 4,
    name: "Optic Future BLU",
    tagline: "Квадратная ацетатная оправа",
    price: "53 400 ₽",
    frameColor: "#2a2a2a",
    lensColor: "#050b12",
    colorName: "Угольно-серый",
    limited: false,
    description: "Строгий дизайн для рабочего и делового стиля.",
    image: "images/glasses4.jpg",
    shape: "square",
    neonAccent: "#0088cc",
  },
];


function ProductCard({ product, index, isInView }) {
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group product-card cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <div
        className="relative overflow-hidden rounded-sm border transition-all duration-500 bg-[#0d0d0d]"
        style={{
          borderColor: hovered ? `${product.neonAccent}40` : "rgba(255,255,255,0.06)",
          boxShadow: hovered ? `0 0 30px ${product.neonAccent}15, inset 0 0 30px ${product.neonAccent}05` : "none",
        }}
      >
        {product.limited && (
          <div
            className="absolute top-4 right-4 z-10 text-[9px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm font-medium"
            style={{ background: product.neonAccent, color: "#080808" }}
          >
            Лимитед
          </div>
        )}

        {/* Image canvas with 3D Tilt */}
        <motion.div
          className="h-48 w-full px-6 pt-6 pb-2 flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${product.neonAccent}08, transparent 70%)`,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.img
            src={assetPath(product.image)}
            alt={product.name}
            className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
            style={{
              transform: hovered ? "translateZ(30px) scale(1.05)" : "translateZ(0px) scale(1)",
              transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              filter: hovered ? `drop-shadow(0 0 12px ${product.neonAccent}60)` : "none"
            }}
          />
        </motion.div>

        <div className="p-5 pt-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: product.frameColor,
                boxShadow: hovered ? `0 0 6px ${product.neonAccent}80` : "none",
              }}
            />
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">{product.colorName}</span>
          </div>
          <h3 className="text-base font-light tracking-wider text-white/90 mb-0.5">{product.name}</h3>
          <p className="text-xs text-white/35 tracking-wide mb-3">{product.tagline}</p>
          <p className="text-xs text-white/25 leading-relaxed mb-5">{product.description}</p>
          <div className="flex items-center justify-between">
            <span
              className="text-base font-light tracking-wider"
              style={{ color: product.neonAccent }}
            >
              {product.price}
            </span>
            <button
              className="px-4 py-1.5 rounded-sm text-[10px] tracking-[0.2em] uppercase border transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{ borderColor: `${product.neonAccent}60`, color: product.neonAccent }}
            >
              Смотреть
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CollectionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collection" className="py-32 bg-[#080808] relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32"
        style={{ background: "linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#00d4ff]/70 mb-4 block">
            — Коллекция —
          </span>
          <motion.div
            className="text-5xl md:text-6xl font-extralight leading-none tracking-tight text-white flex justify-center gap-[0.25em]"
            style={{ fontFamily: "Georgia, serif" }}
            initial="hidden" animate={isInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          >
            <div className="overflow-hidden inline-block py-2">
              <motion.span className="inline-block" variants={{ hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } } }}>
                Наши
              </motion.span>
            </div>
            <div className="overflow-hidden inline-block py-2">
              <motion.span className="inline-block italic text-[#00d4ff]" variants={{ hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } } }}>
                оправы
              </motion.span>
            </div>
          </motion.div>
          <p className="text-white/35 mt-5 text-sm max-w-md mx-auto leading-relaxed">
            Каждая оправа подобрана с учётом качества материалов и точности изготовления — чтобы вам было комфортно носить.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <button className="btn-neon px-12 py-3.5 rounded-sm">
            Смотреть все оправы
          </button>
        </motion.div>
      </div>
    </section>
  );
}
