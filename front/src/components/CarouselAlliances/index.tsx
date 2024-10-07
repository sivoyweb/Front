"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick"; // Importamos el carrusel
import { fetchAlliances } from "@/lib/server/fetchAlliances";
import { IAlliances } from "@/interfaces/interfaces";

export const AlliancesGrid = () => {
  const [alliances, setAlliances] = useState<IAlliances[]>([]);

  useEffect(() => {
    const getAlliances = async () => {
      try {
        const data = await fetchAlliances();
        setAlliances(data);
      } catch (error) {
        console.error("Error al obtener las alianzas:", error);
      }
    };

    getAlliances();
  }, []);

  const handleClick = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const settings = {
    dots: true, // Muestra puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500,
    slidesToShow: 4, // Número de slides visibles al mismo tiempo
    slidesToScroll: 1, // Número de slides que se desplazan a la vez
    responsive: [
      {
        breakpoint: 1024, // Para pantallas medianas
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Para pantallas pequeñas
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Para pantallas muy pequeñas
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-4 mt-4">
      <Slider {...settings}> {/* Agregamos el carrusel */}
        {alliances.map((alliance) => (
          <div
            key={alliance.id}
            className="relative isolate mb-1 mt-1 cursor-pointer"
            onClick={() => handleClick(alliance.url)}
          >
            <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
              {alliance.image.url ? (
                <Image
                  src={alliance.image.url}
                  alt={alliance.name}
                  className="max-w-full max-h-full"
                  width={200}
                  height={200}
                />
              ) : (
                <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
                  <span>Sin imagen</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};