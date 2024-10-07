"use client";

import { useContext, useRef, useState } from "react";
import { TravelContext } from "@/context/travelContext";

import { ITravelSearchProps } from "@/interfaces/interfaces";

const TravelSearch: React.FC<ITravelSearchProps> = ({ onSearchToggle }) => {
  const { travels, setFilteredTravels ,setNoResults} = useContext(TravelContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Seleccione un servicio');
  const services = ["Balneario", "Gastronomía", "Alojamiento", "Ocio y Recreación", "Actividades Culturales", "Transporte", "Experiencias", "Servicios Personales", "Otro"];

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
     resultado = resultado.filter((travel)=> travel.city.toLowerCase().includes(textoCiudad));

    }

    if(textoServicio){
      resultado = resultado.filter((travel)=> travel.serviceType === textoServicio);
    }
    
      setFilteredTravels(resultado);
      setNoResults(resultado.length === 0);
      resetFields();
  
      console.log("City:", textoCiudad);
      console.log("Servicio:", textoServicio);
      console.log("Resultado:", resultado);
    } 
  
  
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
    console.log("Servicio Seleccionado:", service);
  };
  return (
    <div className="absolute p-8 inset-0 flex flex-col justify-center items-center z-10">
    <div className="flex flex-row space-x-4 items-center">
  
      
  
     
      <div>
        <h1 className="text-white text-2xl mb-6 font-arialroundedmtbold">
          ¿Dónde quieres ir?
        </h1>
        <input
          ref={inputRef}
          type="text"
          name="ciudad"
          placeholder="Por ej: Buenos Aires"
          className="px-4 py-2 w-64 rounded-md bg-white/80"
          onKeyUp={handleInputChange}
        />
      </div>
      <div>
        <h1 className="text-white text-2xl mb-6 font-arialroundedmtbold">
          ¿Qué buscas?
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            name="servicio"
            value={selectedService}
            readOnly
            className="px-4 py-2 w-64 rounded-md bg-gray-300 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          
        </div>
  
       
        {isOpen && (
          <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
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
  
    
    <div className="mt-6">
      <button
        className="px-6 py-2 text-white"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  </div>
  
  
  );
};

export default TravelSearch;
