
import TravelGridComponent from "@/components/TravelGrid";
import TravelSearch from "@/components/TravelSearch";
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
       <TravelSearch />
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