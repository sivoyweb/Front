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
  const gastronomiaTravels = travels.filter(travel => travel.serviceType === 'Gastronomía');
  const alojamientosTravels = travels.filter(travel => travel.serviceType === 'Alojamiento');
  const transporteTravels = travels.filter(travel => travel.serviceType === "Transporte");
  const entretenimientoTravels = travels.filter(travel => travel.serviceType === "Entretenimiento");
  const culturaTravels = travels.filter(travel => travel.serviceType === "Cultura");
  const naturalezaTravels = travels.filter(travel => travel.serviceType === "Naturaleza");
  const turismoaventuraTravels = travels.filter(travel => travel.serviceType === "Turismo de Aventura");
  const comercioTravels = travels.filter(travel => travel.serviceType === "Comercio");
  const educacionTravels = travels.filter(travel => travel.serviceType === "Educación");
  const deporteTravels = travels.filter(travel => travel.serviceType === "Deportes");
  const tecnologiaTravels = travels.filter(travel => travel.serviceType === "Tecnología");
  const profesionalesTravels = travels.filter(travel => travel.serviceType === "Profesionales");
  const lugardeinteresTravels = travels.filter(travel => travel.serviceType === "Lugar de Interés");
  const experienciasTravels = travels.filter(travel => travel.serviceType === "Experiencias");
  const arteTravels = travels.filter(travel => travel.serviceType === "Arte");
  const bienestarTravels = travels.filter(travel => travel.serviceType === "Bienestar");
  const modaTravels = travels.filter(travel => travel.serviceType === "Moda");
  const otroTravels = travels.filter(travel => travel.serviceType === "Otro");

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
              Transporte
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={transporteTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Entretenimiento
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={entretenimientoTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Cultura
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={culturaTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Naturaleza
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={naturalezaTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Turismo de Aventura
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={turismoaventuraTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Comercio
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={comercioTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Educación
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={educacionTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Deportes
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={deporteTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Tecnología
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={tecnologiaTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Profesionales
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={profesionalesTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Lugares de Interés
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={lugardeinteresTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Experiencias
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={experienciasTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Arte
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={arteTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Bienestar
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={bienestarTravels} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-left py-6 font-arialroundedmtbold text-sivoy-blue mb-2 lg:-ml-12 lg:flex lg:justify-start md:flex md:justify-center">
              Moda
            </h1>
            <div className="flex justify-center mb-2 px-4">
              <TravelGridComponent travels={modaTravels} />
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
