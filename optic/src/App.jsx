import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollectionSection from "@/components/CollectionSection";
import VideoSection from "@/components/VideoSection";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import HeritageSection from "@/components/HeritageSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StoresSection from "@/components/StoresSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import AmbientBackground from "@/components/AmbientBackground";
import ShowcaseSection from "@/components/ShowcaseSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import InteractiveVisionSection from "@/components/InteractiveVisionSection";
import FooterBanner from "@/components/FooterBanner";
import HomeLink from "@/components/HomeLink";

const queryClient = new QueryClient();
const routerBase = import.meta.env.BASE_URL.startsWith("/")
  ? import.meta.env.BASE_URL.replace(/\/$/, "")
  : "";

function Home() {
  return (
    <SmoothScroll>
      <div className="bg-[#050505] min-h-screen overflow-clip noise">
        <HomeLink />
        <Navbar />
        <HeroSection />
        <InteractiveVisionSection />
        <ShowcaseSection />
        <CollectionSection />
        <HorizontalScrollSection />
        <VideoSection />
        <CraftsmanshipSection />
        <HeritageSection />
        <TestimonialsSection />
        <StoresSection />
        <ContactSection />
        <FooterBanner />
        <Footer />
      </div>
    </SmoothScroll>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Preloader />
        <WouterRouter base={routerBase}>
          <AmbientBackground />
          <CustomCursor />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
