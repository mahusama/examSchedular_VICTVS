// MapView.js
import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue with leaflet + webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapView({ exams, height = 400 }) {
  // compute center as average lat/lng or default
  const coords = exams
    .map((e) => e.location)
    .filter((l) => l && l.latitude && l.longitude);

  const center = useMemo(() => {
    if (!coords.length) return [51.505, -0.09]; // fallback
    const lat = coords.reduce((s, c) => s + c.latitude, 0) / coords.length;
    const lng = coords.reduce((s, c) => s + c.longitude, 0) / coords.length;
    return [lat, lng];
  }, [coords]);

  return (
    <div style={{ width: "100%", height }}>
      <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {exams.map((exam) => {
          const { _id, title, location, datetime } = exam;
          if (!location || !location.latitude || !location.longitude) return null;
          return (
            <Marker key={_id} position={[location.latitude, location.longitude]}>
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <strong>{title}</strong>
                  <div>{new Date(datetime).toLocaleString()}</div>
                  <div>{location.country}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
