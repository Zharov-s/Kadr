import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      const scrollPercent = (currentScroll / totalHeight) * 100;
      setProgress(scrollPercent);

      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[99] cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-14 h-14 bg-[#0a0a0a] rounded-full shadow-xl">
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-zinc-800 fill-none"
                strokeWidth="2"
              />

              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-white fill-none transition-all duration-150 ease-out"
                strokeWidth="2"
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
              />
            </svg>

            <FaArrowUp className="text-white text-sm group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
