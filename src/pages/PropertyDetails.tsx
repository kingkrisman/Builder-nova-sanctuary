import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { properties } from "@/lib/data";
import { VirtualTourModal } from "@/components/VirtualTourModal";
import { PropertyRecommendations } from "@/components/PropertyRecommendations";
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
  ArrowLeft,
  CheckCircle,
  Calendar,
  Building,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  Scale,
  Sparkles,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const property = properties.find((p) => p.id === parseInt(id || "0"));

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The property you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/properties">Back to Properties</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
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

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  return (
    <Layout>
      {/* Back Navigation */}
      <section className="py-4 bg-gray-50 mt-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Button>
        </div>
      </section>

      {/* Property Header */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <ScrollAnimation animation="animate-fade-up">
                <div className="flex gap-2 mb-4">
                  <Badge
                    className={`text-white ${getStatusColor(property.status)}`}
                  >
                    {property.status}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={getTypeColor(property.type)}
                  >
                    {property.type}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.address}</span>
                </div>
                <div className="text-3xl font-bold text-primary mb-4">
                  {formatPrice(property.price)}
                  {property.status === "For Rent" && (
                    <span className="text-lg">/year</span>
                  )}
                </div>
              </ScrollAnimation>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorited(!isFavorited)}
                className={isFavorited ? "text-red-500 border-red-500" : ""}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`}
                />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowVirtualTour(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
              >
                <Camera className="h-4 w-4 mr-2" />
                Virtual Tour
              </Button>
              <Button className="bg-primary text-black hover:bg-primary/90">
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="animate-fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Main Image */}
              <div className="lg:col-span-3">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                >
                  <AspectRatio ratio={16 / 10}>
                    <img
                      src={property.images[selectedImageIndex]}
                      alt={`${property.title} - Image ${selectedImageIndex + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </AspectRatio>
                  {property.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {selectedImageIndex + 1} / {property.images.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
                {property.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer ${
                      selectedImageIndex === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <AspectRatio ratio={1}>
                      <img
                        src={image}
                        alt={`${property.title} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </AspectRatio>
                    {index === 3 && property.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium rounded">
                        +{property.images.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <ScrollAnimation animation="animate-fade-up">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {property.bedrooms && (
                        <div className="text-center">
                          <Bed className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="font-medium">{property.bedrooms}</div>
                          <div className="text-sm text-muted-foreground">
                            Bedrooms
                          </div>
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="text-center">
                          <Bath className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="font-medium">
                            {property.bathrooms}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Bathrooms
                          </div>
                        </div>
                      )}
                      <div className="text-center">
                        <Ruler className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="font-medium">{property.size}</div>
                        <div className="text-sm text-muted-foreground">
                          Size
                        </div>
                      </div>
                      {property.parking && (
                        <div className="text-center">
                          <Car className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="font-medium">{property.parking}</div>
                          <div className="text-sm text-muted-foreground">
                            Parking
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              {/* Description */}
              <ScrollAnimation animation="animate-fade-up" delay={100}>
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {property.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              {/* Features & Amenities */}
              <ScrollAnimation animation="animate-fade-up" delay={200}>
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              {/* Property Details */}
              <ScrollAnimation animation="animate-fade-up" delay={300}>
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-medium mb-1">Property Type</div>
                        <div className="text-muted-foreground">
                          {property.type}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Status</div>
                        <div className="text-muted-foreground">
                          {property.status}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Location</div>
                        <div className="text-muted-foreground">
                          {property.location}
                        </div>
                      </div>
                      {property.yearBuilt && (
                        <div>
                          <div className="font-medium mb-1">Year Built</div>
                          <div className="text-muted-foreground">
                            {property.yearBuilt}
                          </div>
                        </div>
                      )}
                      {property.furnished !== undefined && (
                        <div>
                          <div className="font-medium mb-1">Furnished</div>
                          <div className="text-muted-foreground">
                            {property.furnished ? "Yes" : "No"}
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="font-medium mb-1">Listed Date</div>
                        <div className="text-muted-foreground">
                          {new Date(property.dateAdded).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agent Card */}
              <ScrollAnimation animation="animate-fade-left">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Agent</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="font-medium">{property.agent.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Property Agent
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-primary text-black hover:bg-primary/90"
                        asChild
                      >
                        <a href={`tel:${property.agent.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Agent
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`mailto:${property.agent.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email Agent
                        </a>
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>📞 {property.agent.phone}</div>
                      <div>✉️ {property.agent.email}</div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              {/* Quick Stats Card */}
              <ScrollAnimation animation="animate-fade-left" delay={100}>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property ID</span>
                      <span className="font-medium">
                        #{property.id.toString().padStart(4, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-medium">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium">{property.size}</span>
                    </div>
                    {property.yearBuilt && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Built</span>
                        <span className="font-medium">
                          {property.yearBuilt}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="animate-fade-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Similar Properties
              </h2>
              <Button variant="outline" asChild>
                <Link to="/properties">View All Properties</Link>
              </Button>
            </div>
          </ScrollAnimation>

          <PropertyRecommendations
            userPreferences={{
              budget: property.price * 1.3,
              location: property.location.split(",")[0],
              propertyType: property.type,
              bedrooms: property.bedrooms,
            }}
            viewedProperties={[property.id]}
          />
        </div>
      </section>

      {/* Virtual Tour Modal */}
      <VirtualTourModal
        property={property}
        isOpen={showVirtualTour}
        onClose={() => setShowVirtualTour(false)}
      />

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setShowImageModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={property.images[selectedImageIndex]}
              alt={`${property.title} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            {property.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded">
              {selectedImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
