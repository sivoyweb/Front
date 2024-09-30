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

  const shortDescription =
    travels.description.length > 100
      ? travels.description.slice(0, 100) + "..."
      : travels.description;

  return (
    <div className='flex justify-center mb-6'> {/* Aumentamos el espacio entre tarjetas con mb-6 */}
      <div className="w-64 bg-white rounded-lg shadow transition-transform duration-300 hover:scale-105">
        <div onClick={handleClick} className="cursor-pointer">
          <div className="relative w-full h-48">
            <Image 
              className="rounded-t-lg object-cover" 
              src={imagen.url} 
              alt={travels.name} 
              layout="fill" 
            />
          </div>
        </div>
        <div className="p-4">
          <div onClick={handleClick} className="cursor-pointer">
            <div className="mb-1 gap-1 flex justify-between">
              {/* Título justificado a la izquierda */}
              <h5 className="mb-1 text-lg text-sivoy-blue font-arialroundedmtbold"> 
                {travels.name}
              </h5>
            </div>
          </div>
          <p className="text-sm text-sivoy-blue mt-2 text-left">
            {shortDescription}
          </p>
          <button 
            onClick={handleClick} 
            className="mt-4 px-2 py-1 text-sm"
          >
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
}

export default TravelCard;
