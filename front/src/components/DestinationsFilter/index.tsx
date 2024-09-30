"use client";
import { useContext, useState } from "react";
import { TravelContext } from "@/context/travelContext";
import { ITravelCardProps } from "@/interfaces/interfaces";
import TravelSearch from "@/components/TravelSearch";
import Image from "next/image";
import TravelGridComponent from "@/components/TravelGrid";

function DestinationsFilter({ travels }: ITravelCardProps) {
  const { noResults, filteredTravels } = useContext(TravelContext);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchToggle = (searching: boolean) => {
    setIsSearching(searching);
  };

  return (
    <div className="w-full overflow-hidden">
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
          noResults ? (
            <p className="text-xl md:text-2xl font-arialroundedmtbold m-6 mb-20">
              El lugar que usted busca no lo encontramos
            </p>
          ) : (
            <div className="flex flex-wrap justify-center">
              {filteredTravels.map((travel) => (
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
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 -ml-12">
              Balnearios
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 -ml-12">
              Gastronomía
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 -ml-12">
              Alojamientos
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DestinationsFilter;
