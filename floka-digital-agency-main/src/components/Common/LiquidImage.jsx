import React, { useId } from "react";
import { motion, useAnimation } from "framer-motion";

const LiquidImage = ({ src, alt, className, containerClass }) => {
  const controls = useAnimation();
  const filterId = useId();

  const handleHover = async () => {
    await controls.set({ baseFrequency: "0.0001 0.0001" });
    await controls.start({
      baseFrequency: "0.005 0.08",
      transition: { duration: 0.1, ease: "easeOut" },
    });
    await controls.start({
      baseFrequency: "0.0001 0.0001",
      transition: { duration: 0.8, ease: "sharp" },
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${containerClass}`}
      onMouseEnter={handleHover}
    >
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={filterId}>
            <motion.feTurbulence
              type="fractalNoise"
              baseFrequency="0.0001 0.0001"
              numOctaves="2"
              animate={controls}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="40"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={{ filter: `url(#${filterId})` }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};

export default LiquidImage;
