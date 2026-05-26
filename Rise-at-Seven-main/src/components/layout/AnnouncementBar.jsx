"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const AnnouncementBar = () => {
  const [hideAnnouncementBar, setHideAnnouncementBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHideAnnouncementBar(true);
      } else {
        setHideAnnouncementBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`pt-2.5 px-2.5 w-full transition-opacity duration-300 relative z-60 ${
        hideAnnouncementBar ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Link
        href="https://riseatseven.com/multi-channel-search-report-2026-/"
        className="group flex justify-center relative items-center text-xs w-full py-2 px-5 text-center tracking-tight leading-none font-semibold rounded-[20px] transition-all duration-300 lg:text-sm hover:rounded-md bg-[#B2F6E3] text-gray-900"
      >
        <div className="relative overflow-hidden h-4">
          <div className="transition-transform duration-300 group-hover:-translate-y-6">
            🚨 The Category Leaderboard - Live Now
          </div>
          <div className="transition-transform duration-300 absolute top-0 left-0 translate-y-6 group-hover:translate-y-0">
            🚨 The Category Leaderboard - Live Now
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AnnouncementBar;
