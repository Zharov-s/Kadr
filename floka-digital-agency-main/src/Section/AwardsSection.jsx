import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiquidImage from "../components/Common/LiquidImage";
import right_img from "../assets/download.png";

const AwardsSection = () => {
  const [awards, setAwards] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetch("/data/awards.json")
      .then((res) => res.json())
      .then((data) => setAwards(data))
      .catch((err) => console.error("Error loading awards:", err));
  }, []);

  const handleMouseMove = (e, id) => {
    if (window.innerWidth < 1024) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredId(id);
  };

  const headingVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="bg-[#f9f9f9] w-full py-16 lg:py-32">
      <div className="max-w-[92%] lg:max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start">
        <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6 lg:sticky lg:top-24 mb-8 lg:mb-0">
          <LiquidImage
            src={right_img}
            alt="Awards Portfolio"
            containerClass="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[1.5rem] lg:rounded-[2rem] shadow-xl"
          />
          <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
            Get Rewards
          </span>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          <div className="relative w-24 h-24 lg:w-32 lg:h-32 mb-8 lg:mb-12 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text className="text-[7px] lg:text-[8px] uppercase tracking-widest font-bold fill-black">
                  <textPath xlinkHref="#circlePath">
                    Luxurious • Playful • Sound • Creative • Innovation •
                  </textPath>
                </text>
              </svg>
            </motion.div>
            <div className="z-10 opacity-30">
              <svg
                width="24"
                height="24"
                lg:width="32"
                lg:height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
              >
                <path
                  d="M6 9V2h12v7M6 5H4v4c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V5h-2M12 13v6M8 22h8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            transition={{ staggerChildren: 0.1 }}
            className="mb-12 lg:mb-20"
          >
            <motion.h2
              variants={headingVariants}
              className="font-funnel text-3xl sm:text-5xl lg:text-[72px] leading-[1.1] lg:leading-[1.05] font-medium text-zinc-900 tracking-tight"
            >
              Driven by passion and <br className="hidden sm:block" />
              <span className="text-zinc-400">grounded in expertise,</span>{" "}
              <br className="hidden sm:block" />
              our team turns bold <br className="hidden sm:block" />
              ideas into reality.
            </motion.h2>
          </motion.div>

          <div className="flex flex-col border-t border-zinc-200">
            {awards.map((award, i) => (
              <motion.div
                key={award.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={rowVariants}
                onMouseMove={(e) => handleMouseMove(e, award.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative py-6 lg:py-10 border-b border-zinc-200 flex items-center overflow-hidden lg:cursor-none"
              >
                <AnimatePresence>
                  {hoveredId === award.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: mousePos.x - 60,
                        y: mousePos.y - 60,
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="hidden lg:block pointer-events-none absolute w-32 h-32 bg-zinc-200 rounded-full blur-2xl z-0"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 grid grid-cols-12 w-full items-center gap-2">
                  <h4 className="col-span-12 sm:col-span-6 lg:col-span-5 text-xs sm:text-sm lg:text-[15px] font-bold uppercase tracking-widest text-zinc-900 transition-colors group-hover:text-black">
                    {award.title}
                  </h4>
                  <p className="col-span-8 sm:col-span-4 lg:col-span-5 text-[9px] lg:text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    {award.company}
                  </p>
                  <span className="col-span-4 sm:col-span-2 lg:col-span-2 text-[10px] lg:text-xs font-bold text-zinc-300 text-right">
                    {award.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
