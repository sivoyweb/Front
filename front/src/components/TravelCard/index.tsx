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
    <div className='flex justify-center mb-6 rounded-lg'>
      <div className="bg-white rounded-lg shadow transition-transform duration-300 hover:scale-105 max-w-md w-full"> 
        <div onClick={handleClick} className="cursor-pointer">
          <div className="relative w-full h-48 overflow-hidden rounded-lg"> 
            <Image 
              className="rounded-t-lg object-cover w-full h-full scale-110"  
              src={imagen?.url || ''} 
              alt={travels.name}
              layout="fill" 
              objectFit="cover" 
            />
          </div>
        </div>
        <div className="p-4 flex flex-col h-[200px] justify-between">
          <div onClick={handleClick} className="cursor-pointer">
            <div className="text-start">
              <h5 className="mb-1 text-lg text-sivoy-blue font-arialroundedmtbold line-clamp"> 
                {travels.name}
              </h5>
            </div>
            <p className="text-base text-sivoy-blue mt-2 text-left line-clamp-3">
              {travels.description}
            </p>
          </div>
          <a className="flex justify-end items-center font-arialroundedmtbold text-sivoy-green" href={`/detail/${travels.id}`}>
    Ver Más
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevrons-right" width="20" height="44" viewBox="0 0 24 24" strokeWidth="3" stroke="#1a7970" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
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
