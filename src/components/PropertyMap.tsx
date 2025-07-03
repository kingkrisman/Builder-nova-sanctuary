import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/data";
import {
  Map,
  MapPin,
  ZoomIn,
  ZoomOut,
  Layers,
  Navigation,
  Filter,
} from "lucide-react";

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertySelect: (property: Property) => void;
}

export function PropertyMap({
  properties,
  selectedProperty,
  onPropertySelect,
}: PropertyMapProps) {
  const [mapView, setMapView] = useState<"satellite" | "street">("street");
  const [showFilters, setShowFilters] = useState(false);

  // Mock coordinates for Nigerian locations
  const locationCoordinates: { [key: string]: { lat: number; lng: number } } = {
    "Lekki Phase 1, Lagos": { lat: 6.4431, lng: 3.5566 },
    "Victoria Island, Lagos": { lat: 6.4281, lng: 3.4219 },
    "Ikeja, Lagos": { lat: 6.6018, lng: 3.3515 },
    "Mowe, Ogun State": { lat: 6.7804, lng: 3.4329 },
    "Gwarimpa, Abuja": { lat: 9.13, lng: 7.4165 },
    "Magodo, Lagos": { lat: 6.5664, lng: 3.3739 },
    "Ikoyi, Lagos": { lat: 6.4549, lng: 3.4316 },
    "Yaba, Lagos": { lat: 6.5039, lng: 3.378 },
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    }
    return `₦${price.toLocaleString()}`;
  };

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case "Residential":
        return "🏠";
      case "Commercial":
        return "🏢";
      case "Land":
        return "🟫";
      default:
        return "📍";
    }
  };

  return (
    <Card className="w-full h-[600px] relative overflow-hidden">
      <CardHeader className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            Property Locations
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setMapView(mapView === "street" ? "satellite" : "street")
              }
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-full">
        {/* Mock Map Container */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage:
              mapView === "satellite"
                ? "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxyZWN0IGZpbGw9IiNmMGY0ZjgiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+PHBhdGggZD0iTTAgMGgxMDB2MTAwSDBWMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTdmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')"
                : "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxyZWN0IGZpbGw9IiNmOWZhZmIiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIi8+PHBhdGggZD0iTTAgMGgxMDB2MTAwSDBWMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YzZjRmNiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')",
          }}
        >
          {/* Property Markers */}
          {properties.map((property, index) => {
            const isSelected = selectedProperty?.id === property.id;

            // Better distribution of markers across the map
            const positions = [
              { left: "25%", top: "30%" },
              { left: "45%", top: "25%" },
              { left: "65%", top: "35%" },
              { left: "35%", top: "50%" },
              { left: "55%", top: "45%" },
              { left: "75%", top: "55%" },
              { left: "15%", top: "65%" },
              { left: "50%", top: "70%" },
            ];

            const position =
              positions[index % positions.length] || positions[0];

            return (
              <div
                key={property.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                  isSelected ? "scale-125 z-20" : "hover:scale-110 z-10"
                }`}
                style={{
                  left: position.left,
                  top: position.top,
                }}
                onClick={() => onPropertySelect(property)}
              >
                {/* Property Marker */}
                <div
                  className={`relative ${isSelected ? "animate-bounce" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-lg border-2 ${
                      isSelected
                        ? "bg-primary border-black scale-125"
                        : "bg-white border-primary hover:bg-primary hover:border-black"
                    }`}
                  >
                    {getPropertyIcon(property.type)}
                  </div>

                  {/* Property Preview Card */}
                  {isSelected && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl border p-3 z-50">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                        {property.title}
                      </h4>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {property.status}
                        </Badge>
                        <span className="font-bold text-primary">
                          {formatPrice(property.price)}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.location}
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-2 bg-primary text-black hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`/properties/${property.id}`, "_blank");
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Map Controls */}
          <div className="absolute top-20 right-4 flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/95 hover:bg-white border-gray-300 shadow-md"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/95 hover:bg-white border-gray-300 shadow-md"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/95 hover:bg-white border-gray-300 shadow-md"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg p-3 shadow-lg">
            <h5 className="font-semibold text-sm mb-2">Property Types</h5>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span>🏠</span>
                <span>Residential</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🏢</span>
                <span>Commercial</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🟫</span>
                <span>Land</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
