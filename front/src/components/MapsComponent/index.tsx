"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet"; // Importamos Icon de leaflet
import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css"; // Importamos los estilos de Leaflet

// Interfaz para definir los props del componente
interface MapProps {
  address: string; // La dirección que viene de la base de datos
}

// Definir el icono personalizado
const customIcon = new Icon({
  iconUrl: "https://w7.pngwing.com/pngs/116/566/png-transparent-red-locator-illustration-computer-icons-google-maps-location-s-heart-website-map-thumbnail.png", // Reemplaza con la ruta a tu imagen de icono
  iconSize: [38, 38], // Tamaño del icono personalizado (puedes ajustarlo)
  iconAnchor: [22, 38], // Posiciona el icono (centro en la parte inferior)
  popupAnchor: [-3, -76], // Donde aparece el popup en relación al icono
});

const MapsComponet: React.FC<MapProps> = ({ address }) => {
  const [coordinates, setCoordinates] = useState<LatLngExpression | null>(null);

  // Función para convertir la dirección en coordenadas usando OpenCage Geocoder API
  const fetchCoordinates = async (address: string) => {
    const apiKey = "4a64cdab678b469da1f589991994f2b4"; // Reemplaza con tu API Key de OpenCage

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const { results } = response.data;

      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry;
        setCoordinates([lat, lng]);
      } else {
        console.error("No se encontraron resultados para la dirección.");
      }
    } catch (error) {
      console.error("Error obteniendo las coordenadas:", error);
    }
  };

  // Efecto para obtener las coordenadas cuando el componente se monta
  useEffect(() => {
    if (address) {
      fetchCoordinates(address);
    }
  }, [address]);

  if (!coordinates) {
    return <p>Cargando mapa...</p>;
  }

  return (
    <MapContainer center={coordinates} zoom={16} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={customIcon}> {/* Usamos el icono personalizado aquí */}
        <Popup>
          {address} <br /> Aquí está tu dirección.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapsComponet;