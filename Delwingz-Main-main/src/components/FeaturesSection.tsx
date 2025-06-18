
import { Clock, Home, Phone, ShoppingCart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Lightning-fast delivery within 30 minutes to your doorstep"
    },
    {
      icon: Home,
      title: "Farm-to-Fork Freshness",
      description: "Direct sourcing from trusted farms ensuring maximum freshness"
    },
    {
      icon: Phone,
      title: "AI-Powered Tracking",
      description: "Real-time order tracking with smart delivery predictions"
    },
    {
      icon: ShoppingCart,
      title: "Premium Quality",
      description: "Hand-selected premium ingredients with quality guarantee"
    }
  ];

  return (
    <section className="py-20 bg-delwingz-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold delwingz-off-white mb-4">
            WHAT MAKES US
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold delwingz-red">
            DIFFERENT
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-2xl bg-delwingz-off-white/5 backdrop-blur-sm hover:bg-delwingz-off-white/10 transition-all duration-300 animate-fade-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-delwingz-red rounded-full">
                  <feature.icon className="w-8 h-8 text-delwingz-off-white" />
                </div>
              </div>
              <h4 className="text-xl font-bold delwingz-off-white mb-3">
                {feature.title}
              </h4>
              <p className="text-delwingz-off-white/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
