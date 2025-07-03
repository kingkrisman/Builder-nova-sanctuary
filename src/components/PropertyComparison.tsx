import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/data";
import {
  X,
  Scale,
  MapPin,
  Bed,
  Bath,
  Car,
  Ruler,
  Calendar,
  DollarSign,
} from "lucide-react";

interface PropertyComparisonProps {
  properties: Property[];
  onRemoveProperty: (id: number) => void;
  onClose: () => void;
}

export function PropertyComparison({
  properties,
  onRemoveProperty,
  onClose,
}: PropertyComparisonProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    }
    return `₦${price.toLocaleString()}`;
  };

  const getComparisonData = () => {
    return [
      {
        label: "Price",
        icon: DollarSign,
        getValue: (p: Property) => formatPrice(p.price),
      },
      {
        label: "Location",
        icon: MapPin,
        getValue: (p: Property) => p.location,
      },
      {
        label: "Type",
        icon: Scale,
        getValue: (p: Property) => p.type,
      },
      {
        label: "Size",
        icon: Ruler,
        getValue: (p: Property) => p.size,
      },
      {
        label: "Bedrooms",
        icon: Bed,
        getValue: (p: Property) => p.bedrooms || "N/A",
      },
      {
        label: "Bathrooms",
        icon: Bath,
        getValue: (p: Property) => p.bathrooms || "N/A",
      },
      {
        label: "Parking",
        icon: Car,
        getValue: (p: Property) => p.parking || "N/A",
      },
      {
        label: "Year Built",
        icon: Calendar,
        getValue: (p: Property) => p.yearBuilt || "N/A",
      },
    ];
  };

  const comparisonData = getComparisonData();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Property Comparison
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {/* Property Headers */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="hidden md:block"></div>
            {properties.map((property) => (
              <div key={property.id} className="text-center">
                <div className="relative mb-2">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => onRemoveProperty(property.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <h3 className="font-semibold text-sm line-clamp-2">
                  {property.title}
                </h3>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {property.status}
                </Badge>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="space-y-4">
            {comparisonData.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-b"
              >
                <div className="flex items-center gap-2 font-medium">
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </div>
                {properties.map((property) => (
                  <div key={property.id} className="text-center md:text-left">
                    {item.getValue(property)}
                  </div>
                ))}
              </div>
            ))}

            {/* Features Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-3 border-b">
              <div className="font-medium">Key Features</div>
              {properties.map((property) => (
                <div key={property.id}>
                  <div className="space-y-1">
                    {property.features.slice(0, 5).map((feature) => (
                      <div
                        key={feature}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {feature}
                      </div>
                    ))}
                    {property.features.length > 5 && (
                      <div className="text-xs text-muted-foreground">
                        +{property.features.length - 5} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            {properties.map((property) => (
              <Button
                key={property.id}
                className="bg-primary text-black hover:bg-primary/90"
                onClick={() =>
                  window.open(`/properties/${property.id}`, "_blank")
                }
              >
                View Details
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
