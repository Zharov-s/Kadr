import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { assetPath } from "@/lib/assets";

export default function FooterBanner() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(16px)", "blur(0px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-[#050505]">
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url("${assetPath("images/footer_banner.jpg")}")`,
          scale,
          filter,
          opacity,
        }}
      />

      {/* Dynamic Overlay for blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent opacity-50 pointer-events-none" />

    </section>
  );
}
