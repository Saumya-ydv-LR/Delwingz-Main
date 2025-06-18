
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const StickyFooterCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-delwingz-red p-4 border-t-4 border-delwingz-black">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <Button 
            size="lg" 
            className="bg-delwingz-black hover:bg-delwingz-black/90 text-delwingz-off-white rounded-full px-8 py-4 text-xl font-bold flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 bg-delwingz-red rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-delwingz-off-white" />
            </div>
            <span className="font-display text-2xl">51011 — ORDER NOW</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyFooterCTA;
