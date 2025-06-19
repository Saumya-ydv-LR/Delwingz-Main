import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuHighlights from "@/components/MenuHighlights";
import FeaturesSection from "@/components/FeaturesSection";
import BestsellersSection from "@/components/BestsellersSection";
import StickyFooterCTA from "@/components/StickyFooterCTA";

const Index = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    const token = document.cookie.match(/accessToken=([^;]+)/);
    if (token) {
      navigate("/user-dashboard");
    } else {
      alert("Please log in first to access your dashboard.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />

      {/* ✅ Dashboard Button after Hero */}
      <div className="flex justify-center my-6">
        <button
          onClick={handleDashboardClick}
          className="bg-[#e63946] text-white px-6 py-3 rounded-lg hover:bg-[#d62828] transition"
        >
          Go to Dashboard
        </button>
      </div>

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
