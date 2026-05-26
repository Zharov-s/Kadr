"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight, FiClock } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";

/**
 * Editorial Data Structure
 * Centralized list of recent posts. Designed for easy CMS integration later.
 */
const posts = [
  {
    id: 1,
    title: "Ryan McNamara Is Now Rise at Seven's Global Operations Director",
    author: "Carrie Rose",
    time: "2 mins",
    category: "News",
    image: "/whatsNew/0B5A8137.webp",
    href: "https://riseatseven.com/blog/global-operations-director-promotion/",
  },
  {
    id: 2,
    title:
      "Rise at Seven Appointed by Coneys to Drive Demand and Retail Growth",
    author: "Ray Saddiq",
    time: "2 mins",
    category: "Food/Hospitality/Drink",
    image: "/whatsNew/WRAS-Manchester-01.webp",
    href: "https://riseatseven.com/blog/coneys-chooses-riseatseven-for-demand-brief-2/",
  },
  {
    id: 3,
    title:
      "Rise at Seven Appointed by Langtins to drive demand and retail growth for Noomz",
    author: "Carrie Rose",
    time: "2 mins",
    category: "Food/Hospitality/Drink",
    image: "/whatsNew/0B5A7827.webp",
    href: "https://riseatseven.com/blog/noomz-chooses-riseatseven-for-demand-brief/",
  },
];

