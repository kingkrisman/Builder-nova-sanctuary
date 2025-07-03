import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PropertySearchWidget } from "@/components/PropertySearchWidget";
import { Search, Play, TrendingUp, MapPin, Users, Award } from "lucide-react";

export function Hero() {
  const [showSearch, setShowSearch] = useState(false);

  const stats = [
    { label: "Properties Sold", value: "500+", icon: TrendingUp },
    { label: "Happy Clients", value: "1,200+", icon: Users },
    { label: "Locations", value: "15+", icon: MapPin },
    { label: "Years Experience", value: "10+", icon: Award },
  ];

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/10549886/pexels-photo-10549886.jpeg')] bg-cover bg-center">
        <div
          className="absolute inset-0 bg-black/70"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F1e3e6937ad364a8ea712bb2774074832)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white py-20">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollAnimation animation="animate-fade-up" className="mb-6">
            <Badge className="bg-primary/20 text-primary border-primary mb-4">
              Nigeria's Premier Real Estate Company
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Transforming</span> Spaces.{" "}
              <span className="text-primary">Building</span> Trust.
            </h1>
          </ScrollAnimation>

          <ScrollAnimation
            animation="animate-fade-up"
            delay={200}
            className="mb-8"
          >
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Da'sayonce Real Estate and Properties is committed to delivering
              exceptional real estate solutions that reflect quality, value, and
              client aspirations across Nigeria.
            </p>
          </ScrollAnimation>

          <ScrollAnimation
            animation="animate-fade-up"
            delay={400}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setShowSearch(!showSearch)}
                size="lg"
                className="bg-primary text-black hover:bg-primary/90"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Your Dream Home
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-black"
              >
                <Link to="/about">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Our Story
                </Link>
              </Button>
            </div>
          </ScrollAnimation>

          {/* Property Search Widget */}
          {showSearch && (
            <ScrollAnimation
              animation="animate-fade-up"
              delay={600}
              className="mb-12"
            >
              <PropertySearchWidget />
            </ScrollAnimation>
          )}

          {/* Stats Section */}
          <ScrollAnimation animation="animate-fade-up" delay={800}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          {/* Scroll Indicator */}
          <ScrollAnimation animation="animate-fade-up" delay={1000}>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
                <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-pulse"></div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
