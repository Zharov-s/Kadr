"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutMission = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for the main heading words.
      // Uses rotateX and y-offset to create a 'flipping' entrance effect.
      gsap.from(".js-heading .js-word", {
        opacity: 0,
        y: 30,
        rotateX: -20,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Subtle fade-up for the supporting descriptor paragraph.
      gsap.from(".js-descriptor", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-[calc(100%-1rem)] mx-auto py-6 md:py-12 xl:py-24 rounded-lg m-2 overflow-hidden"
    >
      <div className="w-full px-4 md:px-7">
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-start gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-5">
          {/* Mobile CTA buttons rendered at the bottom of the stack on small screens */}
          <div className="flex flex-wrap gap-4 w-full md:hidden">
            <ActionButton href="/about" label="Our Story" primary />
            <ActionButton href="/services" label="Our Services" />
          </div>

          {/* Left Panel: Brand Descriptor */}
          <div className="w-full mb-1 md:mt-2 md:mb-0 max-w-sm xl:max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl">
            <div className="js-descriptor inline-flex flex-wrap text-balance relative text-left justify-start text-gray-900 text-lg/tight lg:text-lg/tight xl:text-2xl/none 4xl:text-3xl/none font-medium tracking-tight">
              A global team of search-first content marketers engineering
              semantic relevancy & category signals for both the internet and
              people.
            </div>
          </div>

          {/* Right Panel: Primary Heading & Visual Asset */}
          <div className="w-full grid max-w-[24rem] md:max-w-160 xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-[52rem] 4xl:max-w-5xl gap-y-4 md:gap-y-10">
            <h2 className="js-heading inline-flex flex-wrap text-balance relative flex-col text-left justify-start text-gray-900 text-5xl/none lg:text-7xl/none xl:text-[7.5rem]/0.9 3xl:text-[8.5rem]/0.9 4xl:text-[10rem]/0.9 font-bold tracking-tighter leading-none">
              <div className="flex flex-wrap relative text-left justify-start gap-x-3 md:gap-x-4">
                <span className="js-word">Driving</span>
                <span className="js-word">Demand</span>
                <span className="js-word">&</span>
                <span className="js-word">Discovery</span>

                {/* Inline image asset styled with a rounded container to match brand aesthetic */}
                <div className="js-image-wrapper inline-shrink-0 flex bg-black/10 relative overflow-hidden rounded-[15%] w-20 md:w-25 xl:w-30 aspect-[1.1/1]">
                  <Image
                    src="/asset/AboutMission.webp"
                    alt="Discovery"
                    fill
                    sizes="(max-width: 768px) 80px, (max-width: 1280px) 100px, 120px"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </h2>

            {/* Desktop CTA buttons rendered alongside the heading */}
            <div className="hidden md:flex flex-wrap gap-4">
              <ActionButton href="/about" label="Our Story" primary />
              <ActionButton href="/services" label="Our Services" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * ActionButton Component
 *
 * A reusable link component featuring a dual-layer sliding text animation.
 * On hover, the primary text slides up while a secondary layer slides in from the bottom.
 */
const ActionButton = ({ href, label, primary = false }) => {
  const baseClasses =
    "group relative inline-flex shrink-0 justify-center gap-x-2 items-center leading-tight tracking-tight capitalize font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none w-full md:w-auto text-base px-6 py-3 rounded-3xl transition-all duration-300 pointer-fine:hover:rounded-xl flex-row-reverse";

  const variantClasses = primary
    ? "bg-white text-black ring-1 ring-gray-900/5 shadow-sm"
    : "bg-transparent text-black";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      <div className="relative overflow-hidden h-6">
        {/* Layer 1: Static State */}
        <div className="flex items-center gap-x-2 transition-transform duration-500 group-hover:-translate-y-6">
          <span>{label}</span>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-xs mt-0.5"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>

        {/* Layer 2: Hover State (Sliding in from bottom) */}
        <div className="absolute top-0 left-0 flex items-center gap-x-2 translate-y-6 transition-transform duration-500 group-hover:translate-y-0 text-current">
          <span>{label}</span>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-xs mt-0.5"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default AboutMission;
