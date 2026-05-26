import React from "react";
import hero_video from "../assets/hero-video.mp4";
import profile_img from "../assets/profile.jpg";
import ParallaxImage from "../components/Common/ParallaxImage";

const Hero = () => {
  return (
    <section className="relative max-w-[95%] lg:max-w-[98%] mx-auto min-h-[100vh] lg:h-[95vh] rounded-[2rem] overflow-hidden mt-4 lg:mt-6">
      <video
        src={hero_video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full h-full p-6 sm:p-8 lg:p-16 flex flex-col lg:flex-row justify-between items-start lg:items-end pb-5 lg:pb-24 gap-12">
        <h1 className="flex flex-col font-funnel pointer-events-none">
          <span className="text-[88px] mt-8 min-[390px]:text-[100px] md:text-[180px] lg:text-[220px] font-bold text-white leading-none tracking-tight">
            Floka
          </span>
          <span className="text-[36px] mt-8 min-[390px]:text-[48px] md:text-[72px] lg:text-[96px] font-normal text-white/30 leading-none ml-12 min-[390px]:ml-16 md:ml-48 lg:ml-64 -mt-2 min-[390px]:-mt-4 md:-mt-8">
            Studio
          </span>
        </h1>

        <div className="flex flex-col gap-6 w-full max-w-[320px] sm:max-w-md pointer-events-auto shrink-0 mb-4 lg:mb-0">
          <div className="bg-white rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-stretch shadow-2xl">
            <ParallaxImage
              src={profile_img}
              containerClass="bg-black rounded-3xl"
              scale={1.03}
            />

            <div className="flex flex-col justify-between py-1 w-full text-left">
              <div>
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
                  Head of Idea
                </span>
                <h3 className="text-black font-funnel text-xl md:text-2xl font-bold mt-1">
                  Almond D. Nelsi
                </h3>
              </div>

              <button className="group flex items-center justify-start gap-4 mt-6 sm:mt-auto cursor-pointer">
                <div
                  data-cursor=""
                  className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:group-hover:rotate-90"
                >
                  <span className="text-lg leading-none mb-0.5">+</span>
                </div>

                <span className="text-black font-bold text-sm tracking-wide">
                  LET'S TALK
                </span>
              </button>
            </div>
          </div>

          <div className="pl-2">
            <p className="text-white font-medium text-lg lg:text-xl">
              No cookie-cutter websites. No fluff.
            </p>
            <p className="text-white/60 text-sm lg:text-base mt-2 leading-relaxed">
              Just real tools and smart strategies to grow your business and
              elevate your brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
