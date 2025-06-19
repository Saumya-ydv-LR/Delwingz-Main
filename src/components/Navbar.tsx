// src/components/Navbar.tsx
import { Button } from "@/components/ui/button";
import { Menu, Phone, MapPin, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-delwingz-off-white/95 backdrop-blur-sm border-b border-border shadow-lg">
      {/* 🔽 Reduced h-20 to h-16 */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* ✅ Logo Image (clickable) */}
        <img
          src="/Delwingz-logo.png"
          alt="Delwingz Logo"
          className="h-16 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-delwingz-black hover:text-delwingz-red transition-colors font-medium">
            Home
          </a>
          <a href="#menu" className="text-delwingz-black hover:text-delwingz-red transition-colors font-medium">
            Menu
          </a>
          <a href="#features" className="text-delwingz-black hover:text-delwingz-red transition-colors font-medium">
            Why Us
          </a>
          <a href="#bestsellers" className="text-delwingz-black hover:text-delwingz-red transition-colors font-medium">
            Bestsellers
          </a>
          <a href="#contact" className="text-delwingz-black hover:text-delwingz-red transition-colors font-medium">
            Contact
          </a>
          <div className="flex items-center text-delwingz-black text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            Rajasthan
          </div>
        </div>

        {/* Right-side Buttons */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center text-delwingz-black text-sm font-medium">
            <Phone className="w-4 h-4 mr-2" />
            997995795
          </div>

          {/* ✅ Show login only if not logged in */}
          {!isLoggedIn && (
            <Link to="/login">
              <Button className="hidden md:inline-flex bg-delwingz-red hover:bg-delwingz-red/90 text-delwingz-off-white px-6 py-3 text-lg rounded-lg">
                Login
              </Button>
            </Link>
          )}

          {/* ☰ Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>

          {/* ✅ Show User Icon if logged in */}
          {isLoggedIn && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() => navigate("/dashboard")}
            >
              <User className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
