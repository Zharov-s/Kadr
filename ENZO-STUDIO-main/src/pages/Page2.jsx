import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


const Page2 = () => {
    gsap.registerPlugin(ScrollTrigger);
    
    useGSAP(()=>{
        gsap.from(".rotateText", {
            transform:"rotateX(-80deg)",
            duration:3,
            scale:0.01,
            opacity:0,
            stagger:0.1,
            scrollTrigger:{
                trigger:".rotateText",
                markers:false,
                start:"top 60%",
                end:"top -250%",
                scrub:2
            }
        })
    })
  return (
    <div id="section2" className="w-full min-h-screen text-center p-20 flex flex-col items-center justify-center">
      <h1 className="mt-10 text-gray-600 font-[thin] text-center text-2xl">Психологическое консультирование для взрослых · Москва / онлайн</h1>
      <div className="rotateText">
        <h1 className="text-[42vw] tracking-loose text-black font-[regular] uppercase leading-[35vw]">сначала</h1>
      </div>
      <div className="rotateText">
        <h1 className="text-[42vw] tracking-loose text-black font-[regular] uppercase leading-[35vw]">становится</h1>
      </div>
      <div className="rotateText">
        <h1 className="text-[42vw] tracking-loose text-black font-[regular] uppercase leading-[35vw]">понятнее</h1>
      </div>
      <div className="rotateText">
        <h1 className="text-[42vw] tracking-loose text-black font-[regular] uppercase leading-[35vw]">потом</h1>
      </div>
      <div className="rotateText">
        <h1 className="text-[42vw] tracking-loose text-black font-[regular] uppercase leading-[35vw]">становится</h1>
      </div>
      <div className="rotateText">
        <h1 className="text-[42vw] tracking-loose text-black font-[regular] uppercase leading-[35vw]">легче</h1>
      </div>

      <img src="./image.png" alt="Психолог онлайн" />
      <div className="w-1/4 border-[1px] mt-10 border-solid border-black mx-auto"></div>
    </div>
  );
};

export default Page2;
