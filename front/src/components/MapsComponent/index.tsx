"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet"; 
import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

interface MapProps {
  address: string;
}

const MapsComponent: React.FC<MapProps> = ({ address }) => {
  const [coordinates, setCoordinates] = useState<LatLngExpression | null>(null);

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#cd1319" fill="#cd1319" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" strokeWidth="0" fill="#cd1319" />
    </svg>
  `;

  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: svgIcon,
    iconSize: [24, 36], 
    iconAnchor: [12, 36], 
  });

  const fetchCoordinates = async (address: string) => {
    const apiKey = "4a64cdab678b469da1f589991994f2b4";

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`
      );

      const { results } = response.data;

      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry;
        setCoordinates([lat, lng]);
      } 
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    if (address) {
      fetchCoordinates(address);
    }
  }, [address]);

  // Condición de carga
  if (!coordinates) {
    return <p className="loader">Cargando...</p>; // Retorna un loader adecuado
  }

  return (
    <div className="rounded-xl overflow-hidden">
      <p className="text-2xl mb-4 font-arialroundedmtbold">Ubicación:</p> 
      <MapContainer
        center={coordinates} // Usar las coordenadas aquí
        zoom={16}
        style={{ height: "500px", width: "100%" }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>
            {address} <br /> Aquí está tu dirección.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapsComponent;