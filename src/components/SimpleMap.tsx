import React from "react";

interface SimpleMapProps {
  address: string;
  height?: string;
}

export function SimpleMap({ address, height = "350px" }: SimpleMapProps) {
  // Create a Google Maps embedded URL from the address
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <iframe
        src={mapUrl}
        width="100%"
        height={height}
        style={{ border: 0, borderRadius: "0.5rem" }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
    </div>
  );
}
