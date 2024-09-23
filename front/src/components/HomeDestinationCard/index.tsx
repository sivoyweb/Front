"use client"
import { ITravelCardProps } from "@/interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HomeDestinationCard({ travels, index }: ITravelCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/detail/${travels.id}`);
    };

    const imageIndex = travels.images.length > 0 ? (index ?? 0) % travels.images.length : 0; // Usar coalescencia nula
    const imagen = travels.images[imageIndex];

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
                <div className="p-4">
                    <div onClick={handleClick} className="cursor-pointer">
                        <h5 className="mb-2 text-base tracking-tight text-sivoy-blue font-arialroundedmtbold">
                            {travels.name}
                        </h5>
                    </div>
                    <div className="flex justify-start -ml-3 mt-4">
                        <button onClick={handleClick}>
                            Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeDestinationCard;
