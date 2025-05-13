import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Define location for the map
interface LocationMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  popupText?: string;
}

export function LocationMap({
  latitude = 6.61911, // Default to Lagos, Nigeria location
  longitude = 3.29033,
  zoom = 15,
  popupText = "Da'sayonce Head Office",
}: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use this wrapper component to load Leaflet only on client-side
  const MapComponent = () => {
    if (!isMounted)
      return (
        <div className="h-full w-full bg-slate-300 flex items-center justify-center">
          Loading map...
        </div>
      );

    // Dynamic imports to ensure Leaflet only loads in browser environment
    const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
    const L = require("leaflet");

    // Fix for default marker icons in Leaflet with React
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    return (
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            {popupText} <br />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get Directions
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    );
  };

  return (
    <div className="h-full w-full">
      <MapComponent />
    </div>
  );
}
