"use client";

import { useContext, useState } from "react";
import { TravelContext } from "@/context/travelContext";
import TravelSearch from "@/components/TravelSearch";
import Image from "next/image";
import TravelGridComponent from "@/components/TravelGrid";


function DestinationsFilter() {
  const { travels, filteredTravels } = useContext(TravelContext);
  const [isSearching, setIsSearching] = useState(false);

  const balneariosTravels = travels.filter(travel => travel.serviceType === 'Balneario');
  const gastronomiaTravels = travels.filter(travel => travel.serviceType === 'Gastronomía');
  const alojamientosTravels = travels.filter(travel => travel.serviceType === 'Alojamiento');
  const ocioTravels = travels.filter(travel => travel.serviceType === "Ocio y recreación");
  const culturaTravels = travels.filter(travel => travel.serviceType === "Actividades culturales");
  const transporteTravels = travels.filter(travel => travel.serviceType === "Medios de transporte");
  const experienciasTravels = travels.filter(travel => travel.serviceType === "Experiencias");
  const serviciosPersonalesTravels = travels.filter(travel => travel.serviceType === "Servicios personales");
  const otroTravels = travels.filter(travel => travel.serviceType === "Otro");

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
          <div>
            
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Balnearios
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={balneariosTravels} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Gastronomía
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={gastronomiaTravels} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Alojamientos
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={alojamientosTravels} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Ocio y Recreación
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={ocioTravels} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Actividades Culturales
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={culturaTravels} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Transporte
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={transporteTravels} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Experiencias
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={experienciasTravels} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Servicios Personales
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={serviciosPersonalesTravels} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Otros
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={otroTravels} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinationsFilter; 
