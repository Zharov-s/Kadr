import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamCard from "../components/Common/TeamCard";
import teamData from "../../public/data/teamData.json";
import teamImg from "../assets/team-action.jpg";

const AvengersSection = () => {
  const [activeTeam, setActiveTeam] = useState("design");

  const filteredMembers = teamData.filter((m) => m.team === activeTeam);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="bg-[#f4f4f4] py-16 lg:py-32 rounded-[2rem] lg:rounded-[3rem]">
      <div className="max-w-[95%] lg:max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-32 self-start"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Our Avengers
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium font-funnel leading-tight text-zinc-900 tracking-tight">
              Meet with our <br className="hidden lg:block" /> team member
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-6 lg:gap-8 items-center border-b border-zinc-200 pb-2"
          >
            {["design", "development"].map((team) => (
              <button
                key={team}
                onClick={() => setActiveTeam(team)}
                className={`relative py-2 text-[10px] lg:text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  activeTeam === team ? "text-zinc-900" : "text-zinc-300"
                }`}
              >
                {team} team
                {activeTeam === team && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-1px] left-0 w-full h-[2.5px] bg-zinc-900"
                  />
                )}
              </button>
            ))}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-zinc-500 text-sm lg:text-base leading-relaxed lg:max-w-[85%]"
          >
            What began over coffee-fueled brainstorming sessions has grown into
            a thriving digital agency dedicated to helping brands stand out.
          </motion.p>

          <motion.button
            variants={itemVariants}
            className="flex items-center gap-4 group w-fit cursor-pointer"
          >
            <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
              +
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black">
              Join with us
            </span>
          </motion.button>

          <motion.div
            variants={itemVariants}
            className="mt-4 lg:mt-8 rounded-[2rem] overflow-hidden aspect-video lg:aspect-auto h-48 lg:h-64 shadow-lg"
          >
            <img
              src={teamImg}
              className="w-full h-full object-cover"
              alt="Our Team Action"
            />
          </motion.div>
        </motion.div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AvengersSection;
