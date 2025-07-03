import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/PropertyCard";
import { Property, properties } from "@/lib/data";
import {
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  RefreshCw,
  Heart,
  Eye,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

interface PropertyRecommendationsProps {
  userPreferences?: {
    budget?: number;
    location?: string;
    propertyType?: string;
    bedrooms?: number;
  };
  viewedProperties?: number[];
  className?: string;
}

export function PropertyRecommendations({
  userPreferences = {},
  viewedProperties = [],
  className = "",
}: PropertyRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"ai" | "trending" | "similar">(
    "ai",
  );

  const generateRecommendations = () => {
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      let filtered = [...properties];

      // AI-based filtering logic
      if (userPreferences.budget) {
        filtered = filtered.filter(
          (p) => p.price <= userPreferences.budget! * 1.2,
        );
      }

      if (userPreferences.location) {
        filtered = filtered.filter((p) =>
          p.location
            .toLowerCase()
            .includes(userPreferences.location!.toLowerCase()),
        );
      }

      if (userPreferences.propertyType) {
        filtered = filtered.filter(
          (p) => p.type === userPreferences.propertyType,
        );
      }

      if (userPreferences.bedrooms) {
        filtered = filtered.filter(
          (p) => p.bedrooms && p.bedrooms >= userPreferences.bedrooms! - 1,
        );
      }

      // Score properties based on multiple factors
      const scored = filtered
        .map((property) => ({
          ...property,
          score: calculateRecommendationScore(property),
        }))
        .sort((a, b) => b.score - a.score);

      setRecommendations(scored.slice(0, 6));
      setIsLoading(false);
    }, 1500);
  };

  const calculateRecommendationScore = (property: Property): number => {
    let score = 0;

    // Price compatibility (higher score for better price match)
    if (userPreferences.budget) {
      const priceRatio = property.price / userPreferences.budget;
      if (priceRatio <= 1) score += 30;
      else if (priceRatio <= 1.2) score += 20;
      else score -= 10;
    }

    // Location preference
    if (
      userPreferences.location &&
      property.location
        .toLowerCase()
        .includes(userPreferences.location.toLowerCase())
    ) {
      score += 25;
    }

    // Property type match
    if (userPreferences.propertyType === property.type) {
      score += 20;
    }

    // Features quality (more features = higher score)
    score += Math.min(property.features.length * 2, 15);

    // Recency bonus
    const daysSinceListed = Math.floor(
      (Date.now() - new Date(property.dateAdded).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    if (daysSinceListed < 7) score += 10;
    else if (daysSinceListed < 30) score += 5;

    // Random factor for variety
    score += Math.random() * 10;

    return score;
  };

  const getTrendingProperties = () => {
    // Simulate trending algorithm based on views, recent listings, etc.
    return properties
      .filter((p) => p.status === "For Sale")
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  };

  const getSimilarProperties = () => {
    if (viewedProperties.length === 0) return [];

    const viewedProperty = properties.find((p) => p.id === viewedProperties[0]);
    if (!viewedProperty) return [];

    return properties
      .filter(
        (p) =>
          p.id !== viewedProperty.id &&
          (p.type === viewedProperty.type ||
            p.location === viewedProperty.location ||
            Math.abs(p.price - viewedProperty.price) <
              viewedProperty.price * 0.3),
      )
      .slice(0, 6);
  };

  useEffect(() => {
    if (activeTab === "ai") {
      generateRecommendations();
    }
  }, [activeTab, userPreferences]);

  const getDisplayProperties = () => {
    switch (activeTab) {
      case "trending":
        return getTrendingProperties();
      case "similar":
        return getSimilarProperties();
      default:
        return recommendations;
    }
  };

  const displayProperties = getDisplayProperties();

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Property Recommendations
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={generateRecommendations}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Recommendation Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "ai" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("ai")}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              AI Picks
            </Button>
            <Button
              variant={activeTab === "trending" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("trending")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
            <Button
              variant={activeTab === "similar" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("similar")}
              className="flex items-center gap-2"
              disabled={viewedProperties.length === 0}
            >
              <Target className="h-4 w-4" />
              Similar
            </Button>
          </div>

          {/* AI Insights */}
          {activeTab === "ai" && !isLoading && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium mb-1">AI Insight</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on your preferences, we've found{" "}
                    {recommendations.length} properties that match your
                    criteria. Properties in{" "}
                    {userPreferences.location || "your preferred areas"} are
                    trending this week.
                    {userPreferences.budget &&
                      ` Your budget range puts you in the ${
                        userPreferences.budget > 100000000
                          ? "luxury"
                          : userPreferences.budget > 50000000
                            ? "premium"
                            : "affordable"
                      } market segment.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Properties Grid */}
          {!isLoading && displayProperties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProperties.map((property, index) => (
                <ScrollAnimation
                  key={property.id}
                  animation="animate-fade-up"
                  delay={100 * (index % 3)}
                >
                  <div className="relative">
                    <PropertyCard property={property} />
                    {activeTab === "ai" && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Pick
                      </Badge>
                    )}
                    {activeTab === "trending" && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && displayProperties.length === 0 && (
            <div className="text-center py-12">
              <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">
                No recommendations yet
              </h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === "similar"
                  ? "View some properties to get personalized recommendations"
                  : "Update your preferences to get better recommendations"}
              </p>
              <Button
                onClick={generateRecommendations}
                className="bg-primary text-black hover:bg-primary/90"
              >
                Generate Recommendations
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
