"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * Marquee Content Configuration
 * Designed for easy updates to slogans and imagery without modifying logic.
 */
const marqueeItems = [
  {
    text: "Chasing Consumers",
    image: "/InfiniteMarquee/Screenshot-2025-06-25-at-14.49.00.webp",
  },
  { text: "Not Algorithms", image: "/InfiniteMarquee/IMG_5023.webp" },
];

const InfiniteMarquee = () => {
  const marqueeRef = useRef(null);
  const wrapperRef = useRef(null);
  const cursorRef = useRef(null);
  const sectionRef = useRef(null);
  const marqueeTweenRef = useRef(null);
  const settleTweenRef = useRef(null);
  const quickNudgeRef = useRef(null);

  /**
   * GSAP Marquee Implementation
   * Handles the continuous movement and the scroll-nudge interaction.
   * The loop tween and the nudge tween target separate elements so
   * they never conflict with each other.
   */
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Calculate width of a single set of items to determine the loop point.
    // We duplicate the items 4 times in JSX, so division by 4 yields the base set width.
    const totalSetWidth = marquee.scrollWidth / 4;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Primary infinite horizontal movement — targets marqueeRef directly.
      marqueeTweenRef.current = gsap.to(marquee, {
        x: -totalSetWidth,
        duration: 70,
        ease: "none",
        repeat: -1,
        modifiers: {
          // The modulo modifier ensures the 'x' value resets instantly when it hits the loop point.
          x: gsap.utils.unitize((x) => parseFloat(x) % totalSetWidth),
        },
      });

      // quickTo setter for the scroll nudge — targets wrapperRef (separate layer).
      quickNudgeRef.current = gsap.quickTo(wrapperRef.current, "x", {
        duration: 0.5,
        ease: "power3.out",
      });

      // Scroll nudge: slight forward/backward shift based on scroll velocity.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();

          // Map velocity → small pixel nudge.
          // ±40px max keeps it subtle. Divide by 25 to scale the raw velocity down.
          const nudge = gsap.utils.clamp(-40, 40, velocity / 25);
          quickNudgeRef.current(nudge);

          // Smoothly settle back to 0 when scrolling stops.
          settleTweenRef.current?.kill();
          settleTweenRef.current = gsap.to(wrapperRef.current, {
            x: 0,
            duration: 1,
            delay: 0.1,
            ease: "power3.out",
          });
        },
      });
    });

    return () => {
      settleTweenRef.current?.kill();
      marqueeTweenRef.current = null;
      quickNudgeRef.current = null;
      ctx.revert();
    };
  }, []);

  /**
   * Custom Cursor Interaction
   * Tracks mouse movement to follow the cursor with a slight lag (ease) for a premium feel.
   */
  useEffect(() => {
    gsap.set(cursorRef.current, {
      opacity: 0,
      scale: 0.5,
      xPercent: -50, // Center the capsule on the cursor
      yPercent: -50,
    });

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

  const showCursor = () =>
    gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0 });

  const hideCursor = () =>
    gsap.to(cursorRef.current, { opacity: 0, scale: 0.5, duration: 0 });

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full py-0 overflow-hidden cursor-none"
        onMouseEnter={showCursor}
        onMouseLeave={hideCursor}
      >
        <Link
          href="https://riseatseven.com/contact/"
          className="block w-full group relative cursor-none overflow-hidden"
        >
          {/**
           * Nudge Wrapper
           * Receives the subtle scroll-driven x offset.
           * Kept separate from marqueeRef so the two GSAP tweens never conflict.
           */}
          <div ref={wrapperRef}>
            {/**
             * Marquee Container
             * Items are quadrupled to ensure the continuous loop never reveals a blank edge
             * on ultra-wide screens or during high-velocity movement.
             */}
            <div
              ref={marqueeRef}
              className="flex whitespace-nowrap py-6 md:py-10 lg:py-16 items-center"
            >
              {[
                ...marqueeItems,
                ...marqueeItems,
                ...marqueeItems,
                ...marqueeItems,
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-x-6 md:gap-x-8 lg:gap-x-12 px-4 md:px-6 lg:px-10 shrink-0"
                >
                  <h2 className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-medium tracking-tighter text-gray-900 leading-none">
                    {item.text}
                  </h2>
                  <div className="shrink-0 rounded-2xl md:rounded-3xl overflow-hidden w-[25vw] md:w-[15vw] lg:w-[12vw] aspect-square relative shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.text}
                      fill
                      sizes="(max-width: 768px) 25vw, (max-width: 1024px) 15vw, 12vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Link>
      </section>

      {/**
       * Interactive Capsule Cursor
       * Replaces default pointer within the section to provide contextual CTA.
       */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-999 pointer-events-none"
      >
        <div className="flex items-center gap-x-2 bg-[#B2F6E3] text-gray-900 font-semibold tracking-tight text-sm lg:text-base px-5 py-3 rounded-full shadow-lg whitespace-nowrap">
          Send Us Your Brief
          <FiArrowUpRight className="text-base shrink-0" />
        </div>
      </div>
    </>
  );
};

export default InfiniteMarquee;
