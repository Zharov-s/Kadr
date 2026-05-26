import TiltText from "../components/TiltText";
import Page1Bottom from "../components/Page1Bottom";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Page1 = () => {
  const tiltRef = useRef(null);
  const [xVal, setxVal] = useState(0);
  const [yVal, setyVal] = useState(0);

  const mouseMoveHandler = (dets) => {
    setxVal(
      (dets.clientX -
        tiltRef.current.getBoundingClientRect().x -
        tiltRef.current.getBoundingClientRect().width / 2) /
        10
    );
    setyVal(
      (dets.clientY -
        tiltRef.current.getBoundingClientRect().y -
        tiltRef.current.getBoundingClientRect().height / 2) /
        5
    );
  };

  useGSAP(() => {
    gsap.to(tiltRef.current, {
      scale:1.105,
      rotateX: yVal,
      rotateY: xVal,
      duration: 1,
      ease: "power4.out",
    });
  }, [xVal, yVal]); 

  return (
    <div
      onMouseMove={mouseMoveHandler}
      className="w-full h-screen bg-white p-5 relative"
    >
      <div
        className="shadow-xl shadow-gray-700 w-full h-full rounded-[50px] bg-center bg-cover"
        style={{ backgroundImage: 'url("../../images/featuredWorks/psicho.jpg")' }}
      >
        <TiltText tiltRef={tiltRef} />
        <Page1Bottom />
      </div>
    </div>
  );
};

export default Page1;
