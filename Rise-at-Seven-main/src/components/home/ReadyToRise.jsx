"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ReadyToRise = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heading = textRef.current;
      const trigger = containerRef.current;

      /**
       * Responsive Animation Calculator
       * Recalculates start/end points on window resize to maintain pixel-perfect
       * alignment of the oversized text.
       */
      const updateAnimation = () => {
        const headingWidth = heading.offsetWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const isMobile = windowWidth < 1024;
        const yStart = isMobile ? 100 : 150;
        const yEnd = isMobile ? 200 : 400;
        const charyStart = -60;

        // Establish the initial landing position before scroll interaction begins.
        gsap.set(heading, {
          y: yStart,
          x: headingWidth - windowWidth + windowWidth * 0.5,
        });

        // Main Diagonal Scroll Animation: Translates text across both axes.
        // `invalidateOnRefresh` is critical here to handle layout shifts.
        gsap.to(heading, {
          x: -(headingWidth - windowWidth + 1000),
          y: yEnd,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top 70%",
            end: `+=${headingWidth - windowWidth + windowHeight * 0.35}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Letter-level Entrance: A one-time staggering "bounce" as the section enters the viewport.
        const chars = heading.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { yPercent: charyStart, rotate: 10 },
          {
            yPercent: 0,
            rotate: 0,
            ease: "back.out(2)",
            stagger: 0.04,
            duration: 0.8,
            scrollTrigger: {
              trigger: trigger,
              start: "top 77%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          },
        );
      };

      updateAnimation();

      window.addEventListener("resize", updateAnimation);
      return () => window.removeEventListener("resize", updateAnimation);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text = "Ready to Rise at Seven?";
  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      className="hidden lg:flex w-full overflow-hidden lg:h-[90vh] items-start relative"
    >
      {/**
       * Oversized Typography Container
       * Utilizes `will-change-transform` to signal hardware acceleration for the GSAP scroll animations.
       */}
      <div
        ref={textRef}
        className="shrink-0 whitespace-nowrap text-[30vw] lg:text-[16vw] 4xl:text-[14vw] font-medium tracking-tighter leading-tight text-black flex gap-[0.1em] will-change-transform"
        aria-label={text}
      >
        {words.map((word, wordIdx) => (
          <div key={wordIdx} className="inline-block">
            {word.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className="char inline-block relative transition-colors duration-300"
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReadyToRise;
