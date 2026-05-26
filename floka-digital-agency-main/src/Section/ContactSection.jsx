import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, ChevronDown, Plus } from "lucide-react";

const leftTextMotion = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const fadeUpSmall = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const fieldsContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fieldCreate = {
  initial: { opacity: 0, scale: 0, y: 20 },
  whileInView: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ContactSection = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-black text-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0, transparent 35%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0, transparent 35%),
            repeating-radial-gradient(circle at center, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px)
          `,
          backgroundSize: "cover",
        }}
      />

      <div className="relative max-w-[95%] lg:max-w-[90%] mx-auto py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="pt-2 lg:pt-4">
            <motion.span
              {...fadeUpSmall}
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-zinc-400"
            >
              Get in touch
            </motion.span>

            <motion.h2
              {...leftTextMotion}
              className="mt-6 max-w-[12ch] text-[42px] sm:text-[54px] md:text-[64px] lg:text-[72px] leading-[0.98] tracking-[-0.05em] font-funnel font-medium text-white"
            >
              Tell us about your project whether it’s a website, SEO, or
              marketing.
            </motion.h2>

            <motion.div
              {...fadeUpSmall}
              transition={{ ...fadeUpSmall.transition, delay: 0.2 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12"
            >
              <div>
                <div className="flex items-center gap-2 text-white text-sm font-semibold uppercase">
                  <MessageCircle className="w-4 h-4" />
                  <span>Talk to us</span>
                </div>
                <p className="mt-4 text-zinc-300 text-lg leading-relaxed">
                  Work and general inquiries
                  <br />
                  +123 456 789 00
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-white text-sm font-semibold uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>Post address</span>
                </div>
                <p className="mt-4 text-zinc-300 text-lg leading-relaxed">
                  541 Melville Ave, Palo Alto, CA
                  <br />
                  94301, United States
                </p>
              </div>
            </motion.div>
          </div>

          <div className="w-full max-w-[610px] lg:ml-auto rounded-[2rem] bg-[#f3f3f3] text-black p-6 sm:p-8 lg:p-12 shadow-2xl">
            <motion.h3
              {...fadeUpSmall}
              className="text-[30px] sm:text-[36px] lg:text-[40px] leading-tight tracking-[-0.03em] font-funnel font-medium"
            >
              Have a project in mind?
            </motion.h3>

            <motion.form
              variants={fieldsContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.25 }}
              className="mt-8 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.input
                  variants={fieldCreate}
                  type="text"
                  placeholder="YOUR NAME"
                  className="h-14 rounded-2xl bg-[#ebebeb] px-5 text-sm uppercase tracking-wide placeholder:text-zinc-400 outline-none border border-transparent focus:border-zinc-300"
                />
                <motion.input
                  variants={fieldCreate}
                  type="email"
                  placeholder="BUSINESS EMAIL"
                  className="h-14 rounded-2xl bg-[#ebebeb] px-5 text-sm uppercase tracking-wide placeholder:text-zinc-400 outline-none border border-transparent focus:border-zinc-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.label variants={fieldCreate} className="block">
                  <span className="block text-sm font-medium uppercase mb-3">
                    Budget
                  </span>
                  <div className="relative">
                    <select className="w-full h-14 appearance-none rounded-2xl bg-[#ebebeb] px-5 pr-12 text-base outline-none border border-transparent focus:border-zinc-300">
                      <option>$1000 - $5000</option>
                      <option>$5000 - $10000</option>
                      <option>$10000+</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  </div>
                </motion.label>

                <motion.label variants={fieldCreate} className="block">
                  <span className="block text-sm font-medium uppercase mb-3">
                    Service
                  </span>
                  <div className="relative">
                    <select className="w-full h-14 appearance-none rounded-2xl bg-[#ebebeb] px-5 pr-12 text-base uppercase outline-none border border-transparent focus:border-zinc-300">
                      <option>Consultancy</option>
                      <option>Web Design</option>
                      <option>SEO</option>
                      <option>Marketing</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  </div>
                </motion.label>
              </div>

              <motion.textarea
                variants={fieldCreate}
                rows="5"
                placeholder="MESSAGE"
                className="w-full rounded-2xl bg-[#ebebeb] px-5 py-4 text-sm uppercase tracking-wide placeholder:text-zinc-400 outline-none resize-none border border-transparent focus:border-zinc-300"
              />

              <motion.button
                variants={fieldCreate}
                type="submit"
                className="inline-flex items-center gap-4 pt-2 group"
              >
                <span className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
                  <Plus className="w-5 h-5" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Let’s Talk
                </span>
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
