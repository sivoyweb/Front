
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
        <div className="">
          <h1 className="text-white text-4xl mb-6 text-center ">Que servicio busca?</h1>
          <input
            type="text"
            placeholder="..."
            className="px-4 py-2 w-64 rounded-md bg-white/80"
          />
          </div>
          <div className="">
          <h1 className="text-white text-4xl mb-6 text-center">En donde?</h1>
          <input
            type="text"
            placeholder="Escribe algo..."
            className="px-4 py-2 w-64 rounded-md bg-white/80"
          />
          </div>
          <button className="ml-10 px-6 py-4 bg-blue-500 text-white text-2xl rounded-md hover:bg-blue-700">
            Buscar
          </button>
        </div>
      </div>
      <div className="text-center">
         <h1 className="text-4xl font-bold text-left ml-24 py-6">Balneareos</h1>
        <div className='col-auto justify-center mb-20'>
            <TravelGridComponent />
          </div>
          <h1 className="text-4xl font-bold text-left ml-24 py-6">Gastronomia</h1>
          <div className='col-auto justify-center mb-20'>
            <TravelGridComponent />
            </div>
            <h1 className="text-4xl font-bold text-left ml-24 py-6">Alojamientos</h1>
            <div className='col-auto justify-center mb-20'>
            <TravelGridComponent />
      </div>
      </div>
      </div>
    );
}

export default Destinations;