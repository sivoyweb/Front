"use client";

import { useContext, useRef, useState } from "react";
import { TravelContext } from "@/context/travelContext";

import { ITravelSearchProps } from "@/interfaces/interfaces";

const TravelSearch: React.FC<ITravelSearchProps> = ({ onSearchToggle }) => {
  const { travels, setFilteredTravels, setNoResults } = useContext(TravelContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Seleccione un servicio');
  const services = ['Balneario', 'Gastronomía', 'Alojamiento', 'Ocio y recreación', 'Actividades culturales', 'Medios de transporte', 'Experiencias', 'Servicios personales', 'Otro'];

  const resetFields = () => {
    setSelectedService('Seleccione un servicio');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const filtrarTravels = () => {
    const textoCiudad = inputRef.current?.value.toLowerCase() || '';
    const textoServicio = selectedService !== 'Seleccione un servicio' ? selectedService : '';

    let resultado = travels;

    if (textoCiudad) {
      resultado = resultado.filter((travel) => travel.city.toLowerCase().includes(textoCiudad));
    }

    if (textoServicio) {
      resultado = resultado.filter((travel) => travel.serviceType === textoServicio);
    }

    setFilteredTravels(resultado);
    setNoResults(resultado.length === 0);
    resetFields();
  };

  const handleSearch = () => {
    filtrarTravels();
    onSearchToggle(true);
  };

  const handleInputChange = () => {
    onSearchToggle(false);
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    setIsOpen(false);
    onSearchToggle(false);
  };

  return (
<div className="absolute inset-0 flex flex-col justify-center items-center z-10">
  <header className="absolute bg-white/90 py-6 px-4 md-lg:py-12 rounded-3xl text-sivoy-blue w-3/4 max-w-4xl shadow-lg">
  {/* <header className="absolute bg-white/90 py-8 px-8 md-lg:py-16 rounded-3xl text-sivoy-blue w-3/4 max-w-4xl shadow-lg"> */}

  <div className="flex flex-col md:flex-row md:space-x-4 items-center md:items-end">
      <div className="flex-1 align-bottom mb-4 md:mb-0">
        <h1 className="text-base md:text-lg font-arialroundedmtbold text-center">
          ¿Dónde quiere ir?
        </h1>
        <div className="mt-2">
          <input
            ref={inputRef}
            type="text"
            name="ciudad"
            placeholder="Por ej: Buenos Aires"
            className="px-4 py-3 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sivoy-blue"
            onKeyUp={handleInputChange}
          />
        </div>
      </div>

      <div className="flex-1">
        <h1 className="text-base md:text-lg font-arialroundedmtbold text-center">
          ¿Qué tipo de destino o servicio busca?
        </h1>
        <div className="mt-2 relative">
          <input
            type="text"
            name="servicio"
            value={selectedService}
            readOnly
            className="px-4 py-3 w-full md:w-full rounded-lg bg-white border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sivoy-blue"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-20">
              <ul>
                {services.map((service, index) => (
                  <li
                    key={index}
                    onClick={() => handleServiceClick(service)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="mt-6 flex justify-center">
      <button
        className="px-4 py-2 text-white bg-sivoy-orange rounded-lg shadow-md text-base w-40"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  </header>
</div>

  );
};

export default TravelSearch;
