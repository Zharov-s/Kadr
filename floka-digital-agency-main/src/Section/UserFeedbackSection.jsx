import React, { useState } from "react";
import { motion } from "framer-motion";

import avatar1 from "../assets/avatar-1.jpg";
import avatar2 from "../assets/avatar-2.jpg";
import avatar3 from "../assets/avatar-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Nicolas K. Ellington",
    role: "IT Specialist",
    quote:
      '" As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog. "',
    company: '" GREAT DESIGN SOLUTIONS "',
  },
  {
    id: 2,
    name: "Julian T. Beaumont",
    role: "IT Specialist",
    quote:
      '" As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog. "',
    company: '" GREAT DESIGN SOLUTIONS "',
  },
  {
    id: 3,
    name: "Felipe D. Hawthorne",
    role: "IT Specialist",
    quote:
      '" As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog. "',
    company: '" GREAT DESIGN SOLUTIONS "',
  },
];

const StarRow = ({ active }) => (
  <div
    className={`flex gap-1 text-sm ${active ? "text-[#ff8a00]" : "text-[#ff8a00]"}`}
  >
    <span>★</span>
    <span>★</span>
    <span>★</span>
    <span>★</span>
    <span>★</span>
  </div>
);

const InfoCard = ({ name, role, active }) => {
  return (
    <motion.div
      animate={{
        backgroundColor: active ? "#050505" : "#ffffff",
        color: active ? "#ffffff" : "#111111",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-[18px] sm:rounded-[20px] px-5 sm:px-6 py-4 sm:py-5 border border-black/0 shadow-none"
    >
      <h4 className="text-[15px] sm:text-[16px] font-medium leading-none">
        {name}
      </h4>
      <p
        className={`text-[11px] sm:text-xs mt-2 ${active ? "text-white/60" : "text-zinc-500"}`}
      >
        {role}
      </p>
    </motion.div>
  );
};

const QuoteCard = ({ quote, company, active }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      animate={{
        backgroundColor: active ? "#050505" : "#ffffff",
        color: active ? "#ffffff" : "#111111",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-[18px] sm:rounded-[20px] px-5 sm:px-6 py-5 sm:py-6 min-h-[220px] sm:min-h-[250px] lg:min-h-[270px] flex flex-col"
    >
      <StarRow active={active} />

      <p
        className={`mt-5 text-[16px] sm:text-[17px] leading-[1.8] max-w-[26ch] ${
          active ? "text-white" : "text-zinc-800"
        }`}
      >
        {quote}
      </p>

      <p
        className={`mt-auto pt-10 text-[10px] sm:text-[11px] uppercase tracking-wide ${
          active ? "text-white/35" : "text-zinc-400"
        }`}
      >
        {company}
      </p>
    </motion.div>
  );
};

const FeedbackColumn = ({ item, active, setHovered, reverse = false }) => {
  return (
    <motion.div
      onMouseEnter={() => setHovered(item.id)}
      onMouseLeave={() => setHovered(null)}
      animate={{ y: active ? -4 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-2"
    >
      {reverse ? (
        <>
          <QuoteCard
            quote={item.quote}
            company={item.company}
            active={active}
          />
          <InfoCard name={item.name} role={item.role} active={active} />
        </>
      ) : (
        <>
          <InfoCard name={item.name} role={item.role} active={active} />
          <QuoteCard
            quote={item.quote}
            company={item.company}
            active={active}
          />
        </>
      )}
    </motion.div>
  );
};

const UserFeedbackSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="w-full bg-[#f4f4f4] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[92%] lg:max-w-[90%] mx-auto">
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wide text-zinc-700 whitespace-nowrap">
            User Feedbacks
          </span>
          <div className="h-px flex-1 bg-zinc-300" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 mb-10 sm:mb-12 lg:mb-16">
          <div className="hidden lg:block lg:col-span-4" />

          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="max-w-[980px] text-[44px] sm:text-[58px] md:text-[72px] lg:text-[78px] xl:text-[84px] leading-[0.98] tracking-[-0.055em] font-funnel font-medium text-black">
              Accelerating growth, and unlocking new potential.
              <span className="inline-flex items-center align-middle mx-2 lg:mx-3 -space-x-2 lg:-space-x-3">
                <img
                  src={avatar1}
                  alt="Avatar 1"
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full object-cover border-2 border-[#f4f4f4]"
                />
                <img
                  src={avatar2}
                  alt="Avatar 2"
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full object-cover border-2 border-[#f4f4f4]"
                />
                <img
                  src={avatar3}
                  alt="Avatar 3"
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full object-cover border-2 border-[#f4f4f4]"
                />
              </span>
              Let’s build your brand together.
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start">
          <FeedbackColumn
            item={testimonials[0]}
            active={hovered === testimonials[0].id}
            setHovered={setHovered}
          />

          <FeedbackColumn
            item={testimonials[1]}
            active={hovered === testimonials[1].id}
            setHovered={setHovered}
            reverse
          />

          <FeedbackColumn
            item={testimonials[2]}
            active={hovered === testimonials[2].id}
            setHovered={setHovered}
          />
        </div>
      </div>
    </section>
  );
};

export default UserFeedbackSection;
