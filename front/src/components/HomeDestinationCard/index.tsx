"use client"

import { ITravelCardProps } from "@/interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HomeDestinationCard({ travels, index }: ITravelCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/detail/${travels.id}`);
    };

    const imageIndex = travels.images.length > 0 ? (index ?? 0) % travels.images.length : 0;
    const imagen = travels.images[imageIndex];


    return (
        <div className='flex justify-center'>
            <div className="w-64 md:w-96 lg:w-[28rem] bg-white rounded-lg shadow transition-transform duration-300 hover:scale-105">
                <div onClick={handleClick} className="cursor-pointer">
                    <div className="relative w-full h-36 md:h-40 lg:h-44"> 
                        <Image
                            className="rounded-t-lg object-cover" 
                            src={imagen?.url || ''} 
                            alt={travels.name} 
                            layout="fill" 
                        />
                    </div>
                </div>
                <div className="p-4">
                    <div onClick={handleClick} className="cursor-pointer">
                        <div className="mb-1 gap-1 flex justify-between">
                        <h1 className="mb-1 text-sm md-lg:text-sm lg:text-sm xl:text-base text-sivoy-blue font-arialroundedmtbold line-clamp">
                        {travels.name}
                        </h1>
                        <div className="mb-1 gap-1 flex items-top mt-1">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"         
                            className="icon icon-tabler icon-tabler-star" 
                            width="15" 
                            height="15" 
                            viewBox="0 0 24 24" 
                            strokeWidth="2.5" stroke="#df5430" 
                            fill="#df5430" 
                            strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                        <p className="text-xs text-sivoy-blue">{travels.averageStars}</p>    
                    </div>
                </div>
                <div className="mb-1 gap-1 flex items-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tag"    
                        width="15" 
                        height="15" 
                        viewBox="0 0 24 24"     
                        strokeWidth="2.5" stroke="#df5430"     
                        fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
                    </svg>
                    <h2 className="text-sm tracking-tight text-sivoy-blue">{travels.serviceType}</h2>
                </div>
            </div>
        </div>
    </div>
</div>

    );
}

export default HomeDestinationCard;