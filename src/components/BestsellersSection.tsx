
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Clock } from "lucide-react";

const BestsellersSection = () => {
  const bestsellers = [
    {
      name: "Shrimp Bowl",
      price: "₹349",
      originalPrice: "₹399",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1633504581786-316c8002b1b4?w=400",
      tag: "Most Popular",
      discount: "12% OFF"
    },
    {
      name: "Butter Chicken Kit",
      price: "₹299",
      originalPrice: "₹349",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
      tag: "Chef's Special",
      discount: "15% OFF"
    },
    {
      name: "Marinated Wings",
      price: "₹199",
      originalPrice: "₹249",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400",
      tag: "Trending",
      discount: "20% OFF"
    },
    {
      name: "Fish Curry",
      price: "₹279",
      originalPrice: "₹319",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400",
      tag: "Coastal Special",
      discount: "10% OFF"
    }
  ];

  return (
    <section id="bestsellers" className="py-20 bg-delwingz-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-delwingz-red/10 text-delwingz-red border-delwingz-red/20 mb-4">
            Bestsellers
          </Badge>
          <h2 className="text-5xl md:text-6xl font-display font-bold delwingz-red mb-4">
            INSTAGRAM POPULARS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our most loved dishes that are breaking the internet and winning hearts across Rajasthan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-delwingz-red/30 hover:-translate-y-3 group bg-white"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-delwingz-red text-delwingz-off-white">
                  {item.tag}
                </Badge>
                <Badge className="absolute top-3 right-3 bg-delwingz-black text-delwingz-off-white">
                  ★ {item.rating}
                </Badge>
                <Badge className="absolute bottom-3 left-3 bg-green-500 text-white">
                  {item.discount}
                </Badge>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-delwingz-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg group-hover:text-delwingz-red transition-colors">
                  {item.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  25-30 mins
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold delwingz-red">{item.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                  </div>
                </div>
                <Button className="w-full bg-delwingz-black hover:bg-delwingz-black/90 text-delwingz-off-white group-hover:bg-delwingz-red group-hover:text-white transition-all duration-300">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Quick Add
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-delwingz-red hover:bg-delwingz-red/90 text-delwingz-off-white px-12 py-6 text-lg rounded-full font-semibold"
          >
            View All Menu Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestsellersSection;
