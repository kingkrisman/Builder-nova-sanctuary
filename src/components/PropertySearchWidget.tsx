import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Home, DollarSign, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PropertySearchWidget() {
  const [searchType, setSearchType] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("search", location);
    if (propertyType && propertyType !== "") params.set("type", propertyType);
    if (searchType === "rent") params.set("status", "For Rent");
    else if (searchType === "buy") params.set("status", "For Sale");

    navigate(`/properties${params.toString() ? "?" + params.toString() : ""}`);
  };

  const popularSearches = [
    "Lekki Phase 1",
    "Victoria Island",
    "Ikoyi",
    "Magodo",
    "Gwarimpa",
    "Maitama",
    "Ikeja GRA",
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl">
      <CardContent className="p-6">
        {/* Search Type Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={searchType === "buy" ? "default" : "outline"}
            onClick={() => setSearchType("buy")}
            className="flex-1"
          >
            <Home className="h-4 w-4 mr-2" />
            Buy
          </Button>
          <Button
            variant={searchType === "rent" ? "default" : "outline"}
            onClick={() => setSearchType("rent")}
            className="flex-1"
          >
            <Home className="h-4 w-4 mr-2" />
            Rent
          </Button>
          <Button
            variant={searchType === "invest" ? "default" : "outline"}
            onClick={() => setSearchType("invest")}
            className="flex-1"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Invest
          </Button>
        </div>

        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Property Type */}
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Land">Land</SelectItem>
              <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-25M">₦0 - ₦25M</SelectItem>
              <SelectItem value="25M-50M">₦25M - ₦50M</SelectItem>
              <SelectItem value="50M-100M">₦50M - ₦100M</SelectItem>
              <SelectItem value="100M-200M">₦100M - ₦200M</SelectItem>
              <SelectItem value="200M+">₦200M+</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-primary text-black hover:bg-primary/90"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Popular Searches */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Popular locations:
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <Badge
                key={search}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-black transition-colors"
                onClick={() => {
                  setLocation(search);
                  handleSearch();
                }}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
