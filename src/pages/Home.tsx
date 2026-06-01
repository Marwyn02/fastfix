import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/home/HeroSection";
import PageTransition from "@/components/PageTransition";
import Navigation from "@/components/nav/Navigation";
import Trust from "@/components/section/Trust";
import Services from "./Services";
import Process from "@/components/section/Process";
import Metrics from "@/components/section/Metrics";
import Testimony from "@/components/section/Testimony";
import Faq from "@/components/section/Faq";
import CallToAction from "@/components/section/CallToAction";
import Footer from "@/components/nav/Footer";
import Contact from "./Contact";


export default function Home() {
  return (
        <PageTransition>
      <CustomCursor />
      {/* <LiquidBackground /> */}
      <Navigation />
      {/* <SideNavigation /> */}
      <main className="relative z-10">
        <HeroSection />
        <Metrics />
        <Trust />
        <img src="/image/image-home-1.jpg" alt="Home Image 1" className="w-full h-[500px] object-cover" />
        <Services />
        <Process />
        <Testimony />
        <Faq />
        <CallToAction />
        <Contact />
        <Footer />
        
      </main>
    </PageTransition>
  );
}