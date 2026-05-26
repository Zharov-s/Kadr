import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";

const ExpertiseSection = () => {
  const [expertise, setExpertise] = useState([]);
  const [openId, setOpenId] = useState(1);

  useEffect(() => {
    fetch("/data/expertise.json")
      .then((res) => res.json())
      .then((data) => setExpertise(data))
      .catch((err) => console.error("Error loading expertise:", err));
  }, []);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-[98%] mx-auto bg-black py-24 lg:py-32 rounded-xl lg:rounded-xl mt-4">
      <div className="max-w-[95%] lg:max-w-[80%] mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-funnel text-5xl md:text-7xl lg:text-[96px] font-bold tracking-tight leading-none">
            <span className="text-white block">Company</span>
            <span className="text-zinc-600 block">expertise</span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-zinc-800">
          {expertise.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-zinc-800 py-6 lg:py-8"
              >
                <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
                  <div className="col-span-2 lg:col-span-1 flex justify-start">
                    <button
                      onClick={() => toggleOpen(item.id)}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        isOpen
                          ? "border-zinc-500 text-zinc-300"
                          : "border-zinc-800 text-zinc-500 hover:bg-white hover:text-black hover:border-white"
                      }`}
                    >
                      <span className="text-xl font-light leading-none mb-0.5">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </div>

                  <div className="col-span-10 lg:col-span-11">
                    <h3
                      onClick={() => toggleOpen(item.id)}
                      className={`text-2xl lg:text-3xl font-funnel font-medium cursor-pointer transition-colors duration-300 ${
                        isOpen ? "text-white" : "text-zinc-500"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 pb-4">
                            <div className="flex flex-col gap-8 lg:pr-12 pt-2">
                              <p className="text-zinc-400 text-base lg:text-[17px] leading-relaxed">
                                {item.description}
                              </p>

                              <div className="flex flex-wrap gap-3 w-[85%]">
                                {item.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white bg-[#1a1a1a]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="h-48 lg:h-64 w-full rounded-2xl overflow-hidden bg-zinc-900">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 border-b border-zinc-800 pb-12">
          <motion.button
            initial="initial"
            whileHover="hovered"
            className="group flex items-center gap-4 cursor-pointer w-fit"
          >
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
              <span className="text-xl leading-none mb-0.5">+</span>
            </div>

            <div className="flex overflow-hidden text-[11px] font-bold text-white uppercase tracking-widest">
              {"Hire us today".split("").map((char, index) => (
                <span
                  key={index}
                  className="relative inline-block whitespace-pre"
                >
                  <motion.span
                    variants={{
                      initial: { y: 0 },
                      hovered: { y: "100%" },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.02,
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>

                  <motion.span
                    variants={{
                      initial: { y: "-100%" },
                      hovered: { y: 0 },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: index * 0.02,
                    }}
                    className="absolute left-0 top-0 inline-block"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </div>
          </motion.button>
        </div>

        <div className="mt-16 lg:mt-24 w-full overflow-hidden">
          <Marquee speed={50} autoFill={true}>
            {[
              {
                img: "https://i.pravatar.cc/100?img=5",
                text: '"Best design communicator"',
              },
              {
                img: "https://i.pravatar.cc/100?img=8",
                text: '"10/10 well recommended"',
              },
              {
                img: "https://i.pravatar.cc/100?img=11",
                text: '"Super speedy website designer"',
              },
              {
                img: "https://i.pravatar.cc/100?img=12",
                text: '"Great in UI/UX"',
              },
            ].map((testimonial, i) => (
              <div key={i} className="flex items-center gap-3 mx-8 lg:mx-12">
                <img
                  src={testimonial.img}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-zinc-400 text-sm md:text-base font-medium">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
