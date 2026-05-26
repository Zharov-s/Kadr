import AboutMission from "@/components/home/AboutMission";
import ClientLogos from "@/components/home/ClientLogos";
import FeaturedWork from "@/components/home/FeaturedWork";
import HeroSection from "@/components/home/HeroSection";
import InfiniteMarquee from "@/components/home/InfiniteMarquee";
import LegacyAccordion from "@/components/home/LegacyAccordion";
import ReadyToRise from "@/components/home/ReadyToRise";
import Service from "@/components/home/Service";
import WhatsNew from "@/components/home/WhatsNew";

export default function Home() {
  return (
    <>
      {/* 1. Impact & Credibility Layer */}
      <HeroSection />
      <ClientLogos />

      {/* 2. Philosophy & Expertise */}
      <AboutMission />
      <FeaturedWork />
      <Service />

      {/* 3. Social Proof & Authority */}
      <InfiniteMarquee />
      <LegacyAccordion />

      {/* 4. Insights & Conversion */}
      <WhatsNew />
      <ReadyToRise />
    </>
  );
}
