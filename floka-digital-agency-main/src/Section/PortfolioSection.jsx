import React, { useState, useEffect } from "react";
import ParallaxImage from "../components/Common/ParallaxImage";
import { motion } from "framer-motion";

const PortfolioSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading portfolio:", err));
  }, []);

  return (
    <section
      id="portfolio"
      className="max-w-[95%] lg:max-w-[90%] mx-auto mt-32 lg:mt-40 pb-24"
    >
      <div className="flex flex-col items-center justify-center border-t border-zinc-200 pt-8 relative">
        <span className="absolute top-8 left-0 text-sm font-bold uppercase tracking-widest text-zinc-900">
          Portfolio
        </span>
        <h2 className="font-funnel text-3xl md:text-5xl lg:text-4xl text-zinc-900 font-medium leading-[1.1] text-center max-w-2xl mt-12 lg:mt-0">
          Strategy to build powerful digital solutions.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 mt-16 lg:mt-24">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`flex flex-col gap-4 ${
              project.span === "full" ? "md:col-span-2" : "md:col-span-1"
            }`}
          >
            <div
              className="group relative rounded-[2rem] overflow-hidden bg-zinc-100 cursor-none"
              style={{ height: project.span === "full" ? "65vh" : "55vh" }}
              data-cursor=""
            >
              <ParallaxImage
                src={project.image}
                alt={project.title}
                containerClass="w-full h-full"
                strength={25}
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="absolute top-6 left-8 z-10">
                <img
                  src={project.logoImg}
                  alt="Project Logo"
                  className="h-6 md:h-8 w-auto object-contain drop-shadow-md"
                />
              </div>

              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                <h3 className="text-white font-funnel text-2xl md:text-3xl font-medium drop-shadow-md">
                  {project.hoverCategory}
                </h3>
              </div>

              <div className="absolute top-6 right-8 w-14 h-14 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:rotate-45"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>

            <div className="flex justify-between items-center px-4 py-2">
              <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest">
                {project.title}
              </span>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                {project.year}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16 lg:mt-24">
        <button
          className="group flex items-center gap-4 cursor-none"
          data-cursor=""
        >
          <div
            data-cursor=""
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:group-hover:rotate-90"
          >
            <span className="text-lg leading-none mb-0.5">+</span>
          </div>
          <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest transition-transform duration-300 group-hover:translate-x-1">
            More Works
          </span>
        </button>
      </div>
    </section>
  );
};

export default PortfolioSection;
