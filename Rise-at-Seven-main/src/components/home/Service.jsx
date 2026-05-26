"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * Service Data Definition
 * Centralized configuration for service items to maintain clean JSX logic.
 */
const services = [
  {
    title: "Digital PR",
    image: "/service/Screenshot-2025-06-23-at-22.39.35.webp",
    href: "https://riseatseven.com/services/digital-pr/",
  },
  {
    title: "Organic Social & Content",
    image: "/service/Screenshot-2025-07-01-at-20.31.18.webp",
    href: "https://riseatseven.com/services/social/",
  },
  {
    title: "Search & Growth Strategy",
    image: "/service/Screenshot-2025-06-25-at-14.37.50.webp",
    href: "https://riseatseven.com/services/strategy-growth/",
  },
  {
    title: "Content Experience",
    image: "/service/0B5A7487.webp",
    href: "https://riseatseven.com/services/content-experience/",
  },
  {
    title: "Data & Insights",
    image: "/service/e34acc13-be9a-4862-a3bd-95aa2738aeb3.webp",
    href: "https://riseatseven.com/services/data-insights/",
  },
  {
    title: "Onsite SEO",
    image: "/service/Screenshot-2025-06-24-at-00.20.47.webp",
    href: "https://riseatseven.com/services/onsite-seo/",
  },
];

