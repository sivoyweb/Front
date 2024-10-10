"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { IPromotionAdmin } from "@/interfaces/interfaces";
import { fetchPromotions } from "@/lib/server/fetchPromotions";

export const PromotionsCarousel = () => {
  const [promotions, setPromotions] = useState<IPromotionAdmin[]>([]);

  useEffect(() => {
    const getPromotions = async () => {
      try {
        const data = await fetchPromotions();
        setPromotions(data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    getPromotions();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Por defecto mostramos las flechas
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Ocultamos las flechas en pantallas menores a 1024px
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Ocultamos las flechas en pantallas menores a 600px
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Ocultamos las flechas en pantallas menores a 480px
        },
      },
    ],
  };

  return (
    <div className="mb-4 mt-4">
      <Slider {...settings}>
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="relative isolate mb-1 mt-1 p-8 bg-white rounded-2xl flex flex-col justify-center items-center"
          >
            <h2 className="text-xl font-arialroundedmtbold mb-2">{promo.name}</h2>
            <p className="mb-4 text-gray-700">{promo.description}</p>
            <div className="text-sm flex flex-col items-center">
              <p>
                <span className="font-arialroundedmtbold text-lg">Válido desde: </span>
                <span className="">{new Date(promo.validFrom).toLocaleDateString()}</span>
              </p>
              <p>
                <span className="font-arialroundedmtbold text-lg">hasta: </span>
                <span className="">{new Date(promo.validUntil).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};