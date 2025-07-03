import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/data";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Volume2,
  VolumeX,
  Camera,
  Move3D,
  Eye,
  Navigation,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface VirtualTourModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function VirtualTourModal({
  property,
  isOpen,
  onClose,
}: VirtualTourModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [viewMode, setViewMode] = useState<"360" | "walkthrough" | "3d">("360");

  const rooms = [
    { name: "Living Room", image: property.images[0] || property.imageUrl },
    { name: "Kitchen", image: property.images[1] || property.imageUrl },
    { name: "Master Bedroom", image: property.images[2] || property.imageUrl },
    { name: "Bathroom", image: property.images[3] || property.imageUrl },
  ];

  const handleRoomChange = (index: number) => {
    setCurrentRoom(index);
    setIsPlaying(false);
  };

  // Auto-play walkthrough - moved before early return
  useEffect(() => {
    if (isPlaying && viewMode === "walkthrough" && isOpen) {
      const interval = setInterval(() => {
        setCurrentRoom((prev) => (prev + 1) % rooms.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, viewMode, rooms.length, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-black text-white">
          <CardTitle className="flex items-center gap-2">
            <Move3D className="h-5 w-5 text-primary" />
            Virtual Tour - {property.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-0 h-full flex flex-col">
          {/* Tour Controls */}
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Button
                variant={viewMode === "360" ? "default" : "secondary"}
                size="sm"
                onClick={() => setViewMode("360")}
                className={`${viewMode === "360" ? "bg-primary text-black" : "bg-gray-700 text-white hover:bg-gray-600"}`}
              >
                <Eye className="h-4 w-4 mr-2" />
                360° View
              </Button>
              <Button
                variant={viewMode === "walkthrough" ? "default" : "secondary"}
                size="sm"
                onClick={() => setViewMode("walkthrough")}
                className={`${viewMode === "walkthrough" ? "bg-primary text-black" : "bg-gray-700 text-white hover:bg-gray-600"}`}
              >
                <Navigation className="h-4 w-4 mr-2" />
                Walkthrough
              </Button>
              <Button
                variant={viewMode === "3d" ? "default" : "secondary"}
                size="sm"
                onClick={() => setViewMode("3d")}
                className={`${viewMode === "3d" ? "bg-primary text-black" : "bg-gray-700 text-white hover:bg-gray-600"}`}
              >
                <Move3D className="h-4 w-4 mr-2" />
                3D Model
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-gray-700 text-white hover:bg-gray-600 px-3"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="bg-gray-700 text-white hover:bg-gray-600 h-9 w-9"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-gray-700 text-white hover:bg-gray-600 h-9 w-9"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-gray-700 text-white hover:bg-gray-600 h-9 w-9"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Tour Viewer */}
          <div className="flex-1 relative bg-black min-h-[500px]">
            {viewMode === "360" && (
              <div className="relative w-full h-full">
                <img
                  src={rooms[currentRoom].image}
                  alt={`${rooms[currentRoom].name} - 360° View`}
                  className="w-full h-full object-contain bg-black"
                />

                {/* Navigation Arrows */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black text-white border-2 border-white/20 h-12 w-12 rounded-full shadow-xl"
                  onClick={() =>
                    handleRoomChange(
                      currentRoom === 0 ? rooms.length - 1 : currentRoom - 1,
                    )
                  }
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black text-white border-2 border-white/20 h-12 w-12 rounded-full shadow-xl"
                  onClick={() =>
                    handleRoomChange(
                      currentRoom === rooms.length - 1 ? 0 : currentRoom + 1,
                    )
                  }
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Hotspots for navigation */}
                <div className="absolute inset-0">
                  {rooms.map((room, index) => {
                    if (index === currentRoom) return null;
                    const positions = [
                      { top: "25%", left: "20%" },
                      { top: "40%", right: "25%" },
                      { bottom: "25%", left: "45%" },
                      { top: "60%", left: "70%" },
                    ];
                    const position = positions[index % positions.length];

                    return (
                      <div
                        key={index}
                        className="absolute w-8 h-8 bg-primary rounded-full cursor-pointer flex items-center justify-center text-black text-sm font-bold hover:scale-125 transition-all duration-200 shadow-xl border-2 border-white"
                        style={position}
                        onClick={() => handleRoomChange(index)}
                        title={`Go to ${room.name}`}
                      >
                        {index + 1}
                      </div>
                    );
                  })}
                </div>

                {/* Room Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg backdrop-blur-sm border border-gray-600">
                  <h3 className="font-bold text-lg text-primary">
                    {rooms[currentRoom].name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Click numbered dots to navigate
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Room {currentRoom + 1} of {rooms.length}
                  </p>
                </div>

                {/* Virtual Compass */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-black/80 rounded-full flex items-center justify-center text-white border border-gray-600">
                  <Navigation className="h-6 w-6 text-primary" />
                </div>
              </div>
            )}

            {viewMode === "walkthrough" && (
              <div className="relative w-full h-full">
                <img
                  src={rooms[currentRoom].image}
                  alt={`${rooms[currentRoom].name} - Walkthrough`}
                  className="w-full h-full object-contain bg-black"
                />

                {/* Navigation Arrows */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black text-white border-2 border-white/20 h-12 w-12 rounded-full shadow-xl"
                  onClick={() =>
                    handleRoomChange(
                      currentRoom === 0 ? rooms.length - 1 : currentRoom - 1,
                    )
                  }
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black text-white border-2 border-white/20 h-12 w-12 rounded-full shadow-xl"
                  onClick={() =>
                    handleRoomChange(
                      currentRoom === rooms.length - 1 ? 0 : currentRoom + 1,
                    )
                  }
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Walkthrough Progress */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/80 text-white px-6 py-3 rounded-full border border-gray-600 backdrop-blur-sm">
                    <span className="text-primary font-bold">
                      {rooms[currentRoom].name}
                    </span>
                    <span className="text-gray-300 ml-2">•</span>
                    <span className="text-gray-300 ml-2">
                      Room {currentRoom + 1} of {rooms.length}
                    </span>
                  </div>
                </div>

                {/* Auto-play indicator */}
                {isPlaying && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {viewMode === "3d" && (
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-md">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Move3D className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">3D Model View</h3>
                    <p className="text-gray-300 mb-6 text-lg">
                      Interactive 3D model coming soon
                    </p>
                    <div className="grid grid-cols-1 gap-3 text-left bg-black/40 p-6 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-300">
                          Rotate and zoom the property
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-300">
                          Measure rooms and spaces
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-300">
                          Virtual furniture placement
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Room Navigation */}
          <div className="bg-gray-100 border-t p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg">Room Navigation</h4>
              <Badge className="bg-primary text-black text-sm px-3 py-1">
                {currentRoom + 1} / {rooms.length}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {rooms.map((room, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`relative h-20 p-0 border-2 transition-all ${
                    currentRoom === index
                      ? "border-primary ring-4 ring-primary/20 scale-105"
                      : "border-gray-300 hover:border-primary hover:scale-102"
                  }`}
                  onClick={() => handleRoomChange(index)}
                >
                  <div className="relative w-full h-full rounded-md overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white text-sm font-bold text-center px-2">
                        {room.name}
                      </span>
                    </div>
                    {currentRoom === index && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
                    )}
                    <div className="absolute bottom-1 left-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-black text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Tour Features */}
          <div className="bg-gray-50 p-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Camera className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">HD Quality</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Move3D className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">360° Views</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Navigation className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Interactive</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Volume2 className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Audio Guide</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