const WhatsNew = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cursorRef = useRef(null);

  /**
   * Interactive Cursor Logic
   * Tracks global mouse coordinates and translates the custom cursor element.
   * Utilizes GSAP for smoothed tracking (ease) rather than raw CSS positioning.
   */
  useEffect(() => {
    gsap.set(cursorRef.current, { opacity: 0, scale: 0.5 });

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /**
   * Scroll-triggered Entrance Animations
   * Scoped within GSAP context to ensure proper cleanup on component unmount.
   */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading Character Reveal: Slides each character up into view from a clipped container.
      const chars = headingRef.current.querySelectorAll(".char-inner");
      gsap.from(chars, {
        y: "110%",
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Inline Decorative Image: Subtle "pop-in" effect paired with the heading reveal.
      gsap.from(".js-image-wrapper", {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /**
   * Character Wrapping Utility
   * Splits text into individual characters for high-granularity animation control.
   */
  const renderText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-flex overflow-hidden h-full">
        <span className="char-inner inline-block relative">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="w-[calc(100%-1rem)] mx-auto py-12 xl:py-24 rounded-lg m-2 overflow-hidden"
    >
      <div className="px-4 md:px-7">
        {/**
         * Section Header
         * Features the "What's New" title with an integrated brand thumbnail.
         */}
        <div className="grid grid-cols-12 md:border-b md:border-gray-400 md:pb-8 mb-12 gap-y-8">
          <div className="col-span-12 md:col-span-9 flex items-end">
            <h2
              ref={headingRef}
              className="flex flex-wrap items-center text-left text-gray-900 text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl leading-[0.95] font-medium tracking-tight"
              aria-label="What's New"
            >
              <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 md:gap-x-3 lg:gap-x-4">
                <div className="inline-flex gap-x-[0.02em]">
                  {renderText("What's")}
                </div>

                <div className="inline-flex align-middle shrink-0 rounded-[15%] w-16 sm:w-18 md:w-20 lg:w-22.5 aspect-4/3 relative overflow-hidden js-image-wrapper translate-y-0.5 sm:translate-y-0.75 md:translate-y-1">
                  <Image
                    src="/whatsNew/FOS25-3380.webp"
                    alt="Decoration"
                    fill
                    sizes="(max-width: 640px) 64px,
             (max-width: 768px) 72px,
             (max-width: 1024px) 80px,
             90px"
                    className="object-cover"
                  />
                </div>

                <div className="inline-flex gap-x-[0.02em]">
                  {renderText("New")}
                </div>
              </div>
            </h2>
          </div>

          {/* Desktop Button */}
          <div className="hidden lg:flex col-span-12 lg:col-span-3 lg:items-center lg:justify-end">
            <Link
              href="https://riseatseven.com/blog/"
              className="group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none lg:w-auto text-base px-6 py-3 rounded-3xl transition-all duration-300 pointer-fine:hover:rounded-xl bg-white text-gray-900 ring-gray-900/5 flex-row-reverse"
            >
              <div className="relative overflow-hidden h-6">
                <div className="transition duration-300 pointer-fine:group-hover:-translate-y-6">
                  <div className="flex items-center gap-x-2">
                    <span>Explore More Thoughts</span>
                    <FiArrowUpRight className="text-xs mt-1" />
                  </div>
                </div>

                <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0 w-full">
                  <div className="flex items-center gap-x-2">
                    <span>Explore More Thoughts</span>
                    <FiArrowUpRight className="text-xs mt-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/**
         * Carousel Implementation
         * A responsive slider showing post previews with category tags and metadata.
         */}
        <div
          className="w-full cursor-none"
          onMouseEnter={() =>
            gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0 })
          }
          onMouseLeave={() =>
            gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0 })
          }
        >
          <Swiper
            modules={[Pagination]}
            slidesPerView={1.15}
            spaceBetween={15}
            pagination={{
              type: "progressbar",
              el: ".swiper-pagination",
            }}
            breakpoints={{
              768: { slidesPerView: 2.15 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="overflow-visible!"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className="py-2">
                <Link
                  href={post.href}
                  className="group block w-full transition-all duration-500 hover:-translate-y-2 cursor-none"
                >
                  {/* Visual Asset Container */}
                  <div className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden mb-6 bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-sm"
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <div className="bg-white/20 backdrop-blur-md text-white text-sm px-4 py-1.5 rounded-full font-medium">
                        {post.category}
                      </div>
                    </div>
                  </div>

                  {/* Metadata & Title */}
                  <div className="flex flex-col gap-y-4 px-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full">
                        <div className="w-5 h-5 rounded-full overflow-hidden relative">
                          <Image
                            src="/asset/AboutMission.webp"
                            alt={post.author}
                            fill
                            sizes="20px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-500">
                          {post.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full text-gray-400 text-sm font-medium">
                        <FiClock className="text-xs" />
                        <span>{post.time}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl xl:text-3xl font-medium leading-tight tracking-tight text-gray-900">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thin-line progress bar synchronized with Swiper state */}
          <div className="relative mt-12 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="swiper-pagination static! h-full! bg-transparent! [&>.swiper-pagination-progressbar-fill]:bg-black!" />
          </div>
        </div>
      </div>

      {/* Mobile + Tablet Button */}
      <div className="mt-10 flex justify-center lg:hidden">
        <Link
          href="https://riseatseven.com/blog/"
          className="w-full sm:w-auto group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none text-base px-6 py-3 rounded-3xl transition-all duration-300 pointer-fine:hover:rounded-xl bg-white text-gray-900 ring-gray-900/5 flex-row-reverse"
        >
          <div className="relative overflow-hidden h-6">
            <div className="transition duration-300 pointer-fine:group-hover:-translate-y-6">
              <div className="flex items-center gap-x-2">
                <span>Explore More Thoughts</span>
                <FiArrowUpRight className="text-xs mt-1" />
              </div>
            </div>

            <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0 w-full">
              <div className="flex items-center gap-x-2">
                <span>Explore More Thoughts</span>
                <FiArrowUpRight className="text-xs mt-1" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/**
       * Interactive Floating Cursor
       * Replaces the standard pointer within the carousel area to emphasize actionability.
       */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-999 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-28 h-28 rounded-full bg-[#B2F6E3] flex items-center justify-center shadow-lg">
          <FiArrowUpRight className="text-gray-900 text-2xl" />
        </div>
      </div>
    </section>
  );
};

export default WhatsNew;
