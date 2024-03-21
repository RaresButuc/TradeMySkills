import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function Map({ lat, lon }) {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      setMapReady(true);
    }
  }, [lat, lon]);
  return (
    <>
      {mapReady && (
        <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}
    </>
  );
}
