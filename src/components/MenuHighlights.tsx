
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MenuHighlights = () => {
  const menuItems = {
    chicken: [
      {
        name: "Butter Chicken Kit",
        description: "Rich, creamy butter chicken with authentic spices",
        price: "₹299",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
        rating: "4.8"
      },
      {
        name: "Tandoori Wings",
        description: "Smoky tandoori marinated chicken wings",
        price: "₹199",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400",
        rating: "4.7"
      }
    ],
    seafood: [
      {
        name: "Prawn Curry Bowl",
        description: "Fresh prawns in coconut curry sauce",
        price: "₹399",
        image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400",
        rating: "4.9"
      },
      {
        name: "Fish Fry Special",
        description: "Crispy fried fish with coastal spices",
        price: "₹249",
        image: "https://images.unsplash.com/photo-1544943045-6f3c4d4f2bb0?w=400",
        rating: "4.6"
      }
    ],
    readyToCook: [
      {
        name: "Marinated Mutton",
        description: "Premium mutton pieces, ready to cook",
        price: "₹549",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400",
        rating: "4.8"
      },
      {
        name: "Spiced Chicken Breast",
        description: "Pre-marinated chicken breast fillets",
        price: "₹329",
        image: "https://images.unsplash.com/photo-1532636721046-8e4bb70a70be?w=400",
        rating: "4.7"
      }
    ]
  };

  return (
    <section id="menu" className="py-20 bg-delwingz-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold delwingz-black mb-4">
            CHOOSE FAVORITES
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium non-veg delicacies from across India
          </p>
        </div>

        <Tabs defaultValue="chicken" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-secondary">
            <TabsTrigger value="chicken" className="text-lg font-semibold">Chicken</TabsTrigger>
            <TabsTrigger value="seafood" className="text-lg font-semibold">Seafood</TabsTrigger>
            <TabsTrigger value="readyToCook" className="text-lg font-semibold">Ready-to-Cook</TabsTrigger>
          </TabsList>

          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category} className="animate-fade-up">
              <div className="grid md:grid-cols-2 gap-8">
                {items.map((item, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-2 hover:border-delwingz-red/20">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-delwingz-red text-delwingz-off-white">
                        ★ {item.rating}
                      </Badge>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
                          <CardDescription className="mt-2">{item.description}</CardDescription>
                        </div>
                        <div className="text-2xl font-bold delwingz-red">{item.price}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-delwingz-red hover:bg-delwingz-red/90 text-delwingz-off-white">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MenuHighlights;
