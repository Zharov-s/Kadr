import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import SpinningBadge from "../components/Common/SpinningBadge";
import modal_bottom from "../assets/modal_bottom.svg";
import woman from "../assets/woman.png";
import ultra from "../assets/ultra.png";
import hyperBest from "../assets/hyperBest.png";
import Marquee from "react-fast-marquee";

const IntroSection = () => {
  const textVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const ProgressPill = ({ label, percentage, isBlack }) => (
    <div className="w-full rounded-2xl overflow-hidden bg-transparent">
      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between px-5 py-3 rounded-2xl whitespace-nowrap ${
          isBlack
            ? "bg-[#0a0a0a] text-white shadow-lg"
            : "bg-white border border-zinc-200 text-zinc-900"
        }`}
      >
        <span className="font-bold text-sm">{label}</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </motion.div>
    </div>
  );

  return (
    <section className="max-w-[95%] lg:max-w-[90%] mx-auto mt-20 lg:mt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 justify-center items-start">
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="w-fit">
            <SpinningBadge
              imageSrc={modal_bottom}
              className="scale-90 lg:scale-100"
            />
          </div>

          <div className="max-w-[240px]">
            <p className="text-zinc-500 text-sm lg:text-base leading-relaxed">
              We design every project with long-term success in mind.
            </p>
          </div>
        </div>

        <motion.div
          className="lg:col-span-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-funnel text-2xl md:text-3xl lg:text-5xl leading-[1.1] tracking-tight text-zinc-900">
            <motion.span variants={textVariants} className="block">
              Our approach is straightforward—
            </motion.span>

            <motion.span variants={textVariants} className="block">
              prioritizing functionality, speed, and
            </motion.span>

            <motion.span variants={textVariants} className="block">
              clarity for solutions.
            </motion.span>
          </h2>
        </motion.div>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 mt-16 lg:mt-24">
        <div className="order-1 lg:order-none lg:col-span-3 bg-zinc-50 rounded-[2rem] p-8 flex flex-col justify-between min-h-[400px]">
          <div>
            <h3 className="text-7xl lg:text-[80px] font-bold tracking-tighter text-black leading-none">
              <CountUp end={25} enableScrollSpy scrollSpyOnce />+
            </h3>
            <p className="text-zinc-400 font-medium mt-2">
              Years of experience
            </p>

            <hr className="my-8 border-zinc-200" />

            <p className="text-zinc-600 font-medium leading-relaxed">
              Explore how we transform ideas into extraordinary digital
              experiences.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex -space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-zinc-300 border-2 border-white object-cover overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=1" alt="user" />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-400 border-2 border-white object-cover overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=2" alt="user" />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-500 border-2 border-white object-cover overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=3" alt="user" />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-600 border-2 border-white object-cover overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=4" alt="user" />
              </div>
            </div>
            <p className="font-bold text-black text-lg">
              <CountUp end={1200} duration={2} enableScrollSpy scrollSpyOnce />+{" "}
              <span className="font-normal text-zinc-500 text-base">
                happy users review
              </span>
            </p>
          </div>
        </div>

        <div className="order-3 lg:order-none lg:col-span-6 bg-[#0a0a0a] rounded-[2rem] p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between min-h-[450px] lg:min-h-[500px]">
          <div className="absolute top-8 right-8 flex flex-col gap-4 text-right z-20">
            <img
              src={ultra}
              alt="Ultra Prestigious Winner"
              className="w-20 lg:w-28 ml-auto"
            />
            <img
              src={hyperBest}
              alt="Hyper Best Award"
              className="w-20 lg:w-28 ml-auto"
            />
          </div>

          <motion.img
            src={woman}
            alt="CEO"
            initial={{ y: -60, x: "-50%", opacity: 0.5 }}
            whileInView={{ y: 0, x: "-50%", opacity: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-0 left-1/2 md:left-1/3 w-full max-w-[400px] lg:max-w-[450px] origin-top z-15"
          />

          <div className="relative z-20 mt-auto pt-40">
            <p className="text-white text-xl lg:text-3xl font-funnel font-medium leading-snug ">
              "At Floka, we merge strategy, creativity, and technology to shape
              brands that people love."
            </p>
            <p className="text-white/50 text-sm mt-4 font-medium tracking-wide">
              <span className="text-white">Merizo H. Yelso</span> /CEO
            </p>
          </div>
        </div>

        <div className="order-2 lg:order-none lg:col-span-3 flex flex-col gap-6">
          <div className="bg-zinc-50 rounded-[2rem] p-8">
            <p className="text-zinc-400 font-medium text-sm">Follow us</p>
            <h4 className="text-2xl font-bold text-black mt-1 mb-8 tracking-tight">
              For check updates
            </h4>

            <div className="flex flex-wrap gap-2">
              {["DRIBBBLE", "BEHANCE", "LINKEDIN", "X", "XING"].map(
                (social) => (
                  <span
                    key={social}
                    className="px-4 py-2 bg-white border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-600 uppercase tracking-widest transition-colors hover:border-black hover:text-black cursor-pointer"
                  >
                    {social}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="bg-zinc-50 rounded-[2rem] p-8 flex-grow flex flex-col">
            <p className="text-zinc-400 font-medium text-sm mb-6">
              Impressions
            </p>

            <div className="flex flex-col gap-3 mt-auto">
              <ProgressPill
                label="Solutions"
                percentage={100}
                isBlack={false}
              />
              <ProgressPill label="UI/UX" percentage={90} isBlack={true} />
              <ProgressPill label="Explore" percentage={72} isBlack={false} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 lg:mt-32 w-full overflow-hidden">
        <div
          className="relative w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <Marquee speed={260} autoFill={true} className="overflow-hidden">
            <h2 className="font-funnel text-[60px] md:text-[100px] lg:text-[120px] font-medium tracking-tight text-black mx-6 lg:mx-10 whitespace-nowrap">
              See how our combines creativity, technology, and strategy
            </h2>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
