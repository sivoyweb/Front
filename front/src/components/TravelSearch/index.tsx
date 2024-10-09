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
      <header className="absolute bg-white/90 py-8 md-lg:py-16 rounded-3xl text-sivoy-blue w-3/4">
        <div className="flex flex-col md:flex-row md:space-x-4 px-8">
          <div className="flex-1 mb-4">
            <h1 className="text-lg md-lg:text-xl mb-2 font-arialroundedmtbold text-center">¿Dónde quiere ir?</h1>
            <div className="flex justify-center">
            <input
              ref={inputRef}
              type="text"
              name="ciudad"
              placeholder="Por ej: Buenos Aires"
              className="px-4 py-2 w-full md:w-64 rounded-md bg-white border border-gray-600 focus:outline-none focus:ring-2 focus:border-transparent"
              onKeyUp={handleInputChange}
            />
            </div>
          </div>

          <div className="flex-1 r">
            <h1 className="text-lg md-lg:text-xl mb-2 font-arialroundedmtbold text-center">¿Qué tipo de destino o servicio busca?</h1>
            <div className="flex justify-center">
              <input
                type="text"
                name="servicio"
                value={selectedService}
                readOnly
                className="px-4 py-2 w-full md:w-64 rounded-md bg-white border border-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:border-transparent"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-full md:w-64 bg-white border border-gray-300 rounded-md shadow-lg">
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

        <div className="mt-6 flex justify-center">
          <button
            className="px-6 md-lg:px-10 py-2 md-lg:text-lg"
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
