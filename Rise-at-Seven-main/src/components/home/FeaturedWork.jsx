"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

// Project data schema defining visual assets and metadata.
const works = [
  {
    id: 8366,
    title: "SIXT",
    date: "[2023-2025]",
    category: "Car rental",
    description: "An extra 3m clicks regionally through SEO",
    color: "#cb7b3a",
    image: "/featuredWorks/sixt-1.webp",
    href: "https://riseatseven.com/work/sixt/",
  },
  {
    id: 7670,
    title: "Dojo - B2B",
    date: "[2021-2025]",
    category: "Card Machines",
    description: "A B2B success story for Dojo card machines",
    color: "#fdd8c4",
    image: "/featuredWorks/dojo-go-product-shot-1.webp",
    href: "https://riseatseven.com/work/dojo/",
  },
  {
    id: 19708,
    title: "Magnet Trade - B2B",
    date: "[2023-2024]",
    category: "Full Service SEO",
    description: "A full service SEO success story 170%+ increase",
    color: "#d8c4fd",
    image: "/featuredWorks/Screenshot-2026-02-07-at-17.01.43.webp",
    href: "https://riseatseven.com/work/magnet-trade-b2b/",
  },
  {
    id: 16982,
    title: "Leading E Sim brand globally",
    date: "[2023-2025]",
    category: "Esims",
    description: "Increasing brand and non brand visibility UK/ES",
    color: "#cb7b3a",
    image: "/featuredWorks/eSIM-Europe-p1-what-is-eSIM-2-1.webp",
    href: "https://riseatseven.com/work/esim-case-study/",
  },
  {
    id: 17067,
    title: "JD Sports",
    date: "[2025]",
    category: "Trainers",
    description: "65% up YoY in clicks for JDSports FR, IT, ES",
    color: "#3a8ccb",
    image: "/featuredWorks/maxresdefault_2025-10-22-141838_nmnu.webp",
    href: "https://riseatseven.com/work/jd-sports-/",
  },
  {
    id: 8221,
    title: "Parkdean Resorts",
    date: "[2019-2025]",
    category: "Easter Breaks",
    description: "Dominating Google and AI search",
    color: "#d2b59d",
    image: "/featuredWorks/easter-breaks.webp",
    href: "https://riseatseven.com/work/parkdean-resorts-easter-breaks/",
  },
  {
    id: 301,
    title: "Pooky",
    date: "[2025]",
    category: "Rechargeable Lights",
    description: "Driving demand for Pooky Rechargeable Lights",
    color: "#39b0bd",
    image:
      "/featuredWorks/Pooky-Rechargable-Doorstop-Cordless-100-Straight-Empire-Pendant-Silk-Ikat-Shade-in-Black-and-Cream-Atlas-44-Single-chukka-Cordless-95-scaled-1-1.webp",
    href: "https://riseatseven.com/work/pooky/",
  },
  {
    id: 11781,
    title: "Parkdean Resorts",
    date: "[2019-2025]",
    category: "UK holidays",
    description: "Social search and multi channel content to #1",
    color: "#d29dd0",
    image: "/featuredWorks/1.webp",
    href: "https://riseatseven.com/work/parkdean-resorts-social-search/",
  },
  {
    id: 27,
    title: "Revolution Beauty",
    date: "[2022-2025]",
    category: "Beauty Dupes",
    description: "Building the UK's leading beauty dupe brand",
    color: "#fecacc",
    image: "/featuredWorks/Screenshot-2025-06-10-at-12.13.46.webp",
    href: "https://riseatseven.com/work/revolution-beauty/",
  },
  {
    id: 297,
    title: "Lloyds Pharmacy",
    date: "[2022-23]",
    category: "STI tests",
    description: "Driving category leadership for STI tests",
    color: "#60dcfb",
    image: "/featuredWorks/Screenshot-2025-07-04-at-12.50.54.webp",
    href: "https://riseatseven.com/work/lloyds-pharmacy/",
  },
  {
    id: 8004,
    title: "PrettyLittleThing",
    date: "[2021-2023]",
    category: "Outfits",
    description: 'Driving discovery for everything "outfits" for PLT',
    color: "#fecacc",
    image: "/featuredWorks/Screenshot-2025-06-23-at-14.43.56.webp",
    href: "https://riseatseven.com/work/prettylittlething/",
  },
];

