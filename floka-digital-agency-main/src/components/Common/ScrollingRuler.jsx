import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollingRuler = () => {
  const { scrollYProgress } = useScroll();

  const xMovement = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  const ticks = Array.from({ length: 250 });

  return (
    <div className="w-full overflow-hidden bg-[#f7f7f7] py-6 lg:py-10 border-y border-zinc-200 select-none">
      <motion.div
        style={{ x: xMovement }}
        className="flex items-center gap-4 lg:gap-8 w-[200vw] lg:w-[150vw]"
      >
        {ticks.map((_, i) => {
          const isMajor = i % 4 === 0;

          return (
            <div
              key={i}
              className={`w-[1px] flex-shrink-0 ${
                isMajor ? "h-4 lg:h-5 bg-zinc-800" : "h-2 lg:h-3 bg-zinc-300"
              }`}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default ScrollingRuler;
