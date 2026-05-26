import React from "react";

const SpinningBadge = ({
  text = "WANT IT TO SOUND PLAYFUL, LUXURIOUS, OR MORE/ ",
  imageSrc,
  className = "",
}) => {
  return (
    <div className={`shrink-0 ${className}`}>
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg
          className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite] text-zinc-500"
          viewBox="0 0 100 100"
        >
          <defs>
            <path
              id="textCircle"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
          </defs>
          <text
            className="text-[9.5px] font-funnel uppercase tracking-[0.2em]"
            fill="currentColor"
          >
            <textPath href="#textCircle" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
        <span className="relative z-10 flex items-center justify-center bg-black rounded-full p-2">
          {imageSrc && (
            <img
              className="h-10 w-10 object-contain"
              src={imageSrc}
              alt="Badge Icon"
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default SpinningBadge;