const FeaturedWork = () => {
  const sectionRef = useRef(null);
  const titlesListRef = useRef(null);
  const rightColRef = useRef(null);
  const cursorRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  /**
   * Global mouse listener for the custom cursor.
   * Uses a low duration/ease to ensure responsiveness while smoothing out jitter.
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
   * Core Scroll Animation Logic
   * Calculates the total height of the scrolling column and binds it to the viewport height
   * to create a 'sticky' experience.
   */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const trigger = sectionRef.current;
      const imagesContainer = rightColRef.current;
      const titlesContainer = titlesListRef.current;
      const headings = titlesContainer.querySelectorAll(".js-heading-item");
      const windowHeight = window.innerHeight;
      const imagesHeight = imagesContainer.offsetHeight;

      // Expand the trigger container height to define the scroll duration.
      gsap.set(trigger, {
        height: `${imagesHeight}px`,
      });

      // Synchronize the image column translation with the scroll progress.
      gsap.to(imagesContainer, {
        y: () => -(imagesHeight - windowHeight),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${imagesHeight - windowHeight}`,
          scrub: true,
        },
      });

      // Synchronize the titles list translation to keep the active item roughly centered.
      const headingsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${imagesHeight - windowHeight}`,
          scrub: true,
        },
      });

      headings.forEach((heading) => {
        headingsTimeline.fromTo(
          heading,
          { y: 0 },
          {
            y: -titlesContainer.offsetHeight + 300,
            duration: 4,
            ease: "none",
          },
          0, // Parallel execution is critical to keep the list moving as a single unit.
        );
      });

      // Observer pattern to track which image is currently 'central' to the viewport.
      const imageItems = imagesContainer.querySelectorAll(".work-image-item");
      imageItems.forEach((img, i) => {
        ScrollTrigger.create({
          trigger: img,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full relative -my-7 flex overflow-hidden pointer-fine:overflow-visible"
      >
        <div className="w-full py-7 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden px-4 md:px-7">
          <div className="w-full lg:h-full overflow-hidden bg-[#050505] border border-white/6 rounded-[1.15rem] md:rounded-[1.45rem] grid grid-cols-12 px-4 lg:pl-8 lg:pr-8 xl:pl-10 xl:pr-10">
            {/* Left Column: Sticky Project Titles */}
            <div
              className="relative col-span-12 items-start hidden lg:flex lg:flex-row lg:items-center lg:col-span-6 lg:h-[96svh]"
              onMouseEnter={() =>
                gsap.to(cursorRef.current, {
                  opacity: 0,
                  scale: 0.5,
                  duration: 0,
                })
              }
            >
              <div className="absolute right-0 top-10 bottom-10 w-px bg-white/[0.07]" />
              <div className="flex flex-col items-start relative z-10 h-full pt-14 lg:pt-24 lg:pb-32 lg:gap-y-20">
                <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-white/90 opacity-100 text-[25px] leading-none font-medium tracking-tight mb-10 lg:mb-14">
                  Featured Work
                </h2>

                <div className="relative flex-1 w-full overflow-hidden pr-4 lg:inline-block">
                  {/* Visual depth via edge blurs */}
                  <div className="absolute top-0 left-0 w-full h-[20%] z-20 pointer-events-none bg-linear-to-b from-[#050505] via-[#050505]/85 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[28%] z-20 pointer-events-none bg-linear-to-t from-[#050505] via-[#050505]/90 to-transparent" />

                  <div
                    ref={titlesListRef}
                    className="grid gap-y-0 relative z-10 mt-[10%]"
                  >
                    {works.map((work, i) => (
                      <div
                        key={work.id}
                        className="js-heading-item relative"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <Link
                          href={work.href}
                          className={`group/title flex items-start gap-x-1.5 lg:gap-x-2 transition-transform duration-300 ${activeIndex === i || hoveredIndex === i ? "text-white" : "text-white/[0.55]"}`}
                        >
                          <div
                            className={`
                            inline-flex flex-wrap text-balance relative text-left justify-start 
                            text-[60px]/[0.93] lg:text-[72px]/[0.9] xl:text-[84px]/[0.88] 2xl:text-[92px]/[0.86] 3xl:text-[104px]/[0.86]
                            font-medium tracking-[-0.04em]
                            transition-all duration-500
                            ${activeIndex === i || hoveredIndex === i ? "text-white opacity-100" : "text-white/30 opacity-100"}
                          `}
                          >
                            {work.title}
                          </div>
                          <div
                            className={`text-white/85 text-[10px] lg:text-[11px] font-medium mt-1.5 lg:mt-2 transition-all duration-500 ${activeIndex === i || hoveredIndex === i ? "opacity-100" : "opacity-35"}`}
                          >
                            {work.date}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Scrolling Image Cards */}
            <div
              ref={rightColRef}
              className="col-span-12 grid pt-7 pb-14 lg:col-span-6 lg:col-start-7 3xl:col-span-5 3xl:col-start-8 4xl:col-span-5 4xl:col-start-8 will-change-transform"
              onMouseLeave={() =>
                gsap.to(cursorRef.current, {
                  opacity: 0,
                  scale: 0.5,
                  duration: 0,
                })
              }
            >
              <div className="mb-5 lg:hidden">
                <h2 className="text-white text-md lg:text-lg font-medium tracking-tight">
                  Featured Work
                </h2>
              </div>

              {works.map((work, i) => (
                <Link
                  key={work.id}
                  href={work.href}
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                    gsap.to(cursorRef.current, {
                      opacity: 1,
                      scale: 1,
                      duration: 0,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    gsap.to(cursorRef.current, {
                      opacity: 0,
                      scale: 0.5,
                      duration: 0,
                    });
                  }}
                  className="work-image-item group relative grid rounded-2xl overflow-hidden mb-5 lg:mb-7 cursor-none"
                >
                  {/* Primary Project Imagery */}
                  <div className="col-start-1 row-start-1 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ paddingTop: "75%" }}
                    >
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-opacity duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Metadata Pill */}
                  <div className="col-start-1 row-start-1 z-30 p-3 lg:p-5 flex justify-end items-start lg:items-end pointer-events-none">
                    <div className="shrink-0 inline-flex items-center rounded-full tracking-tight font-medium leading-none text-white bg-white/20 backdrop-blur-sm text-sm gap-x-3 py-2.5 px-3.5 lg:text-base">
                      <span>{work.category}</span>
                      <FiArrowUpRight className="text-sm" />
                    </div>
                  </div>

                  {/* Mobile-only descriptive overlay */}
                  <div className="col-start-1 row-start-1 p-3 z-30 relative flex justify-start items-end lg:hidden pointer-events-none">
                    <div className="grid gap-y-1 relative z-20">
                      <div className="text-white text-xs font-medium mt-2">
                        {work.date}
                      </div>
                      <div className="text-white text-3xl font-medium tracking-tight leading-none">
                        {work.title}
                      </div>
                    </div>
                    <div className="absolute w-full bottom-0 left-0 h-32 bg-linear-to-t from-black z-10 opacity-70" />
                  </div>

                  {/* 
                     Hover Interaction Layer
                     Uses an animated clip-path circle to reveal project success metrics 
                     on top of the brand's accent color.
                  */}
                  <div
                    className={`
                      col-start-1 row-start-1 z-40 p-3 lg:p-5
                      flex flex-col items-start justify-between
                      transition-[clip-path] duration-700 ease-out
                      ${
                        hoveredIndex === i
                          ? "[clip-path:circle(150%_at_50%_50%)]"
                          : "[clip-path:circle(0px_at_50%_50%)]"
                      }
                    `}
                    style={{ backgroundColor: work.color, color: "#000000" }}
                  >
                    <div
                      className={`inline-flex flex-wrap text-balance relative text-left justify-start text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tighter leading-none transition-transform duration-700 ease-out delay-100 ${hoveredIndex === i ? "translate-y-0" : "translate-y-4"}`}
                    >
                      {work.description}
                    </div>

                    <div
                      className={`w-full flex items-end justify-end transition-transform duration-700 ease-out delay-150 ${hoveredIndex === i ? "translate-y-0" : "translate-y-4"}`}
                    >
                      <div className="shrink-0 inline-flex items-center rounded-full tracking-tight font-medium leading-none text-current bg-white/15 backdrop-blur-sm text-sm gap-x-3 py-2.5 px-3.5 lg:text-base">
                        <span>{work.category}</span>
                        <FiArrowUpRight className="text-sm" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Primary CTA for the Work Archive */}
      <div className="flex justify-center mt-3 lg:mt-7 px-4">
        <Link
          href="/work"
          className="
            group inline-flex shrink-0 justify-center gap-x-2 items-center
            relative leading-tight tracking-tight capitalize font-medium
            overflow-hidden border border-transparent cursor-pointer
            w-full lg:w-auto text-base px-6 py-3 rounded-3xl
            transition-all duration-300 hover:rounded-xl
            bg-white text-gray-900
          "
        >
          <div className="relative overflow-hidden h-6">
            <div className="flex items-center gap-x-2 transition-transform duration-300 group-hover:-translate-y-6">
              <span>Explore Our Work</span>
              <FiArrowUpRight className="text-xs mt-0.5" />
            </div>
            <div className="flex items-center gap-x-2 absolute top-0 left-0 translate-y-6 transition-transform duration-300 group-hover:translate-y-0">
              <span>Explore Our Work</span>
              <FiArrowUpRight className="text-xs mt-0.5" />
            </div>
          </div>
        </Link>
      </div>

      {/* Floating Interactive Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-999 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-28 h-28 rounded-full bg-[#B2F6E3] flex items-center justify-center shadow-lg">
          <FiArrowUpRight className="text-gray-900 text-xl" />
        </div>
      </div>
    </>
  );
};

export default FeaturedWork;
