"use client"
import TravelGridComponent from "@/components/TravelGrid";
import TravelSearch from "@/components/TravelSearch";
import { TravelContext } from "@/context/travelContext";

import Image from "next/image";
import { useContext, useState } from "react";



function Destinations() {
  const { noResults , filteredTravels} = useContext(TravelContext)
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearchToggle = (searching: boolean) => {
    setIsSearching(searching);
};

  return (
    <div>
      <div className="relative w-full h-[500px]">
        <Image
          src="http://www.sivoy.com.ar/assets/upload/slider-2.jpg"
          alt="Login"
          fill
          priority={true}
          className="object-cover"
        />
        <TravelSearch  onSearchToggle={handleSearchToggle}/>
      </div>
      <div className="text-center">

      {isSearching ? (
                    noResults ? (
                        <p>Este lugar no existe</p>
                    ) : (
                        <div className="flex flex-wrap justify-center">
                            {filteredTravels.map((travel) => (
                                <div key={travel.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-2 transition-transform duration-300 hover:scale-110">
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
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-sivoy-blue font-arialroundedmtbold">
                                            {travel.name}
                                        </h5>
                                        <p className="mb-3 font-normal text-sivoy-blue">
                                            {travel.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div>
       <h1 className="text-2xl font-bold text-left ml-8 py-6 font-arialroundedmtbold text-sivoy-blue -mb-4">
          Balnearios
        </h1>
        <div className="col-auto justify-center mb-10">
          <TravelGridComponent />
        </div>
        <h1 className="text-2xl font-bold text-left ml-8 py-6 font-arialroundedmtbold text-sivoy-blue -mb-4">
          Gastronomía
        </h1>
        <div className="col-auto justify-center mb-10">
          <TravelGridComponent />
        </div>
        <h1 className="text-2xl font-bold text-left ml-8 py-6 font-arialroundedmtbold text-sivoy-blue -mb-4">
          Alojamientos
        </h1>
        <div className="col-auto justify-center mb-10">
          <TravelGridComponent />
        </div>
                        <p>Contenido normal de la página.</p>
                    </div>
                )}
            </div>
        </div>
  );
}

export default Destinations;
