import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import logo from "../../assets/Logo.png";
import modal_image from "../../assets/modal_image.jpg";
import "./Navbar.css";
import SpinningBadge from "./SpinningBadge";
import modal_bottom from "../../assets/modal_bottom.svg";
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen, isMobileMenuOpen]);

  const links = ["Home", "Pages", "Portfolio", "Blog"];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <div className="w-full bg-base-100 shadow-sm sticky top-0 z-40">
        <div className="navbar max-w-[95%] lg:max-w-[90%] mx-auto px-0">
          <div className="navbar-start">
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="btn btn-ghost px-2"
              >
                <Menu className="h-6 w-6 text-zinc-900" />
              </button>
            </div>
            <a href="#home" className="flex items-center lg:ml-0 ml-2">
              <img
                data-cursor={""}
                src={logo}
                alt="Floka Logo"
                className="max-h-8 w-auto"
              />
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-medium text-lg">
              {links.map((item) => (
                <li key={item}>
                  <a data-cursor={""} href={`#${item.toLowerCase()}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end gap-4">
            <a
              data-cursor={""}
              href="mailto:info@floka.com"
              className="hidden sm:block text-lg font-light hover:text-primary transition-colors"
            >
              info@floka.com
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:opacity-70 transition-opacity p-2 cursor-pointer hidden lg:block"
            >
              <div data-cursor={""} className="grid grid-cols-3 gap-1.5 w-6">
                <div className="w-1.5 h-1.5 bg-current rounded-full col-start-2"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full col-start-1"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full col-start-2"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-white w-full h-full p-6 flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="Floka Logo" className="h-8 w-auto" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="h-8 w-8 text-black" />
          </button>
        </div>

        <div className="flex items-center bg-zinc-50 rounded-xl px-5 py-4 mb-6">
          <input
            type="text"
            placeholder="KEYWORDS..."
            className="bg-transparent w-full outline-none text-sm text-black placeholder-black font-medium"
          />
          <Search className="h-5 w-5 text-black ml-2" />
        </div>

        <div className="flex flex-col">
          {links.map((item, index) => (
            <div
              key={item}
              className={`flex items-center justify-between py-5 ${
                index !== links.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-bold text-black"
              >
                {item}
              </a>
              <button className="bg-zinc-50 p-2 rounded-lg hover:bg-zinc-100 transition-colors">
                <ChevronDown className="h-5 w-5 text-black" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black text-white p-6 lg:p-12 flex flex-col overflow-y-auto hidden lg:flex"
          >
            <div className="flex justify-end mb-10 shrink-0">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-3 group cursor-pointer text-zinc-400 hover:text-white transition-colors"
              >
                <span className="uppercase text-xs tracking-[0.2em]">
                  Close
                </span>
                <div className="p-2 border border-zinc-800 rounded-full group-hover:bg-zinc-800 transition-all">
                  <div className="grid grid-cols-3 gap-1 w-3">
                    <div className="w-1 h-1 bg-current rounded-full col-start-2"></div>
                    <div className="w-1 h-1 bg-current rounded-full col-start-1"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full col-start-2"></div>
                  </div>
                </div>
              </button>
            </div>
            <div className="flex flex-col max-w-7xl mx-auto w-full grow">
              <div className="mb-12 lg:mb-20">
                <h2 className="text-4xl lg:text-7xl font-funnel leading-tight lg:w-4/5 text-zinc-100">
                  Our approach is straightforward—prioritizing functionality,
                  speed, and clarity for solutions.
                </h2>
              </div>
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2 h-[30vh] lg:h-[50vh] rounded-4xl overflow-hidden bg-zinc-900 border border-zinc-800"
                >
                  <img
                    src={modal_image}
                    alt="Agency Team"
                    className="w-full h-full object-cover opacity-70"
                  />
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full lg:w-1/2 flex flex-col space-y-6 lg:space-y-8"
                >
                  {links.map((item) => (
                    <motion.a
                      variants={itemVariants}
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsModalOpen(false)}
                      className="group flex items-baseline justify-between lg:justify-start lg:gap-16 text-4xl lg:text-6xl font-funnel font-light text-zinc-400 hover:text-white transition-colors duration-300 border-b border-zinc-900 pb-6 lg:border-none lg:pb-0"
                    >
                      {item}
                      <span className="text-zinc-600 text-3xl lg:text-4xl group-hover:text-white transition-colors">
                        +
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>

            <SpinningBadge
              imageSrc={modal_bottom}
              className="flex justify-center lg:justify-end mt-12 pb-8"
            ></SpinningBadge>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
