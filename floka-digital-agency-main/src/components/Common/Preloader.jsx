import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        // Simulating organic loading speed
        const diff = Math.random() * 15;
        setProgress((prev) => Math.min(prev + diff, 100));
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Animation for the entire black screen exit
  const screenVariants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Premium "Power" easing
        delay: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          variants={screenVariants}
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          {/* THE "WHITE THING" (Progress Bar) */}
          <div className="relative w-full max-w-[300px] md:max-w-[450px] h-[2px] bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </div>

          {/* Optional Percentage Text */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40"
          >
            Loading {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
