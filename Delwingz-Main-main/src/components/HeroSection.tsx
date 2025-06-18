
import { Button } from "@/components/ui/button";
import { Star, Clock, Truck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-delwingz-red flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-delwingz-red via-delwingz-red to-red-700"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-delwingz-black/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-delwingz-off-white/20 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-delwingz-off-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl">
          <div className="animate-fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-delwingz-black/20 rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-delwingz-off-white font-semibold">4.8 Rating</span>
              </div>
              <div className="flex items-center bg-delwingz-black/20 rounded-full px-4 py-2">
                <Truck className="w-5 h-5 text-delwingz-off-white mr-2" />
                <span className="text-delwingz-off-white font-semibold">30 Min Delivery</span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-delwingz-off-white leading-none mb-6">
              REVOLUTIONIZING
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-delwingz-black leading-none mb-8">
              INDIA'S ONLINE<br />
              NON‑VEG FOOD<br />
              <span className="text-delwingz-off-white">DELIVERY</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-delwingz-off-white/90 mb-8 max-w-2xl">
              From farm-fresh ingredients to your doorstep in 30 minutes. Experience the future of non-veg food delivery in Rajasthan.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-fade-up" style={{animationDelay: '0.2s'}}>
            <Button 
              size="lg" 
              className="bg-delwingz-black hover:bg-delwingz-black/90 text-delwingz-off-white text-lg px-8 py-6 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Clock className="w-5 h-5 mr-2" />
              Order Now
            </Button>
            <Button 
              size="lg" 
              className="bg-delwingz-black hover:bg-delwingz-black/90 text-delwingz-off-white text-lg px-8 py-6 rounded-full font-semibold border-2 border-delwingz-black transform hover:scale-105 transition-all duration-300"
            >
              Explore Menu
            </Button>
          </div>
          
          <div className="flex items-center gap-8 mt-12 animate-fade-up" style={{animationDelay: '0.4s'}}>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-delwingz-off-white">10K+</div>
              <div className="text-delwingz-off-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-delwingz-off-white">50+</div>
              <div className="text-delwingz-off-white/80">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-delwingz-off-white">5</div>
              <div className="text-delwingz-off-white/80">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
