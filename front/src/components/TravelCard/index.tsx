"use client"
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
    <div className='flex justify-center'>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-2 transition-transform duration-300 hover:scale-110">

        <div onClick={handleClick} className="cursor-pointer">
          <Image 
            className="rounded-t-lg" 
            src={imagen.url} 
            alt={travels.name} 
            width={400} 
            height={250} 
          />
        </div>
        <div className="p-5">
          <div onClick={handleClick} className="cursor-pointer">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-sivoy-blue font-arialroundedmtbold">
              {travels.name}
            </h5>
          </div>
          <p className="mb-3 font-normal text-sivoy-blue">
            {travels.description}
          </p>
          <button
            onClick={handleClick}
          >
            Detalles
          </button>
        </div>
      </div>
    </div>
  );
}

export default TravelCard;