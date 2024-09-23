import TravelGridComponent from "@/components/TravelGrid";

import Image from "next/image";

function Destinations() {
  return (
    <div>
      <div className="relative w-full h-[500px]">
        <Image
          src="http://www.sivoy.com.ar/assets/upload/slider-2.jpg"
          alt="Login"
          fill
          priority={true}
          className="object-cover"
        />

        <div className="absolute p-8 inset-0 flex flex-row justify-center items-center z-10">
          <div className="flex flex-row space-x-4 items-center">
            <div className="">
              <h1 className="text-white text-2xl mb-6 font-arialroundedmtbold">¿Qué servicio busca?</h1>
              <input
                type="text"
                placeholder="Escribe algo..."
                className="px-4 py-2 w-64 rounded-md bg-white/80"
              />
            </div>
            <div className="">
              <h1 className="text-white text-2xl mb-6 font-arialroundedmtbold">¿En dónde?</h1>
              <input
                type="text"
                placeholder="Escribe algo..."
                className="px-4 py-2 w-64 rounded-md bg-white/80"
              />
            <button className="ml-8">
              Buscar
            </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-left ml-8 py-6 font-arialroundedmtbold text-sivoy-blue -mb-4">Balnearios</h1>
        <div className='col-auto justify-center mb-10'>
          <TravelGridComponent />
        </div>
        <h1 className="text-2xl font-bold text-left ml-8 py-6 font-arialroundedmtbold text-sivoy-blue -mb-4">Gastronomía</h1>
        <div className='col-auto justify-center mb-10'>
          <TravelGridComponent />
        </div>
        <h1 className="text-2xl font-bold text-left ml-8 py-6 font-arialroundedmtbold text-sivoy-blue -mb-4">Alojamientos</h1>
        <div className='col-auto justify-center mb-10'>
          <TravelGridComponent />
        </div>
      </div>
    </div>
  );
}

export default Destinations;