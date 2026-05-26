import React from "react";
import Navbar from "../components/Common/Navbar";
import Hero from "../Section/Hero";
import BlurOverlay from "../components/Common/BlurOverlay";
import CustomCursor from "../components/Common/CustomCursor";
import IntroSection from "../Section/IntroSection";
import PortfolioSection from "../Section/PortfolioSection";
import ExpertiseSection from "../Section/ExpertiseSection";
import FunFactsSection from "../Section/FunFactsSection";
import ClientLogosSection from "../Section/ClientLogosSection";
import UserFeedbackSection from "../Section/UserFeedbackSection";
import ContactSection from "../Section/ContactSection";
import AwardsSection from "../Section/AwardsSection";
import AvengersSection from "../Section/AvengersSection";
import FaqSection from "../Section/FaqSection";
import InsightsSection from "../Section/InsightsSection";
import Footer from "../components/Common/Footer";
import ParticleHero from "../components/Common/ParticleLogo";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  return (
    <div className="relative bg-white w-full">
      <CustomCursor />
      <ScrollToTop />
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-100">
        <Navbar />
      </header>

      <main className="relative flex flex-col w-full">
        <div className="relative z-0 bg-white">
          <Hero />
          <IntroSection />
          <PortfolioSection />
        </div>

        <section className="sticky z-10 w-full bg-white shadow-2xl rounded-t-[3rem]">
          <ExpertiseSection />
        </section>
        <section className="sticky z-60 w-full bg-white shadow-[0_-30px_60px_rgba(0,0,0,0.2)] rounded-t-[3rem]">
          <FunFactsSection />
          <ClientLogosSection />
          <UserFeedbackSection />
          <ContactSection />
          <AwardsSection />
          <AvengersSection />
          <FaqSection />
          <InsightsSection />
        </section>
        <BlurOverlay />
      </main>
      <ParticleHero></ParticleHero>
      <Footer />
    </div>
  );
};

export default Home;
