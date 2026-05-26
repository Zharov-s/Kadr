import React from "react";

const BlurOverlay = () => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-24 lg:h-32 z-70 pointer-events-none backdrop-blur-md"
      style={{
        maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
      }}
    />
  );
};

export default BlurOverlay;
