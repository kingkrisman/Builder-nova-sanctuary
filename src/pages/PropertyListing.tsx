import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyComparison } from "@/components/PropertyComparison";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { properties } from "@/lib/data";
import {
  Search,
  Filter,
  MapPin,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Scale,
  Plus,
} from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function PropertyListing() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 500000000,
  ]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [comparisonProperties, setComparisonProperties] = useState<number[]>(
    [],
  );
  const [showComparison, setShowComparison] = useState(false);

  // Get unique values for filter options
  const propertyTypes = [...new Set(properties.map((p) => p.type))];
  const propertyStatuses = [...new Set(properties.map((p) => p.status))];
  const locations = [...new Set(properties.map((p) => p.location))];
  const maxPrice = Math.max(...properties.map((p) => p.price));

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "all" || property.type === selectedType;
      const matchesStatus =
        selectedStatus === "all" || property.status === selectedStatus;
      const matchesLocation =
        selectedLocation === "all" || property.location === selectedLocation;
      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesLocation &&
        matchesPrice
      );
    });

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime(),
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [
    searchTerm,
    selectedType,
    selectedStatus,
    selectedLocation,
    priceRange,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedStatus("all");
    setSelectedLocation("all");
    setPriceRange([0, maxPrice]);
  };

  const activeFiltersCount = [
    selectedType !== "all",
    selectedStatus !== "all",
    selectedLocation !== "all",
    priceRange[0] > 0 || priceRange[1] < maxPrice,
    searchTerm.length > 0,
  ].filter(Boolean).length;

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(0)}M`;
    }
    return `₦${(price / 1000).toFixed(0)}K`;
  };

  const handleAddToComparison = (propertyId: number) => {
    if (
      comparisonProperties.length < 4 &&
      !comparisonProperties.includes(propertyId)
    ) {
      setComparisonProperties([...comparisonProperties, propertyId]);
    }
  };

  const handleRemoveFromComparison = (propertyId: number) => {
    setComparisonProperties(
      comparisonProperties.filter((id) => id !== propertyId),
    );
  };

  const getComparisonProperties = () => {
    return properties.filter((p) => comparisonProperties.includes(p.id));
  };

  // Handle URL parameters on mount
  useEffect(() => {
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    if (search) setSearchTerm(search);
    if (type) setSelectedType(type);
    if (status) setSelectedStatus(status);
  }, [searchParams]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 mt-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="animate-fade-up">
            <SectionHeading
              title={
                <>
                  Property <span className="text-primary">Listings</span>
                </>
              }
              subtitle="Discover your perfect property from our extensive portfolio of residential, commercial, and land properties across Nigeria."
              centered
              className="text-white"
            />
          </ScrollAnimation>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search properties by title, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Comparison Button */}
              {comparisonProperties.length > 0 && (
                <Button
                  onClick={() => setShowComparison(true)}
                  className="bg-primary text-black hover:bg-primary/90 relative"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  Compare ({comparisonProperties.length})
                </Button>
              )}

              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Property Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Property Type
                    </label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Status
                    </label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {propertyStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Location
                    </label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: {formatPrice(priceRange[0])} -{" "}
                    {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                    max={maxPrice}
                    step={1000000}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                {filteredProperties.length} Propert
                {filteredProperties.length === 1 ? "y" : "ies"} Found
              </h2>
              <p className="text-muted-foreground">
                Showing results for your search criteria
              </p>
            </div>
          </div>

          {/* Properties Grid/List */}
          {filteredProperties.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {filteredProperties.map((property, index) => (
                <ScrollAnimation
                  key={property.id}
                  animation="animate-fade-up"
                  delay={100 * (index % 3)}
                >
                  <div className="relative">
                    <PropertyCard
                      property={property}
                      className={
                        viewMode === "list" ? "md:flex md:flex-row" : ""
                      }
                    />
                    {/* Comparison Toggle */}
                    <Button
                      size="icon"
                      variant={
                        comparisonProperties.includes(property.id)
                          ? "default"
                          : "outline"
                      }
                      className={`absolute top-2 right-14 h-8 w-8 ${
                        comparisonProperties.includes(property.id)
                          ? "bg-primary text-black"
                          : "bg-white/90 hover:bg-white"
                      }`}
                      onClick={() =>
                        comparisonProperties.includes(property.id)
                          ? handleRemoveFromComparison(property.id)
                          : handleAddToComparison(property.id)
                      }
                      disabled={
                        !comparisonProperties.includes(property.id) &&
                        comparisonProperties.length >= 4
                      }
                    >
                      {comparisonProperties.includes(property.id) ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation animation="animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Our property experts are here to help you find the perfect
              property. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-black hover:bg-primary/90"
              >
                Contact Our Agents
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Request{" "}
                <span style={{ color: "rgb(43, 43, 43)" }}>Custom </span>Search
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Property Comparison Modal */}
      {showComparison && (
        <PropertyComparison
          properties={getComparisonProperties()}
          onRemoveProperty={handleRemoveFromComparison}
          onClose={() => setShowComparison(false)}
        />
      )}
    </Layout>
  );
}
