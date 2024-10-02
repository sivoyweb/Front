"use client";
import { useContext, useState } from "react";
import { TravelContext } from "@/context/travelContext";
import TravelSearch from "@/components/TravelSearch";
import Image from "next/image";
import TravelGridComponent from "@/components/TravelGrid";

function DestinationsFilter() {
  const { travels, noResults } = useContext(TravelContext);
  const [isSearching, setIsSearching] = useState(false);

  const balneariosTravels = travels.filter(travel => travel.serviceType === 'Balneario');
  const gastronomiaTravels = travels.filter(travel => travel.serviceType === 'Gastronomia');
  const alojamientosTravels = travels.filter(travel => travel.serviceType === 'Alojamiento');

  const handleSearchToggle = (searching: boolean) => {
    setIsSearching(searching);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative h-[300px] md:h-[500px]">
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
          noResults ? (
            <p className="text-xl md:text-2xl m-6 mb-20">
              No hay coincidencias con esta búsqueda.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center">
              {travels.map((travel) => (
                <div
                  key={travel.id}
                  className="w-full sm:w-[90%] md:w-[45%] lg:w-[30%] max-w-sm bg-white border border-gray-200 rounded-lg shadow m-2 transition-transform duration-300 hover:scale-105"
                >
                  <div className="cursor-pointer">
                    <Image
                      className="rounded-t-lg"
                      src={travel.images[0].url}
                      alt={travel.name}
                      width={400}
                      height={250}
                    />
                  </div>
                  <div className="p-5">
                    <h5 className="mb-2 text-xl md:text-2xl tracking-tight text-sivoy-blue font-arialroundedmtbold">
                      {travel.name}
                    </h5>
                    <p className="mb-3 text-sivoy-blue">
                      {travel.description}
                    </p>
                  </div>
                </div>
              ))}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinationsFilter;