import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Property } from "@/lib/data";
import {
  MapPin,
  Bed,
  Bath,
  Car,
  Ruler,
  Phone,
  Mail,
  Heart,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`;
    }
    return `₦${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "For Sale":
        return "bg-green-500 hover:bg-green-600";
      case "For Rent":
        return "bg-blue-500 hover:bg-blue-600";
      case "Sold":
        return "bg-gray-500 hover:bg-gray-600";
      case "Rented":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-primary hover:bg-primary/90";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Residential":
        return "bg-blue-100 text-blue-800";
      case "Commercial":
        return "bg-purple-100 text-purple-800";
      case "Land":
        return "bg-green-100 text-green-800";
      case "Mixed-Use":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg h-full border-black/10 hover:border-primary group",
        className,
      )}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 10}>
          <img
            src={property.imageUrl}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>

        {/* Status and Type Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className={`text-white ${getStatusColor(property.status)}`}>
            {property.status}
          </Badge>
          <Badge variant="secondary" className={getTypeColor(property.type)}>
            {property.type}
          </Badge>
        </div>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Price */}
        <div className="absolute bottom-2 left-2">
          <div className="bg-black/80 text-white px-3 py-1 rounded-md">
            <span className="text-lg font-bold">
              {formatPrice(property.price)}
              {property.status === "For Rent" && "/year"}
            </span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{property.location}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Property Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {property.bedrooms && (
            <div className="flex items-center text-muted-foreground">
              <Bed className="h-4 w-4 mr-1 text-primary" />
              <span>
                {property.bedrooms} Bed{property.bedrooms > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center text-muted-foreground">
              <Bath className="h-4 w-4 mr-1 text-primary" />
              <span>
                {property.bathrooms} Bath{property.bathrooms > 1 ? "s" : ""}
              </span>
            </div>
          )}
          <div className="flex items-center text-muted-foreground">
            <Ruler className="h-4 w-4 mr-1 text-primary" />
            <span>{property.size}</span>
          </div>
          {property.parking && (
            <div className="flex items-center text-muted-foreground">
              <Car className="h-4 w-4 mr-1 text-primary" />
              <span>
                {property.parking} Space{property.parking > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 space-y-2">
        {/* Agent Info */}
        <div className="w-full text-xs text-muted-foreground border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">{property.agent.name}</span>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Phone className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Mail className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          className="w-full bg-primary text-black hover:bg-primary/90"
          size="sm"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
