import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import ParallaxImage from "./ParallaxImage";

const TeamCard = ({ member }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[2rem] p-4 lg:p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col gap-6 group"
    >
      <ParallaxImage
        src={member.image}
        alt={member.name}
        containerClass="aspect-square w-full rounded-[1.5rem] bg-[#e5d5c5]"
        strength={15}
        scale={1.1}
      />

      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-medium font-funnel text-zinc-900 tracking-tight">
          {member.name}
        </h4>
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          {member.role}
        </p>
      </div>

      <div className="flex gap-4">
        <a
          href={member.socials.fb}
          className="text-zinc-900 hover:text-zinc-400 transition-colors"
        >
          <FaFacebookF size={14} />
        </a>
        <a
          href={member.socials.tw}
          className="text-zinc-900 hover:text-zinc-400 transition-colors"
        >
          <FaTwitter size={14} />
        </a>
        <a
          href={member.socials.li}
          className="text-zinc-900 hover:text-zinc-400 transition-colors"
        >
          <FaLinkedinIn size={14} />
        </a>
      </div>
    </motion.div>
  );
};

export default TeamCard;
