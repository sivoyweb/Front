"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
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
        console.error(error);
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-4 mt-4">
      <Slider {...settings}>
        {alliances.map((alliance) => (
          <div
            key={alliance.id}
            className="relative isolate mb-1 mt-1 cursor-pointer flex justify-center items-center"
            onClick={() => handleClick(alliance.url)}
          >
            <div className="w-full h-48 p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
              {alliance.image.url ? (
                <Image
                  src={alliance.image.url as string}
                  alt={alliance.name}
                  className="max-w-full max-h-full object-contain"
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
