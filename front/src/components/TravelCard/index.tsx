"use client";

import { ITravelCardProps } from "@/interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";

function TravelCard({ travels }: ITravelCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/detail/${travels.id}`);
  };

  const imagen = travels.images[0];

  return (
    <div className="flex justify-center mb-6 rounded-lg">
      <div className="bg-white rounded-lg shadow transition-transform duration-300 hover:scale-105 max-w-md w-full">
        <div onClick={handleClick} className="cursor-pointer">
          <div className="relative w-full h-48 overflow-hidden rounded-lg">
            <Image
              className="rounded-t-lg object-cover w-full h-full scale-110"
              src={imagen?.url || ""}
              alt={travels.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col h-[200px] justify-between">
          <div onClick={handleClick} className="cursor-pointer">
            <div className="mb-1 gap-1 flex justify-between">
              <h5 className="mb-1 text-lg text-sivoy-blue font-arialroundedmtbold line-clamp text-left">
                {travels.name}
              </h5>
              <div className="flex items-top mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-star"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="#df5430"
                  fill="#df5430"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>
                <p className="text-xs text-sivoy-blue ml-1">
                  {travels.averageStars}
                </p>
              </div>
            </div>

            {/* Renderizar el sello de accesibilidad */}
            <p className="text-xs text-gray-500 mt-1 text-left">{travels.accessibilitySealName}</p>

            <p className="text-sm text-sivoy-blue mt-2 text-left line-clamp-3">
              {travels.description}
            </p>
          </div>

          <a
            className="flex justify-end items-center font-arialroundedmtbold text-sivoy-green"
            href={`/detail/${travels.id}`}
          >
            Ver Más
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevrons-right"
              width="20"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="#1a7970"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7l5 5l-5 5" />
              <path d="M13 7l5 5l-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TravelCard;
