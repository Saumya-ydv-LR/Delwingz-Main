
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuHighlights from "@/components/MenuHighlights";
import FeaturesSection from "@/components/FeaturesSection";
import BestsellersSection from "@/components/BestsellersSection";
import StickyFooterCTA from "@/components/StickyFooterCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div id="menu">
        <MenuHighlights />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <BestsellersSection />
      <StickyFooterCTA />
      
      {/* Add padding bottom to account for sticky footer */}
      <div className="h-20"></div>
    </div>
  );
};

export default Index;
