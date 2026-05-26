"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/**
 * Card Data Configuration
 * Defines content, themes, and initial "fan" rotation angles to give the stack
 * a natural, non-perfectly-aligned appearance on load.
 */
const legacyData = [
  {
    title: "Pioneers",
    bg: "bg-black",
    textColor: "text-white",
    image: "/LegacyAccordion/AboutMission.webp",
    content: (
      <>
        <p>
          We&apos;re dedicated to creating the industry narrative that others
          follow 3 years from now. We paved the path for creative SEO,
          multi-channel search with Digital PR, and Social Search and we will
          continue to do it.
        </p>
        <p>
          We&apos;re on a mission to be the first search-first agency to win a
          Cannes Lion disrupting the status quo.
        </p>
      </>
    ),
    staticRotation: 4,
    zIndex: 2,
  },
  {
    title: "Award Winning",
    bg: "bg-[#AEEEDF]",
    textColor: "text-gray-900",
    image: "/LegacyAccordion/d4df0d30-d590-4e94-9056-9491f4beacba.webp",
    content: (
      <p>
        A roll top bath full of 79 awards. Voted The Drum&apos;s best agency
        outside of London. We are official judges for industry awards including
        Global Search Awards and Global Content Marketing Awards.
      </p>
    ),
    staticRotation: 8,
    zIndex: 1,
  },
  {
    title: "Speed",
    bg: "bg-white",
    textColor: "text-gray-900",
    image: "/LegacyAccordion/Screenshot-2025-06-23-at-23.15.19.webp",
    content: (
      <p>
        People ask us why we are called Rise at Seven? Ever heard the saying
        Early Bird catches the worm? Google is moving fast, but humans are
        moving faster. We chase consumers, not algorithms. We&apos;ve created a
        service which takes ideas to result within 60 minutes.
      </p>
    ),
    staticRotation: 12,
    zIndex: 0,
  },
];

