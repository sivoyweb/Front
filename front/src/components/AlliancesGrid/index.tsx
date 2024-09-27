"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";
import noun from "@/assets/noun.jpg"
import porigualmas from "@/assets/porigualmas.png"
import viajow from "@/assets/viajow.png"
import margatour from "@/assets/margatour.png"

export const AlliancesGrid = () => {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/business-services`);
    };

    return (
<div className="m-4">
  <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Primera imagen */}
    <div className="relative isolate m-1" onClick={handleClick}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src={noun} alt="noun" className="max-w-full max-h-full" />
      </div>
    </div>

    {/* Segunda imagen */}
    <div className="relative isolate m-1" onClick={handleClick}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src={porigualmas} alt="por igual más" className="max-w-full max-h-full" />
      </div>
    </div>

    {/* Tercera imagen */}
    <div className="relative isolate m-1" onClick={handleClick}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src={viajow} alt="viajow" className="max-w-full max-h-full" />
      </div>
    </div>

    {/* Cuarta imagen */}
    <div className="relative isolate m-1" onClick={handleClick}>
      <div className="w-full h-auto p-8 bg-white rounded-2xl transition-transform hover:scale-105 duration-300 flex justify-center items-center">
        <Image src={margatour} alt="margatour" className="max-w-full max-h-full" />
      </div>
    </div>
  </div>
</div>

    );
}