"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

// Static asset configuration for the marquee items.
const logos = [
  { name: "AXA", src: "/platforms/axa.png" },
  { name: "Capital One", src: "/platforms/capitalone.png" },
  { name: "Emirates", src: "/platforms/emirates.png" },
  { name: "HubSpot", src: "/platforms/hubspot.png" },
  { name: "JD Sports", src: "/platforms/jd.png" },
  { name: "Kroger", src: "/platforms/kroger.png" },
  { name: "Red Bull", src: "/platforms/redbull.png" },
  { name: "Revolution", src: "/platforms/revulation.png" },
  { name: "Sixr", src: "/platforms/sixr.png" },
  { name: "Shark Ninja", src: "/platforms/startk ninja.png" },
  { name: "Xbox", src: "/platforms/xbox.png" },
];

const ClientLogos = () => {
  const marqueeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let ctx;

    /**
     * Initializes or re-initializes the GSAP marquee animation.
     * Calculated based on scrollWidth to ensure the 'wrap' point matches the content length exactly.
     */
    const initMarquee = () => {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const totalWidth = marquee.scrollWidth;
        const oneSetWidth = totalWidth / 3; // Dividing by 3 as we render 3 iterations for the loop buffer.

        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        // Dynamic speed adjustment based on device category to maintain UX comfort.
        let pixelsPerSecond = 80;
        if (isMobile) pixelsPerSecond = 40;
        else if (isTablet) pixelsPerSecond = 60;

        const duration = oneSetWidth / pixelsPerSecond;

        gsap.to(marquee, {
          x: -oneSetWidth,
          duration: duration,
          ease: "none",
          repeat: -1,
          modifiers: {
            // Unitize and wrap handle the coordinate reset seamlessly without layout shifts.
            x: gsap.utils.unitize(gsap.utils.wrap(0, -oneSetWidth)),
          },
        });
      });
    };

    // Delay initialization slightly to ensure the DOM has calculated layout correctly (especially for images).
    const timeoutId = setTimeout(() => {
      initMarquee();
      setIsLoaded(true);
    }, 200);

    const handleResize = () => {
      initMarquee();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="w-full pt-6 xl:pt-12 bg-transparent">
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-[repeat(20,1fr)] w-full gap-y-2">
          {/* Introductory label aligned with the grid system */}
          <div className="col-span-20 flex items-center md:col-span-4 lg:col-span-3 xl:col-span-2">
            <h2 className="inline-flex flex-wrap text-balance relative text-left justify-start text-gray-900 text-sm md:text-base font-medium tracking-tight leading-tight select-none">
              The agency <br className="hidden md:block lg:hidden" />
              behind ...
            </h2>
          </div>

          {/* Marquee container with overflow management and fade-in state */}
          <div className="relative w-full col-span-20 md:col-span-16 lg:col-span-17 xl:col-span-18 overflow-hidden group min-w-0">
            <div
              className={`w-full relative z-0 overflow-hidden transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <div
                ref={marqueeRef}
                className="flex items-center gap-12 lg:gap-20 py-8 whitespace-nowrap will-change-transform"
              >
                {/* 
                   We render the set 3 times to guarantee the viewport is always filled 
                   regardless of screen size, providing enough buffer for the infinite wrap.
                */}
                {[1, 2, 3].map((setIndex) => (
                  <React.Fragment key={setIndex}>
                    {logos.map((logo, index) => (
                      <div
                        key={`${setIndex}-${index}`}
                        className="marquee-item shrink-0 w-24 md:w-28 lg:w-32 aspect-20/9 relative grayscale brightness-0 opacity-80 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all duration-500"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          fill
                          sizes="(max-width: 768px) 96px, 128px"
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 
               Custom CSS 'Stepped Blurs' to create a soft vignette effect at the edges.
               This is often preferred over simple gradients for a more premium 'layered' look.
            */}
            <div className="section-blur section-blur--left">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{ "--index": i }} />
              ))}
            </div>
            <div className="section-blur section-blur--right">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{ "--index": i }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