const LegacyAccordion = () => {
  const triggerRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    /**
     * Desktop Animation Sequence (>= 1024px)
     * Orchestrates the peeling and scaling effect of the stacked cards.
     */
    mm.add("(min-width: 1024px)", () => {
      const wrappers = gsap.utils.toArray(
        stickyRef.current.querySelectorAll(".js-legacy-wrapper"),
      );
      const cards = gsap.utils.toArray(
        stickyRef.current.querySelectorAll(".js-legacy-card"),
      );

      // Explicitly define starting states to prevent FOUC (Flash of Unstyled Content)
      gsap.set(wrappers, { yPercent: 0, rotate: 0 });
      gsap.set(cards, { scale: 0.985 });

      // Peeling Animation: Each card (except the last) slides up out of view.
      // The scroll distance is divided equally per card based on the 300vh trigger height.
      wrappers.forEach((wrapper, index) => {
        if (index === legacyData.length - 1) return;

        const scrollPerCard = window.innerHeight;

        gsap.to(wrapper, {
          yPercent: -100,
          rotate: -5,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: `top+=${index * scrollPerCard} top`,
            end: `top+=${(index + 1) * scrollPerCard} top`,
            scrub: 0.8,
          },
        });
      });

      // Scaling Transition: Cards scale up to 1.0 as they become the primary focused card.
      cards.forEach((card, index) => {
        gsap.to(card, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: `top+=${index * window.innerHeight} top`,
            end: `top+=${(index + 1) * window.innerHeight} top`,
            scrub: 1,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="w-full py-0">
      {/**
       * Mobile Experience
       * Uses a horizontal Swiper layout. Overflow is hidden at this level
       * to keep the slider loop contained without affecting desktop sticky logic.
       */}
      <div className="lg:hidden overflow-hidden px-4 md:px-7 py-12 pb-10">
        <div className="flex justify-center mb-8">
          <h2 className="text-gray-900 text-sm tracking-tight font-medium opacity-70">
            Legacy In The Making
          </h2>
        </div>

        <div className="relative">
          <Swiper
            modules={[Pagination]}
            pagination={{
              el: ".legacy-pagination",
              type: "progressbar",
            }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            grabCursor={true}
            className="w-full"
          >
            {legacyData.map((item, index) => (
              <SwiperSlide
                key={`legacy-slide-${index}`}
                className="flex h-auto"
              >
                <div
                  className={`w-full flex flex-col items-center text-center gap-5 ${item.bg} ${item.textColor} shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/10 rounded-[1.8rem] p-6 pb-10 min-h-115`}
                >
                  <div className="w-full aspect-4/3 rounded-[1.1rem] overflow-hidden relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 400px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-4xl font-medium tracking-[-0.03em] leading-[0.95] mt-2">
                    {item.title}
                  </h3>
                  <div className="text-[15px] opacity-85 leading-snug space-y-3 px-2 grow flex flex-col justify-center">
                    {item.content}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom thin-line progress bar for Swiper navigation feedback */}
          <div className="relative mt-8 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="legacy-pagination static! h-full! bg-transparent! [&>.swiper-pagination-progressbar-fill]:bg-black!" />
          </div>
        </div>
      </div>

      {/**
       * Desktop Experience
       * A 300vh container that provides the scroll "length" required to peel
       * through three full-screen cards.
       */}
      <div
        ref={triggerRef}
        className="hidden lg:block relative"
        style={{ height: "300vh" }}
      >
        {/**
         * Sticky Viewport Container
         * Ensures the card stack remains fixed in view while the user scrolls through the 300vh.
         * overflow-hidden is intentional here to clip cards as they exit the top boundary.
         */}
        <div
          ref={stickyRef}
          className="w-full h-screen sticky top-0 left-0 overflow-hidden"
        >
          {/* Global Section Caption */}
          <div className="absolute top-0 left-0 w-full flex justify-center mt-10 3xl:mt-16 z-20">
            <h2 className="text-gray-900/85 text-base xl:text-lg font-medium tracking-tight">
              Legacy In The Making
            </h2>
          </div>

          {/**
           * Card Stack Implementation
           * Cards are layered via absolute positioning and indexed in reverse
           * order (zIndex) to establish the initial visual hierarchy.
           */}
          {legacyData.map((item, index) => (
            <div
              key={index}
              className="js-legacy-wrapper w-full h-full absolute left-0 top-0 flex items-center justify-center pt-10"
              style={{
                zIndex: item.zIndex,
                willChange: "transform", // Hardware acceleration for smooth GSAP transitions
              }}
            >
              {/* Secondary wrapper to apply the base "fan" rotation without affecting the scroll translation */}
              <div
                className="w-full max-w-xl xl:max-w-2xl"
                style={{ transform: `rotate(${item.staticRotation}deg)` }}
              >
                <div
                  className={`js-legacy-card w-full flex-col text-center rounded-[2.1rem] grid p-7 border border-black/10 shadow-[0_28px_55px_rgba(0,0,0,0.14)] lg:items-center lg:aspect-square xl:py-10 xl:px-14 ${item.bg}`}
                >
                  <div className="col-start-1 row-start-1 flex flex-col text-center lg:items-center gap-y-4 md:gap-y-5">
                    {/* Thumbnail Preview */}
                    <div className="rounded-2xl overflow-hidden w-full aspect-4/3 relative lg:aspect-square lg:rounded-[1.15rem] lg:w-52 2xl:w-56">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 224px, 100vw"
                      />
                    </div>

                    {/* Editorial Content */}
                    <div className="flex flex-col items-center gap-y-3">
                      <h3
                        className={`text-3xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-medium tracking-[-0.035em] leading-[0.9] ${item.textColor}`}
                      >
                        {item.title}
                      </h3>
                      <div
                        className={`w-full max-w-[44ch] text-sm lg:text-[17px] leading-[1.38] text-pretty space-y-4 opacity-85 ${item.textColor}`}
                      >
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegacyAccordion;
