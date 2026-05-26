import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

const ParallaxImage = ({
  src,
  alt,
  className = "",
  containerClass = "",
  strength = 20,
  scale = 1.05,
}) => {
  const containerRef = useRef(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const translateX = useTransform(springX, [0, 1], [-strength, strength]);
  const translateY = useTransform(springY, [0, 1], [-strength, strength]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden cursor-crosshair select-none",
        containerClass,
      )}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          x: translateX,
          y: translateY,
          scale: scale,
        }}
        className={cn(
          "w-full h-full object-cover will-change-transform",
          className,
        )}
      />
    </div>
  );
};

export default ParallaxImage;
