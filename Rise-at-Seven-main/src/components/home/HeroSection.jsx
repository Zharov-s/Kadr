"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const platforms = [
  { name: "Google", logo: "/asset/gogle.webp" },
  { name: "ChatGPT", logo: "/asset/chat-gpt.webp" },
  { name: "Gemini", logo: "/asset/gemini.webp" },
  { name: "TikTok", logo: "/asset/tiktok.webp" },
  { name: "YouTube", logo: "/asset/youtube.webp" },
  { name: "Pinterest", logo: "/asset/pinterest.webp" },
  { name: "GIPHY", logo: "/asset/giphy.webp" },
  { name: "reddit", logo: "/asset/reddit.webp" },
  { name: "amazon", logo: "/asset/amazon.webp" },
];

const HERO_IMAGES = [
  "/banner/banner-1.jpg",
  "/banner/banner-2.jpg",
  "/banner/banner-3.webp",
  "/banner/banner-4.jpg",
  "/banner/banner-5.jpg",
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const awardsRef = useRef(null);
  const platformsRef = useRef(null);

  const [heroImage, setHeroImage] = React.useState(HERO_IMAGES[0]);

  // -----------------------------------------------------------------------------
  // Life Cycle: Animation & Asset Initialization
  // Handles the cinematic entrance sequence and dynamic image assignment.
  // -----------------------------------------------------------------------------

  useEffect(() => {
    // Select a single random image for visual freshness on each reload
    const randomImg =
      HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];
    setHeroImage(randomImg);

    const initGSAP = async () => {
      // Dynamic imports prevent build-time issues with window-dependent libraries
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1: Industry Authority Entrance
      tl.fromTo(
        awardsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
      );

      // Step 2: High-Impact Typography Reveal
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words?.length) {
        tl.fromTo(
          words,
          { opacity: 0, y: 40, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.1 },
          "-=0.2",
        );
      }

      // Step 3: Supporting Context Reveal
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2",
      );

      // Step 4: Ecosystem Logo Stagger
      const platformEls =
        platformsRef.current?.querySelectorAll(".platform-item");
      if (platformEls?.length) {
        tl.fromTo(
          platformEls,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
          "-=0.1",
        );
      }
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-[calc(100%-1rem)] mx-auto min-h-[95vh] flex flex-col overflow-hidden bg-black rounded-[20px] m-2"
    >
      {/* 
          Visual Foundation: Cinematic Background 
          Priority loading is critical here to ensure immediate LCP stabilization.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60 blur-md scale-105"
        />
        {/* Alpha mask for text legibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* -----------------------------------------------------------------------------
          Main Content Layout
          ----------------------------------------------------------------------------- */}

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-32 pb-20 text-center">
        {/* Social Proof Layer: Award Badges */}
        <div ref={awardsRef} className="mb-8 opacity-0">
          <p className="text-white text-[10px] md:text-[12px] font-bold tracking-[0.2em] uppercase mb-4 opacity-80">
            #1 Most Recommended
            <br />
            Content Marketing Agency
          </p>
          <div className="flex items-center justify-center gap-4">
            <svg
              viewBox="0 0 28 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 fill-current text-white opacity-60"
            >
              <path d="M25.826 36.2423C24.1628 35.2302 22.3284 34.9354 20.4357 34.7259C19.6852 34.6204 18.9236 34.4691 18.193 34.2705C17.3545 34.0474 16.5347 33.7576 15.7419 33.4062L16.4438 31.9431C17.2169 30.332 16.5375 28.3991 14.9263 27.6261L14.0759 29.3985C13.5361 30.5234 13.7046 31.805 14.4037 32.7394C13.3196 32.1373 12.3026 31.4146 11.3802 30.5845L12.6328 29.1752C13.8199 27.8396 13.6998 25.7945 12.364 24.6072L11.0579 26.0765C10.0602 27.199 9.98609 28.8225 10.7806 30.0168C10.6575 29.8939 10.5358 29.7692 10.4166 29.6422C9.49052 28.6654 8.6932 27.5814 8.02681 26.4223L9.41226 25.5441C10.9217 24.5875 11.3698 22.5885 10.4131 21.0791L8.75281 22.1315C7.7684 22.7554 7.23555 23.8229 7.24942 24.9087C6.7712 23.8595 6.39118 22.7641 6.11088 21.6429L7.61991 21.1998C9.33444 20.6962 10.3162 18.8982 9.81266 17.1835L7.92644 17.7374C6.85358 18.0523 6.06774 18.8744 5.75319 19.8655C5.57825 18.727 5.50281 17.5732 5.52904 16.4239L7.2633 16.4128C9.05024 16.4013 10.4897 14.9435 10.4782 13.1565L8.5124 13.1691C7.23035 13.1773 6.12736 13.93 5.61055 15.0146C5.73 13.7312 5.98818 12.4645 6.37211 11.2376L8.06062 11.7101C9.78144 12.1916 11.5669 11.1871 12.0486 9.46623L10.1554 8.93641C8.90673 8.58696 7.62424 9.02009 6.83038 9.94142C7.30904 8.72939 7.91213 7.56635 8.62664 6.47593L10.1355 7.40528C11.6568 8.34265 13.6501 7.86898 14.5873 6.3476L12.9135 5.31658C11.788 4.62331 10.4045 4.70222 9.38126 5.40589C9.87033 4.76053 10.4008 4.14639 10.9692 3.56888C11.3054 3.84679 11.7648 3.98423 12.2801 3.86023C12.6898 3.7616 13.1 3.57083 13.4724 3.24067C15.26 1.65751 15.26 0.0708753 15.26 0.0708753C13.0683 -0.225683 11.698 0.452629 10.855 1.28334C10.1931 1.93542 10.3013 2.86694 10.8194 3.42667C10.0988 4.13143 9.44456 4.88605 8.85752 5.68142C9.29 4.30204 8.75303 2.75334 7.46577 1.96057L5.792 0.929551C4.85463 2.45093 5.3283 4.44425 6.84968 5.3814L8.39642 6.33437C7.60321 7.51085 6.94961 8.76602 6.43887 10.0721C6.32463 8.76906 5.42108 7.61187 4.087 7.23857L2.19384 6.70876C1.71237 8.42958 2.71694 10.215 4.43776 10.6967L6.05409 11.1491C5.63353 12.4429 5.34824 13.7772 5.2004 15.1264C4.69182 13.9916 3.54916 13.2042 2.22571 13.2127L0.259922 13.2252C0.271412 15.0122 1.72927 16.4516 3.51621 16.4401L5.10068 16.4299C5.03933 17.8386 5.12691 19.2542 5.36667 20.6479C4.57671 19.6171 3.20665 19.1237 1.88601 19.5115L0 20.0652C0.503586 21.7797 2.30158 22.7615 4.01633 22.2579L5.59928 21.7931C5.90776 23.1092 6.35563 24.398 6.94419 25.6345C5.91621 24.398 4.55222 24.917 3.44966 25.6157L1.78932 26.6681C2.74598 28.1776 4.74494 28.6257 6.25439 27.669L7.56983 26.8353C8.22039 27.9801 9.00038 29.0699 9.91151 30.0823C8.7617 29.767 7.48073 30.1015 6.63528 31.053L5.32916 32.5224C6.66476 33.7095 8.70989 33.5894 9.89721 32.2535L10.9189 31.1042C11.9553 32.0671 13.113 32.8948 14.3532 33.5737C13.0642 33.4781 11.7889 34.1658 11.196 35.4014L10.3455 37.1739C11.9566 37.9469 13.8895 37.2675 14.6625 35.6564L15.4065 34.1057C16.8386 34.7702 18.36 35.2451 19.9167 35.5122C20.2867 35.5738 20.73 35.6432 21.0908 35.6865C23.2018 35.9542 24.9211 36.55 26.5574 37.9224L27.162 37.1667C26.7397 36.8346 26.2964 36.5207 25.8264 36.2426L25.826 36.2423Z" />
            </svg>

            {/* Verification Layer: Industry standard logo verification */}
            <div className="flex items-center gap-4 opacity-80 h-4 md:h-6">
              <Image
                src="/asset/global-search-awards.webp"
                width={80}
                height={24}
                alt="Global Search Awards"
                className="object-contain h-full"
              />
              <Image
                src="/asset/Mask-group.webp"
                width={80}
                height={24}
                alt="The Drum"
                className="object-contain h-full"
              />
              <Image
                src="/asset/UKSocial-Media-Awards-White.webp"
                width={80}
                height={24}
                alt="UK Social Media Awards"
                className="object-contain h-full"
              />
              <Image
                src="/asset/UK-Content-Awards-White.webp"
                width={80}
                height={24}
                alt="UK Content Awards"
                className="object-contain h-full"
              />
            </div>

            <svg
              viewBox="0 0 28 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 fill-current text-white opacity-60 scale-x-[-1]"
            >
              <path d="M25.826 36.2423C24.1628 35.2302 22.3284 34.9354 20.4357 34.7259C19.6852 34.6204 18.9236 34.4691 18.193 34.2705C17.3545 34.0474 16.5347 33.7576 15.7419 33.4062L16.4438 31.9431C17.2169 30.332 16.5375 28.3991 14.9263 27.6261L14.0759 29.3985C13.5361 30.5234 13.7046 31.805 14.4037 32.7394C13.3196 32.1373 12.3026 31.4146 11.3802 30.5845L12.6328 29.1752C13.8199 27.8396 13.6998 25.7945 12.364 24.6072L11.0579 26.0765C10.0602 27.199 9.98609 28.8225 10.7806 30.0168C10.6575 29.8939 10.5358 29.7692 10.4166 29.6422C9.49052 28.6654 8.6932 27.5814 8.02681 26.4223L9.41226 25.5441C10.9217 24.5875 11.3698 22.5885 10.4131 21.0791L8.75281 22.1315C7.7684 22.7554 7.23555 23.8229 7.24942 24.9087C6.7712 23.8595 6.39118 22.7641 6.11088 21.6429L7.61991 21.1998C9.33444 20.6962 10.3162 18.8982 9.81266 17.1835L7.92644 17.7374C6.85358 18.0523 6.06774 18.8744 5.75319 19.8655C5.57825 18.727 5.50281 17.5732 5.52904 16.4239L7.2633 16.4128C9.05024 16.4013 10.4897 14.9435 10.4782 13.1565L8.5124 13.1691C7.23035 13.1773 6.12736 13.93 5.61055 15.0146C5.73 13.7312 5.98818 12.4645 6.37211 11.2376L8.06062 11.7101C9.78144 12.1916 11.5669 11.1871 12.0486 9.46623L10.1554 8.93641C8.90673 8.58696 7.62424 9.02009 6.83038 9.94142C7.30904 8.72939 7.91213 7.56635 8.62664 6.47593L10.1355 7.40528C11.6568 8.34265 13.6501 7.86898 14.5873 6.3476L12.9135 5.31658C11.788 4.62331 10.4045 4.70222 9.38126 5.40589C9.87033 4.76053 10.4008 4.14639 10.9692 3.56888C11.3054 3.84679 11.7648 3.98423 12.2801 3.86023C12.6898 3.7616 13.1 3.57083 13.4724 3.24067C15.26 1.65751 15.26 0.0708753 15.26 0.0708753C13.0683 -0.225683 11.698 0.452629 10.855 1.28334C10.1931 1.93542 10.3013 2.86694 10.8194 3.42667C10.0988 4.13143 9.44456 4.88605 8.85752 5.68142C9.29 4.30204 8.75303 2.75334 7.46577 1.96057L5.792 0.929551C4.85463 2.45093 5.3283 4.44425 6.84968 5.3814L8.39642 6.33437C7.60321 7.51085 6.94961 8.76602 6.43887 10.0721C6.32463 8.76906 5.42108 7.61187 4.087 7.23857L2.19384 6.70876C1.71237 8.42958 2.71694 10.215 4.43776 10.6967L6.05409 11.1491C5.63353 12.4429 5.34824 13.7772 5.2004 15.1264C4.69182 13.9916 3.54916 13.2042 2.22571 13.2127L0.259922 13.2252C0.271412 15.0122 1.72927 16.4516 3.51621 16.4401L5.10068 16.4299C5.03933 17.8386 5.12691 19.2542 5.36667 20.6479C4.57671 19.6171 3.20665 19.1237 1.88601 19.5115L0 20.0652C0.503586 21.7797 2.30158 22.7615 4.01633 22.2579L5.59928 21.7931C5.90776 23.1092 6.35563 24.398 6.94419 25.6345C5.91621 24.398 4.55222 24.917 3.44966 25.6157L1.78932 26.6681C2.74598 28.1776 4.74494 28.6257 6.25439 27.669L7.56983 26.8353C8.22039 27.9801 9.00038 29.0699 9.91151 30.0823C8.7617 29.767 7.48073 30.1015 6.63528 31.053L5.32916 32.5224C6.66476 33.7095 8.70989 33.5894 9.89721 32.2535L10.9189 31.1042C11.9553 32.0671 13.113 32.8948 14.3532 33.5737C13.0642 33.4781 11.7889 34.1658 11.196 35.4014L10.3455 37.1739C11.9566 37.9469 13.8895 37.2675 14.6625 35.6564L15.4065 34.1057C16.8386 34.7702 18.36 35.2451 19.9167 35.5122C20.2867 35.5738 20.73 35.6432 21.0908 35.6865C23.2018 35.9542 24.9211 36.55 26.5574 37.9224L27.162 37.1667C26.7397 36.8346 26.2964 36.5207 25.8264 36.2426L25.826 36.2423Z" />
            </svg>
          </div>
        </div>

        {/* --- Primary Narrative Section --- */}

        <h1
          ref={headlineRef}
          className="text-white font-bold leading-[0.9] tracking-tighter mb-4 w-full px-2"
          style={{ fontSize: "clamp(2.5rem, 12vw, 7.5rem)" }}
        >
          <div className="word opacity-0 block">We Create</div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-8 mt-2 w-full">
            <span className="block w-full md:w-auto text-center md:inline-block">
              Category
            </span>
            <div className="flex items-center justify-center gap-3 md:gap-8 w-full md:w-auto">
              {/* Dynamic Image Anchor: Links the headline visually to the background theme */}
              <div className="inline-flex shrink-0 w-[0.8em] aspect-square rounded-[15%] overflow-hidden bg-white/10 shadow-2xl relative">
                <Image
                  src={heroImage}
                  alt="Current Session Theme"
                  fill
                  priority
                  sizes="(max-width: 768px) 15vw, 10vw"
                  className="object-cover"
                />
              </div>
              <span>Leaders</span>
            </div>
          </div>
        </h1>

        <h2
          ref={subRef}
          className="text-white/90 text-xl md:text-xl font-normal py-10 opacity-0"
        >
          on every searchable platform
        </h2>

        {/* Platform Integration Grid: Social Proof of Cross-Platform Mastery */}
        <div
          ref={platformsRef}
          className="hidden lg:flex items-center justify-center flex-nowrap gap-8 xl:gap-12 max-w-none px-4 mt-16"
        >
          {platforms.map((p) => (
            <div
              key={p.name}
              className="platform-item opacity-0 group flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="relative w-24 h-8 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 20vw, 10vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Footer / Conversion Anchor --- */}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between px-6 pb-8 gap-4">
        <p className="hidden lg:block text-white/60 text-xs max-w-100 leading-relaxed text-left">
          Organic media planners creating, distributing & optimising
          <br />
          <strong className="text-white/80">search-first</strong> content for
          SEO, Social, PR, Ai and LLM search
        </p>
        <p className="text-white/60 text-[10px] md:text-xs text-center lg:text-right w-full lg:w-auto leading-relaxed">
          4 Global Offices serving
          <br />
          <span className="text-white/80 font-medium">
            UK, USA (New York) & EU
          </span>
        </p>
      </div>
    </section>
  );
}
