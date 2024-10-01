"use client";

import { useContext, useRef, useState } from "react";
import { TravelContext } from "@/context/travelContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ITravelSearchProps } from "@/interfaces/interfaces";

const TravelSearch: React.FC<ITravelSearchProps> = ({ onSearchToggle }) => {
  const { travels, setFilteredTravels ,setNoResults} = useContext(TravelContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Seleccione un servicio');
  const services = ["Balneario", "Gastronomía", "Alojamiento"];


  const resetFields = () => {
    setSelectedService('Seleccione un servicio');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  // Función para filtrar viajes
  
  const filtrarTravels = () => {
    const textoCiudad = inputRef.current?.value.toLowerCase() || '';
    const textoServicio = selectedService !== 'Seleccione un servicio' ? selectedService : '';
  
    if (textoCiudad && textoServicio) {
      const resultado = travels.filter((travel) =>
        travel.city.toLowerCase().includes(textoCiudad) &&
        (textoServicio === '' || travel.serviceType === textoServicio)
      );
  
      setFilteredTravels(resultado);
      setNoResults(resultado.length === 0);
      resetFields();
  
      console.log("City:", textoCiudad);
      console.log("Servicio:", textoServicio);
      console.log("Resultado:", resultado);
    } else {
      console.log("Por favor, selecciona un servicio y una ciudad");
    }
  };
  
  const handleSearch = () => {
    filtrarTravels(); // Ejecuta la búsqueda cuando se presiona el botón
    onSearchToggle(true); // Indicar que se está buscando
  };
  
  // Eliminar filtrarTravels de estas funciones
  const handleInputChange = () => {
    // Solo actualiza el valor del campo de ciudad, pero no filtra automáticamente
    onSearchToggle(false); // No estamos buscando hasta que se presione el botón
  };
  
  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    setIsOpen(false);
    onSearchToggle(false); // No estamos buscando hasta que se presione el botón
    console.log("Servicio Seleccionado:", service);
  };
  return (
    <div className="absolute p-8 inset-0 flex flex-col justify-center items-center z-10">
    <div className="flex flex-row space-x-4 items-center">
  
      {/* Campo de Servicio (a la izquierda) */}
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
          <button
            type="button"
            className="ml-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faChevronDown} style={{ color: "#ffffffa7" }} />
          </button>
        </div>
  
        {/* Menú Desplegable */}
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
  
      {/* Campo de Ciudad (a la derecha) */}
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
          disabled={selectedService === 'Seleccione un servicio'}
        />
      </div>
    </div>
  
    {/* Botón de Búsqueda */}
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
