import React from "react";
import { motion } from "framer-motion";

import logo8 from "../assets/home-1-icon8.svg";
import logo9 from "../assets/home-1-icon9.svg";
import logo10 from "../assets/home-1-icon10.svg";
import logo11 from "../assets/home-1-icon11.svg";
import logo12 from "../assets/home-1-icon12.svg";
import logo13 from "../assets/home-1-icon13.svg";
import logo14 from "../assets/home-1-icon14.svg";
import ReelPreviewSection from "../components/ReelPreviewSection";

const ClientLogosSection = () => {
  const logos = [logo8, logo9, logo10, logo11, logo12, logo13, logo14];

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[95%] lg:max-w-[90%] mx-auto border border-zinc-100 rounded-[2rem] overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-12 border-zinc-100 transition-colors hover:bg-zinc-50/50 group
                ${index < 6 ? "border-b" : ""} 
                ${(index + 1) % 4 !== 0 ? "md:border-r" : ""}
                ${(index + 1) % 2 !== 0 ? "border-r md:border-r" : ""}`}
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src={logo}
                alt={`Client ${index + 1}`}
                className="h-8 w-auto opacity-70 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}

          <div className="flex flex-col items-center justify-center p-12 text-center bg-zinc-50/30">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-inter">
              Next can be you.
            </span>
            <button className="text-sm font-bold text-black uppercase tracking-tighter hover:underline transition-all font-funnel">
              Let's Talk
            </button>
          </div>
        </div>
      </div>
      <div>
        <ReelPreviewSection></ReelPreviewSection>
      </div>
    </section>
  );
};

export default ClientLogosSection;
