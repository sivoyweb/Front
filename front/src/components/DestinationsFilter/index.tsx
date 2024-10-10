"use client";

import { useContext, useState } from "react";
import { TravelContext } from "@/context/travelContext";
import TravelSearch from "@/components/TravelSearch";
import Image from "next/image";
import TravelGridComponent from "@/components/TravelGrid";

function DestinationsFilter() {
  const { travels, filteredTravels } = useContext(TravelContext);
  const [isSearching, setIsSearching] = useState(false);

  const travelCategories = [
    { title: "Balnearios", travels: travels.filter(travel => travel.serviceType === "Balneario") },
    { title: "Gastronomía", travels: travels.filter(travel => travel.serviceType === "Gastronomía") },
    { title: "Alojamientos", travels: travels.filter(travel => travel.serviceType === "Alojamiento") },
    { title: "Ocio y Recreación", travels: travels.filter(travel => travel.serviceType === "Ocio y recreación") },
    { title: "Actividades Culturales", travels: travels.filter(travel => travel.serviceType === "Actividades culturales") },
    { title: "Transporte", travels: travels.filter(travel => travel.serviceType === "Medios de transporte") },
    { title: "Experiencias", travels: travels.filter(travel => travel.serviceType === "Experiencias") },
    { title: "Servicios Personales", travels: travels.filter(travel => travel.serviceType === "Servicios personales") },
    { title: "Otros", travels: travels.filter(travel => travel.serviceType === "Otro") }
  ];

  const handleSearchToggle = (searching: boolean) => {
    setIsSearching(searching);
  };

  return (
    <div className="p-4 w-full overflow-x-hidden">
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

      <div className="text-center px-4 md:px-8 lg:px-12">
        {isSearching ? (
          filteredTravels.length === 0 ? (
            <p className="text-xl md:text-2xl m-6 mb-20">
              No encontramos el lugar que usted busca.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center mt-12">
              <TravelGridComponent travels={filteredTravels} />
            </div>
          )
        ) : (
          travelCategories.map((category, index) => (
            <div key={index}>
              <h1 className="text-xl md:text-2xl font-arialroundedmtbold text-left py-6 text-sivoy-blue mb-2 lg:flex lg:justify-start md:justify-center">
                {category.title}
              </h1>
              <div className="flex justify-center mb-2 px-4">
                <TravelGridComponent travels={category.travels} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DestinationsFilter;