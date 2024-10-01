"use client";
import { useContext, useState } from "react";
import { TravelContext } from "@/context/travelContext";
import TravelSearch from "@/components/TravelSearch";
import Image from "next/image";
import TravelGridComponent from "@/components/TravelGrid";

function DestinationsFilter() {
  const { travels, filteredTravels } = useContext(TravelContext);
  const [isSearching, setIsSearching] = useState(false);

  // Filtrar los viajes por tipo de servicio (cuando no se está buscando)
  const balneariosTravels = travels.filter(travel => travel.serviceType === 'Balneario');
  const gastronomiaTravels = travels.filter(travel => travel.serviceType === 'Gastronomia');
  const alojamientosTravels = travels.filter(travel => travel.serviceType === 'Alojamiento');

  const handleSearchToggle = (searching: boolean) => {
    setIsSearching(searching);
  };
  

  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative w-full h-[300px] md:h-[500px]">
        <Image
          src="http://www.sivoy.com.ar/assets/upload/slider-2.jpg"
          alt="Login"
          fill
          priority={true}
          className="object-cover"
        />
        <TravelSearch onSearchToggle={handleSearchToggle} />
      </div>
      <div className="text-center px-4 md:px-8 lg:px-12">
        
        {isSearching ? (
          filteredTravels.length === 0 ? ( // Comprobar si no hay resultados
            <p className="text-xl md:text-2xl m-6 mb-20">
              No encontramos el lugar que usted busca.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center">
              {/* Utiliza TravelGridComponent para renderizar los resultados filtrados */}
              <TravelGridComponent travels={filteredTravels} />
            </div>
          )
        ) : (
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 -ml-12">
              Balnearios
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={balneariosTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 -ml-12">
              Gastronomía
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={gastronomiaTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 -ml-12">
              Alojamientos
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={alojamientosTravels} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinationsFilter;
