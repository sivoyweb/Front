"use client"

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWheelchairMove, faMapLocationDot, faGlobe, faFileLines } from "@fortawesome/free-solid-svg-icons"

export const HomeServicesGrid = () => {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/business-services`);
    };

    return (
        <div className="ml-5 mr-5">
        <div>
          <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">Servicios Adicionales</h2>
          <p className="text-lg text-sivoy-blue mt-1">Todos los servicios pueden realizarse de forma presencial o virtual.</p>
        </div>
      
        <div className="m-4">
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 4k:grid-cols-6 gap-6">
            <div className="relative isolate m-1" onClick={handleClick}>
              <div className="top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl transition-transform hover:scale-105 duration-300">
                <span className="inline-block mb-4 pt-2 pr-2">
                  <FontAwesomeIcon icon={faWheelchairMove} size="2xl" style={{ color: "#229764" }} />
                </span>
                <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Consultoría en Turismo Accesible</h4>
                <p className="text-sivoy-blue">
                  Consultoría a agencias de viajes y operadores turísticos en la organización y diseño de rutas para personas o grupos con movilidad reducida.
                </p>
              </div>
            </div>
      
            <div className="relative isolate m-1" onClick={handleClick}>
              <div className="top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl transition-transform hover:scale-105 duration-300">
                <span className="inline-block mb-4 pt-2 pr-2">
                  <FontAwesomeIcon icon={faMapLocationDot} size="2xl" style={{ color: "#229764" }} />
                </span>
                <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Itinerarios Accesibles Personalizados</h4>
                <p className="text-sivoy-blue">
                  Diseño de itinerarios adaptados a cada necesidad en particular con énfasis en el trato personalizado con el viajero.
                </p>
              </div>
            </div>
      
            <div className="relative isolate m-1" onClick={handleClick}>
              <div className="top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl transition-transform hover:scale-110 duration-300">
                <span className="inline-block mb-4 pt-2 pr-2">
                  <FontAwesomeIcon icon={faGlobe} size="2xl" style={{ color: "#229764" }} />
                </span>
                <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Asesoramiento en Diseño Universal</h4>
                <p className="text-sivoy-blue">
                  Consultoría en accesibilidad universal a hoteles, empresas y proveedores de productos turísticos.
                </p>
              </div>
            </div>
      
            <div className="relative isolate m-1 transition-transform hover:scale-105 duration-300" onClick={handleClick}>
              <div className="top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl">
                <span className="inline-block mb-4 pt-2 pr-2">
                  <FontAwesomeIcon icon={faFileLines} size="2xl" style={{ color: "#229764" }} />
                </span>
                <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Capacitaciones</h4>
                <p className="text-sivoy-blue">
                  Capacitaciones en diseño universal y en trato adecuado a personas con movilidad reducida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
}