const Service = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /**
     * Entry Animations
     * Scoped within GSAP context for clean lifecycle management (cleanup on unmount).
     */
    const ctx = gsap.context(() => {
      // Staggered text reveal: words slide up into view from a hidden overflow container.
      const words = gsap.utils.toArray(".js-word");
      gsap.from(words, {
        y: "100%",
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".js-heading-animate",
          start: "top 85%",
        },
      });

      // Scale-in effect for the inline thumbnail within the heading.
      gsap.from(".js-header-image", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".js-heading-animate",
          start: "top 85%",
        },
      });

      // Grid items entry: subtle upward drift and fade-in to establish visual rhythm.
      gsap.from(".service-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pb-12 xl:pb-24 overflow-hidden">
      <div className="w-full px-4 md:px-7">
        {/**
         * Header Section
         * Implements a responsive grid for the "Our Services" title and the desktop CTA.
         */}
        <div className="grid grid-cols-12 md:border-b md:border-gray-200 md:pb-5 gap-y-3 md:gap-y-7 gap-x-3 md:gap-x-5 mb-10 pt-10 lg:pt-16">
          <div className="col-span-11 md:col-span-9 flex items-end overflow-hidden">
            <h2
              className="js-heading-animate flex flex-wrap items-center text-left text-gray-900 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-none"
              aria-label="Our Services"
            >
              <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 md:gap-x-3 lg:gap-x-4">
                <span className="js-word inline-block">Our</span>

                <div className="js-header-image inline-block shrink-0 bg-black/5 overflow-hidden rounded-[15%] w-13.5 sm:w-15 md:w-18 lg:w-22.5 aspect-square relative translate-y-0.5 sm:translate-y-0.75 md:translate-y-1">
                  <Image
                    src="/service/0B5A7487.webp"
                    alt="Services Thumbnail"
                    fill
                    sizes="(max-width: 640px) 54px,
             (max-width: 768px) 60px,
             (max-width: 1024px) 72px,
             90px"
                    className="object-cover"
                  />
                </div>

                <span className="js-word inline-block">Services</span>
              </div>
            </h2>
          </div>

          {/* Desktop "View All" Button with custom hover translation effect */}
          <div className="hidden md:flex col-span-3 items-center justify-end">
            <Link
              href="https://riseatseven.com/services/"
              className="group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none md:w-auto text-base px-6 py-3 rounded-3xl transition-all duration-300 pointer-fine:hover:rounded-xl bg-white text-gray-900 ring-gray-900/5 flex-row-reverse"
            >
              <div className="relative overflow-hidden h-6">
                <div className="transition duration-300 pointer-fine:group-hover:-translate-y-6">
                  <div className="flex items-center gap-x-2">
                    <span>View All Services</span>
                    <FiArrowUpRight className="text-xs mt-1" />
                  </div>
                </div>
                <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0 w-full">
                  <div className="flex items-center gap-x-2">
                    <span>View All Services</span>
                    <FiArrowUpRight className="text-xs mt-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/**
         * Services Interaction Grid
         * Items feature a "capsule" hover state where an image background expands
         * and the text shifts to accommodate a sliding arrow icon.
         */}
        <div className="services-grid grid grid-cols-12 gap-x-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item col-span-12 md:col-span-6 group relative"
            >
              {/* Decorative bottom border: indented on desktop hover via padding change */}
              <div className="absolute w-full bottom-0 left-0 z-0 pointer-fine:px-12">
                <div className="w-full h-px bg-gray-200" />
              </div>

              <Link
                href={service.href}
                className="grid grid-cols-1 relative z-10 w-full"
              >
                {/* Foreground Layer: Contains title and mobile-only thumbnails */}
                <div className="col-start-1 row-start-1 relative z-20 py-4 lg:py-6 flex items-center gap-3 text-black transition-colors duration-500 pointer-fine:group-hover:text-white px-4 md:px-10">
                  <div className="inline-flex relative w-12 h-12 rounded-lg overflow-hidden md:rounded-xl md:w-16 md:h-16 pointer-fine:hidden shrink-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 48px, 64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="pointer-fine:translate-x-10 relative flex items-center w-full">
                    <div className="relative flex items-center">
                      {/* Diagonal arrow slides in from bottom-left on hover (desktop only) */}
                      <div className="absolute left-0 overflow-hidden">
                        <div className="transition duration-500 -translate-x-full translate-y-full -rotate-45 pointer-fine:group-hover:rotate-0 pointer-fine:group-hover:translate-x-0 pointer-fine:group-hover:translate-y-0">
                          <FiArrowUpRight className="text-3xl lg:text-4xl" />
                        </div>
                      </div>

                      {/* Title shift logic: moves right to make space for the incoming arrow */}
                      <div className="transition-transform duration-500 ease-out pointer-fine:group-hover:translate-x-14">
                        <h3 className="text-xl/none sm:text-2xl/none md:text-3xl/none lg:text-4xl/none xl:text-5xl/none 3xl:text-6xl/none font-medium tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Capsule Layer: Reveals and scales image on hover */}
                <div className="col-start-1 row-start-1 relative rounded-full overflow-hidden z-10 transition bg-black opacity-0 pointer-fine:group-hover:opacity-100">
                  <div className="relative w-full h-full opacity-60 transition duration-700 pointer-fine:group-hover:scale-[1.05]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Call to Action: Duplicated for UX clarity at the end of the scroll */}
        <div className="col-span-12 md:hidden mt-10">
          <Link
            href="https://riseatseven.com/services/"
            className="w-full group inline-flex shrink-0 justify-center gap-x-2 items-center relative leading-tight tracking-tightish capitalize font-medium overflow-hidden border border-transparent cursor-pointer focus:outline-none text-base px-6 py-3 rounded-3xl transition-all duration-300 pointer-fine:hover:rounded-xl bg-white text-gray-900 ring-gray-900/5 flex-row-reverse"
          >
            <div className="relative overflow-hidden h-6">
              <div className="transition duration-300 pointer-fine:group-hover:-translate-y-6">
                <div className="flex items-center gap-x-2">
                  <span>View All Services</span>
                  <FiArrowUpRight className="text-xs mt-1" />
                </div>
              </div>
              <div className="transition absolute top-0 left-0 translate-y-6 pointer-fine:group-hover:translate-y-0 w-full">
                <div className="flex items-center gap-x-2">
                  <span>View All Services</span>
                  <FiArrowUpRight className="text-xs mt-1" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Service;
