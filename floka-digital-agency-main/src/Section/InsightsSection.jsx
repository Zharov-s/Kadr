import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/home-9-blog-img1.jpg";
import img2 from "../assets/home-9-blog-img2.jpg";
import img3 from "../assets/home-9-blog-img3.jpg";
const TextCard = ({ tag, date, title, isDark = false }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`p-8 lg:p-10 rounded-[1.5rem] lg:rounded-[2rem] flex flex-col justify-between shadow-sm cursor-pointer border ${
        isDark
          ? "bg-[#0a0a0a] text-white border-transparent"
          : "bg-white text-zinc-900 border-zinc-200"
      }`}
    >
      <div className="flex gap-4 items-center mb-6 lg:mb-12">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-zinc-300" : "text-zinc-500"}`}
        >
          {tag}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
        >
          {date}
        </span>
      </div>
      <h3 className="text-xl lg:text-2xl font-funnel font-medium leading-snug tracking-tight">
        {title}
      </h3>
    </motion.div>
  );
};

const ImageCard = ({ src, alt }) => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full min-h-[300px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-lg">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    </div>
  );
};

const InsightsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const colVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-[#f4f4f5] w-full py-16 lg:py-28">
      <div className="max-w-[95%] lg:max-w-[90%] mx-auto">
        <div className="text-center mb-12 lg:mb-20">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">
            INSIGHTS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-funnel font-medium text-zinc-900 tracking-tight">
            Company blog & updates
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={colVariants} className="flex flex-col gap-6">
            <TextCard
              isDark={true}
              tag="WEB3"
              date="NOV 07, 2025"
              title="Seamless user interfaces, crafted with intent."
            />
            <div className="flex-grow">
              <ImageCard
                data-cursor={""}
                src={img3}
                alt="Colleagues discussing"
              />
            </div>
          </motion.div>

          <motion.div
            variants={colVariants}
            className="flex flex-col gap-6 lg:mt-0"
          >
            <div className="flex-grow">
              <ImageCard src={img2} alt="Man pointing and smiling" />
            </div>
            <TextCard
              isDark={false}
              tag="WEB3"
              date="NOV 07, 2025"
              title="Creative web platforms, designed for growth."
            />
          </motion.div>

          <motion.div variants={colVariants} className="flex flex-col gap-6">
            <TextCard
              isDark={true}
              tag="WEB3"
              date="NOV 07, 2025"
              title="Immersive virtual journeys, built with precision"
            />
            <div className="flex-grow">
              <ImageCard src={img1} alt="Man working on laptop" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsSection;
