"use client"

import { useContext, useRef, useState } from "react";
import { TravelContext } from "@/context/travelContext";
import { TravelSearchProps } from "@/interfaces/interfaces";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from "@fortawesome/free-solid-svg-icons"


const TravelSearch:React.FC<TravelSearchProps> = ({onSearchToggle}) => {
  const { travels } = useContext(TravelContext);
  const inputRef = useRef<HTMLInputElement>(null); 
  const cityInputRef = useRef<HTMLInputElement>(null); 
  const { setFilteredTravels, setNoResults } = useContext(TravelContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Seleccione un servicio');
  const services = ["Balneario","Gastronomia","Alojamiento"];

  

  const filtrarCiudad = () => {
    if (inputRef.current || selectedService !== 'Seleccione un servicio') {
      const texto = inputRef.current?.value.toLowerCase() || '';
      const resultado = travels.filter((travel) =>
        travel.city.toLowerCase().includes(texto) &&
      (selectedService === 'Seleccione un servicio' || travel.serviceType === selectedService)
      );
      setFilteredTravels(resultado);
      onSearchToggle(texto.length > 0 || selectedService !== 'Seleccione un servicio'); 

      if (resultado.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    }
  };

  const handleServiceClick = (service:string) => {
    setSelectedService(service);
    setIsOpen(false);
    filtrarCiudad();
  }



  return (
    <div>
       <div className="absolute p-8 inset-0 flex flex-row justify-center items-center z-10">
          <div className="flex flex-row space-x-4 items-center">
            <div className="">
              <h1 className="text-white text-2xl mb-6 font-arialroundedmtbold">
              ¿Dónde quieres ir?
              </h1>
              <input
                ref={inputRef}
                type="text"
                name="ciudad"
                placeholder="Por ej: Buenos Aires"
                className="px-4 py-2 w-64 rounded-md bg-white/80"
                onKeyUp={filtrarCiudad}
              />
            </div>
            <div className="">
              <h1 className="text-white text-2xl mb-6 font-arialroundedmtbold">
                ¿Qué buscas?
              </h1>
              <input
                ref={cityInputRef}
                type="text"
                name="servicio"
                value={selectedService}
                readOnly
                className="px-4 py-2 w-64 rounded-md bg-white/80"
                onClick={() => setIsOpen(!isOpen)}
              />
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-2 focus:outline-none"
              >
                <FontAwesomeIcon icon={faChevronDown} style={{ color: "#ffffffa7" }} />
              </button>
            </div>
            <div
        className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
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
        </div>
        </div>

      </div>

      
    
  )
};

export default TravelSearch;
