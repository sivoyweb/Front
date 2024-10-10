"use client";

import { useContext, useState } from "react";
import { TravelContext } from "@/context/travelContext";
import TravelSearch from "@/components/TravelSearch";
import Image from "next/image";
import TravelGridComponent from "@/components/TravelGrid";
import { ITravel } from "@/interfaces/interfaces";
import { PromotionsCarousel } from "../Promotions";

function DestinationsFilter() {
  const { travels, filteredTravels } = useContext(TravelContext);
  const [isSearching, setIsSearching] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<string>(""); // Aseguramos que el criterio sea string
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({}); // Estado para categorías expandidas

  const travelCategories = [
    { title: "Balnearios", travels: travels.filter((travel: ITravel) => travel.serviceType === "Balneario") },
    { title: "Gastronomía", travels: travels.filter((travel: ITravel) => travel.serviceType === "Gastronomía") },
    { title: "Alojamientos", travels: travels.filter((travel: ITravel) => travel.serviceType === "Alojamiento") },
    { title: "Ocio y Recreación", travels: travels.filter((travel: ITravel) => travel.serviceType === "Ocio y recreación") },
    { title: "Actividades Culturales", travels: travels.filter((travel: ITravel) => travel.serviceType === "Actividades culturales") },
    { title: "Transporte", travels: travels.filter((travel: ITravel) => travel.serviceType === "Medios de transporte") },
    { title: "Experiencias", travels: travels.filter((travel: ITravel) => travel.serviceType === "Experiencias") },
    { title: "Servicios Personales", travels: travels.filter((travel: ITravel) => travel.serviceType === "Servicios personales") },
    { title: "Otros", travels: travels.filter((travel: ITravel) => travel.serviceType === "Otro") }
  ];

  const sortTravels = (travels: ITravel[]) => {
    return travels.slice().sort((a, b) => {
      if (sortCriteria === "rating") {
        return b.averageStars - a.averageStars;
      } else if (sortCriteria === "accessibility") {
        const order = ["platino", "oro", "plata", "bronce"];
        return order.indexOf(a.accessibilitySealName.toLowerCase()) - order.indexOf(b.accessibilitySealName.toLowerCase());
      } else if (sortCriteria === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime(); // Ordena por fecha, más reciente primero
      }
      return 0;
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  const handleSearchToggle = (searching: boolean) => {
    setIsSearching(searching);
  };

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [title]: !prev[title], // Alterna el estado de la categoría
    }));
  };

  return (
    <div className="w-full md:px-8">
      <header className="relative h-96 mx-1 mt-4 mb-10">
        <Image
          src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728465338/si-voy/guz3948byfaqls1o4y2i.jpg"
          alt="Playa accesible"
          fill
          priority={true}
          className="object-cover rounded-3xl"
        />
        <TravelSearch onSearchToggle={handleSearchToggle} />
      </header>
  
      <div className="text-center px-4">
        <PromotionsCarousel />
  
        <div className="mb-4 mt-16">
          <label htmlFor="sort" className="mr-2">Ordenar según:</label>
          <select id="sort" value={sortCriteria} onChange={handleSortChange} className="p-2 border rounded">
            <option value="">Seleccionar</option>
            <option value="rating">Rating</option>
            <option value="accessibility">Sello de Accesibilidad</option>
            <option value="date">Más Recientes</option>
          </select>
        </div>
  
        {isSearching ? (
          filteredTravels.length === 0 ? (
            <p className="text-xl md:text-2xl m-6 mb-20">
              No encontramos el lugar que usted busca.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center mt-12">
              <TravelGridComponent travels={sortTravels(filteredTravels)} />
            </div>
          )
        ) : (
          travelCategories.map((category, index) => {
            const isExpanded = expandedCategories[category.title];
            const displayedTravels = isExpanded ? category.travels : category.travels.slice(0, 4);
            return (
<div key={index}>
  <h1 className="text-xl md:text-2xl font-arialroundedmtbold text-left py-6 text-sivoy-blue mb-2 lg:flex lg:justify-start md:justify-center">
    {category.title}
  </h1>
  <div className="flex justify-center mb-2 px-4">
    <TravelGridComponent travels={sortTravels(displayedTravels)} />
  </div>
  {category.travels.length > 4 && (
    <div className="flex justify-end"> {/* Alinea el botón a la derecha */}
  <button
    onClick={() => toggleCategory(category.title)}
    className="custom-button pointer"
  >
    <p className="font-arialroundedmtbold text-sivoy-green hover:scale-110 transition">
      {isExpanded ? `Ver menos ${category.title}` : `Ver más ${category.title}`}
    </p>
  </button>
</div>

  )}
</div>

            );
          })
        )}
      </div>
    </div>
  );
}

export default DestinationsFilter;
