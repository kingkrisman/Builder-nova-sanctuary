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
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={viewMode === "360" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("360")}
                className="text-xs"
              >
                <Eye className="h-3 w-3 mr-1" />
                360° View
              </Button>
              <Button
                variant={viewMode === "walkthrough" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("walkthrough")}
                className="text-xs"
              >
                <Navigation className="h-3 w-3 mr-1" />
                Walkthrough
              </Button>
              <Button
                variant={viewMode === "3d" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("3d")}
                className="text-xs"
              >
                <Move3D className="h-3 w-3 mr-1" />
                3D Model
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-8 w-8"
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="h-8 w-8"
              >
                {isMuted ? (
                  <VolumeX className="h-3 w-3" />
                ) : (
                  <Volume2 className="h-3 w-3" />
                )}
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RotateCcw className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Maximize className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Main Tour Viewer */}
          <div className="flex-1 relative bg-gray-100">
            {viewMode === "360" && (
              <div className="relative w-full h-full">
                <img
                  src={rooms[currentRoom].image}
                  alt={`${rooms[currentRoom].name} - 360° View`}
                  className="w-full h-full object-cover"
                />

                {/* 360° Navigation Overlay */}
                <div className="absolute inset-0 bg-black/10">
                  {/* Hotspots for navigation */}
                  {rooms.map((_, index) => {
                    if (index === currentRoom) return null;
                    const positions = [
                      { top: "30%", left: "25%" },
                      { top: "50%", right: "30%" },
                      { bottom: "30%", left: "50%" },
                    ];
                    const position = positions[index % positions.length];

                    return (
                      <div
                        key={index}
                        className="absolute w-6 h-6 bg-primary rounded-full cursor-pointer animate-pulse flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform shadow-lg"
                        style={position}
                        onClick={() => handleRoomChange(index)}
                        title={`Go to ${rooms[index].name}`}
                      >
                        {index + 1}
                      </div>
                    );
                  })}
                </div>

                {/* Room Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg">
                  <h3 className="font-semibold">{rooms[currentRoom].name}</h3>
                  <p className="text-sm opacity-90">
                    Click yellow dots to navigate
                  </p>
                </div>

                {/* Virtual Compass */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-black/70 rounded-full flex items-center justify-center text-white">
                  <Navigation className="h-6 w-6" />
                </div>
              </div>
            )}

            {viewMode === "walkthrough" && (
              <div className="relative w-full h-full">
                <img
                  src={rooms[currentRoom].image}
                  alt={`${rooms[currentRoom].name} - Walkthrough`}
                  className="w-full h-full object-cover"
                />

                {/* Walkthrough Progress */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                    Room {currentRoom + 1} of {rooms.length}
                  </div>
                </div>

                {/* Auto-play indicator */}
                {isPlaying && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            )}

            {viewMode === "3d" && (
              <div className="relative w-full h-full bg-gradient-to-br from-blue-900 to-purple-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Move3D className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">3D Model View</h3>
                    <p className="mb-4">Interactive 3D model coming soon</p>
                    <div className="space-y-2 text-sm opacity-75">
                      <p>• Rotate and zoom the property</p>
                      <p>• Measure rooms and spaces</p>
                      <p>• Virtual furniture placement</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Room Navigation */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Room Navigation</h4>
              <Badge variant="secondary">
                {currentRoom + 1} / {rooms.length}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {rooms.map((room, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    currentRoom === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleRoomChange(index)}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-16 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs font-medium text-center px-2">
                      {room.name}
                    </span>
                  </div>
                  {currentRoom === index && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
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
