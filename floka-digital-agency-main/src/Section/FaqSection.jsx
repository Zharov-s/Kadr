import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiquidImage from "../components/Common/LiquidImage";
import leftPortraitImage from "../assets/modal_image.jpg";
import aiImage from "../assets/team-action.jpg";
import home1 from "../assets/home1-bg-img6-480x308.jpg";
import home2 from "../assets/home1-accordion-img1-480x308.jpg";
import ScrollingRuler from "../components/Common/ScrollingRuler";
const FaqSection = () => {
  const [openId, setOpenId] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "What is artificial intelligence (AI)?",
      answer:
        "Explore how we transform ideas into extraordinary digital experiences. Each case study is a testament to our design thinking, strategic approach, and creative execution.",
      image: home2,
    },
    {
      id: 2,
      question: "How does AI improve business efficiency?",
      answer:
        "AI automates repetitive tasks, analyzes large datasets for actionable insights, and optimizes workflows, allowing your team to focus on high-value strategic initiatives.",
      image: home1,
    },
    {
      id: 3,
      question: "How long does AI implementation take?",
      answer:
        "Depending on the complexity, initial AI integrations can take anywhere from 4 to 12 weeks. We ensure a seamless transition with minimal disruption to your current operations.",
      image: aiImage,
    },
    {
      id: 4,
      question: "What industries can benefit from AI?",
      answer:
        "Almost every industry—from healthcare and finance to retail and manufacturing—can leverage AI to personalize customer experiences and drive operational efficiency.",
      image: aiImage,
    },
    {
      id: 5,
      question: "What are the costs of AI solutions?",
      answer:
        "Costs vary based on scope. We offer scalable solutions tailored to your budget, ensuring a strong ROI through improved efficiency and new revenue streams.",
      image: aiImage,
    },
  ];

  return (
    <section className="bg-[#f7f7f7] w-full py-16 lg:py-24 font-inter">
      <div className="max-w-[95%] lg:max-w-[90%] mx-auto">
        <div className="border-b border-zinc-200 pb-4 mb-16 lg:mb-20">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
            FAQ & GET ANSWER
          </span>
        </div>

        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-funnel font-medium leading-[1.1] text-zinc-900 tracking-tight">
            Have more questions? <br /> We've answers.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-32">
            <p className="text-zinc-500 text-sm lg:text-base leading-relaxed max-w-[250px]">
              Don't found anything yet. Feel free to ask anything.{" "}
              <a
                href="#"
                className="text-zinc-900 font-medium underline underline-offset-4 hover:text-zinc-600 transition-colors"
              >
                Let's Talk
              </a>
            </p>

            <LiquidImage
              src={leftPortraitImage}
              alt="Portrait"
              containerClass="w-full aspect-[3/4] max-w-[300px] rounded-[1.5rem] lg:rounded-[2rem] shadow-lg"
            />
          </div>

          <div className="lg:col-span-8 flex flex-col gap-3 lg:gap-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-[1rem] lg:rounded-[1.5rem] overflow-hidden transition-all duration-300 border border-transparent hover:border-zinc-100 shadow-sm"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 lg:px-8 lg:py-6 flex justify-between items-center text-left cursor-pointer"
                  >
                    <span className="text-sm lg:text-base font-medium text-zinc-900 pr-8">
                      {faq.question}
                    </span>

                    <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-black text-white rounded-full flex items-center justify-center transition-transform duration-300">
                      {isOpen ? (
                        <span className="w-3 h-[2px] bg-white rounded-full"></span>
                      ) : (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 lg:px-8 lg:pb-8 pt-2 flex flex-col sm:flex-row gap-6 items-start">
                          <div className="w-full sm:w-[40%] aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={faq.image}
                              alt="FAQ visual"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex flex-col gap-6">
                            <p className="text-zinc-500 text-sm leading-relaxed">
                              {faq.answer}
                            </p>

                            <button className="flex items-center gap-3 group w-fit cursor-pointer">
                              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="12" y1="5" x2="12" y2="19"></line>
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                                Get in touch
                              </span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ScrollingRuler />
    </section>
  );
};

export default FaqSection;
