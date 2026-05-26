import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaBehance } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import teamImg from "../../assets/team-action.jpg";
import fLogo from "../../assets/modal_bottom.svg";
import flokaBottom from "../../assets/floka_bottom.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white w-full relative font-inter pt-20 lg:pt-32 pb-16 overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[95%] lg:max-w-[90%] mx-auto flex flex-col items-center">
        <div className="relative w-full flex flex-col items-center mb-32 lg:mb-48 z-20">
          <h1 className="text-[18vw] lg:text-[14vw] leading-[0.85] font-funnel font-medium text-center tracking-tighter bg-gradient-to-b from-zinc-100 via-zinc-400 to-[#0a0a0a] text-transparent bg-clip-text select-none">
            Let’s <br /> talk now
          </h1>

          <div className="absolute top-[60%] lg:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-full text-zinc-300"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
              >
                <path
                  id="footerCirclePath"
                  d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                  fill="transparent"
                />
                <text className="text-[10px] font-bold tracking-[0.25em] uppercase fill-current">
                  <textPath xlinkHref="#footerCirclePath" startOffset="0%">
                    Get in touch • Get in touch • Get in touch •
                  </textPath>
                </text>
              </svg>
            </motion.div>

            <div className="text-zinc-300 z-10">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 z-10">
          <div className="lg:col-span-4 relative z-10">
            <div className="relative w-full pb-28 lg:pb-36">
              <div className="absolute left-0 bottom-0 w-[100%] pointer-events-none select-none z-0 opacity-[100]">
                <img
                  src={flokaBottom}
                  alt="Floka Background"
                  className="w-full h-auto block"
                />
              </div>

              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden z-10 shadow-2xl">
                <img
                  src={teamImg}
                  alt="Floka Team"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img
                    src={fLogo}
                    alt="Floka Icon"
                    className="w-14 lg:w-20 h-auto drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-6 flex flex-col gap-5 lg:gap-6 z-10 relative">
            {["About Us", "Journal", "Faq", "Get In Touch", "Careers"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-2xl lg:text-[28px] font-medium text-zinc-100 hover:text-zinc-400 transition-colors w-fit tracking-tight"
                >
                  {link}
                </a>
              ),
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8 lg:gap-10 z-10 relative">
            <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed max-w-sm">
              At <span className="text-zinc-200 font-medium">Floka</span>, we
              believe furniture should be more than just functional, it should
              tell your story. With a focus on timeless design, sustainable
              materials, and expert craftsmanship, we create pieces that feel
              personal.
            </p>

            <div className="flex flex-col gap-2 text-xs lg:text-sm font-medium text-zinc-200">
              <a
                href="mailto:info@floka-design.com"
                className="hover:text-zinc-500 transition-colors"
              >
                info@floka-design.com
              </a>
              <a
                href="tel:+12345678900"
                className="hover:text-zinc-500 transition-colors"
              >
                +123 (456 789 00)
              </a>
              <p className="text-zinc-400 font-normal">
                12/A, Booston Tower, NYC
              </p>
            </div>

            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, link: "#" },
                { icon: FaXTwitter, link: "#" },
                { icon: FaLinkedinIn, link: "#" },
                { icon: FaBehance, link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-6 border-t border-zinc-800 flex justify-center">
        <p className="text-sm text-zinc-500">
          Built by{" "}
          <a
            href="https://github.com/Nidan73"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 font-medium hover:text-white transition-colors duration-300"
          >
            Nidan Alam
          </a>{" "}
          © 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
