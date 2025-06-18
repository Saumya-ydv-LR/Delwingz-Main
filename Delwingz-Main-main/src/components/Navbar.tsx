// src/components/Navbar.tsx
import { Button } from "@/components/ui/button";
import { Menu, Phone, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ For routing

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-delwingz-off-white/95 backdrop-blur-sm border-b border-border shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-display font-bold delwingz-red">
          DELWINGZ
        </div>

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

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center text-delwingz-black text-sm font-medium">
            <Phone className="w-4 h-4 mr-2" />
            6969
          </div>

          {/* ✅ LOGIN BUTTON LINKS TO /login */}
          <Link to="/login">
            <Button className="hidden md:inline-flex bg-delwingz-red hover:bg-delwingz-red/90 text-delwingz-off-white">
              Login
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
