import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import reelImage from "../assets/modal_image.jpg";

const PlayIcon = () => (
  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shrink-0">
    <svg
      viewBox="0 0 24 24"
      fill="white"
      className="w-5 h-5 ml-[2px]"
      aria-hidden="true"
    >
      <path d="M8 5.14v13.72c0 .78.84 1.26 1.5.86l10.5-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  </div>
);

const ReelButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-3 rounded-full bg-white pr-6 pl-2 py-2 shadow-lg"
      aria-label="Play reel"
      type="button"
    >
      <PlayIcon />
      <span className="text-sm font-medium uppercase text-black">
        Play Reel
      </span>
    </button>
  );
};

const YoutubeModal = ({ isOpen, onClose, youtubeId }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-black text-lg font-medium"
              aria-label="Close video"
              type="button"
            >
              ×
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ReelPreviewSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="w-full bg-[#f5f5f5] py-8 lg:py-12">
        <div className="max-w-[95%] lg:max-w-[90%] mx-auto">
          <div
            className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.2rem] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.img
              src={reelImage}
              alt="Reel preview"
              className="w-full h-[300px] sm:h-[420px] md:h-[560px] lg:h-[640px] object-cover"
              animate={{
                scale: isHovered ? 1.04 : 1,
                filter: isHovered ? "blur(7px)" : "blur(0px)",
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="absolute inset-0 bg-black"
              animate={{ opacity: isHovered ? 0.12 : 0 }}
              transition={{ duration: 0.35 }}
            />

            <AnimatePresence>
              {!isHovered && (
                <motion.div
                  className="absolute left-6 bottom-6 lg:left-10 lg:bottom-10 z-20"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.25 }}
                >
                  <ReelButton onClick={() => setIsOpen(true)} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <ReelButton onClick={() => setIsOpen(true)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <YoutubeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        youtubeId="SF4aHwxHtZ0"
      />
    </>
  );
};

export default ReelPreviewSection;
