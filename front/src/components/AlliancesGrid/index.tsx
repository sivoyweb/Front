"use client"

import Image from "next/image";
import noun from "@/assets/noun.jpg";
import porigualmas from "@/assets/porigualmas.png";
import viajow from "@/assets/viajow.png";
import margatour from "@/assets/margatour.png";

export const AlliancesGrid = () => {

    const handleClick = (url: string) => {
        window.location.href = url;
    };

    return (
<div className="mb-4 mt-4">
  <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    <div className="relative isolate mb-1 mt-1" onClick={() => handleClick('https://wow.viajow.com/ES/')}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src={viajow} alt="viajow" className="max-w-full max-h-full" />
      </div>
    </div>

    <div className="relative isolate mb-1 mt-1" onClick={() => handleClick('https://nouneventos.com.ar/')}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src={noun} alt="noun" className="max-w-full max-h-full" />
      </div>
    </div>
    
    <div className="relative isolate mb-1 mt-1" onClick={() => handleClick('https://www.porigualmas.org')}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center 2xl:mt-8 md:mt-8 sm:mt-8">
        <Image src={porigualmas} alt="por igual más" className="max-w-full max-h-full" />
      </div>
    </div>

    <div className="relative isolate mb-1 mt-1" onClick={() => handleClick('https://margatour.com.ar/')}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src={margatour} alt="margatour" className="max-w-full max-h-full" />
      </div>
    </div>
  </div>
</div>
    );
};