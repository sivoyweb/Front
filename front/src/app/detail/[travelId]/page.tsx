import Image from "next/image";
import { fetchTravelById } from "@/lib/server/fetchTravels";
import CarouselTravels from "@/components/CarouselTravels";
import StarComponent from "@/components/StarComponent";
import MapsComponet from "@/components/MapsComponent";
import ReviewsComponent from "@/components/ReviewsComponent";

async function TravelDetail({params}:{params:{travelId:string}}) {
    const travels = await fetchTravelById(params.travelId);
    const imagen = travels.images[0];
    const imagenes = [
      {id: "1",url:"https://r4.wallpaperflare.com/wallpaper/29/716/942/bosque-invierno-lago-paisaje-wallpaper-32b12220bd161e1bda58e2e510c8c942.jpg", publicId:"nieve"},
      {id: "2",url:"https://r4.wallpaperflare.com/wallpaper/106/85/265/austria-bosque-lago-naturaleza-wallpaper-48fcd1d9b00c50cb8f6ed85f83761f5b.jpg", publicId:"lago"},
      {id: "3",url:"https://r4.wallpaperflare.com/wallpaper/504/836/940/architecture-bridges-building-cities-wallpaper-2e0c7c16d4188ed546fdbcacf6ed39ec.jpg", publicId:"templo"}
    ];
    const address = "Balneario San Cayetano";
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-8 pb-8 pt-1">
          <div className="relative w-full h-[500px] ">
            <Image
              src={imagen.url}
              alt={travels.name}
              fill
              priority={true}
              className="object-cover bg-black/50"
            />
            <div className="absolute left-60 top-1/2 transform -translate-y-1/2 text-5xl font-bold text-white p-6 bg-black/60 rounded-xl">
            
            <h2 className="text-2xl mb-4">{travels.serviceType}</h2>
            <h1 className="py-3">
              {travels.name}
            </h1>
            <h2 className="text-xl mt-5">{travels.country} - {travels.city}</h2>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-full">
            <div>
            <h1 className="text-2xl mb-4 w-[90%] mx-auto">Descripcion:</h1>
            <p className="text-gray-700 mb-4 w-[90%] mx-auto">{travels.description}</p>
            <h1>Sitio web</h1>
            <p className="text-xl font-semibold text-gray-900 mb-6 w-[90%] mx-auto"> {travels.website}</p>
            <h1>Email</h1>
            <p className="text-xl font-semibold text-gray-900 mb-6 w-[90%] mx-auto"> {travels.email}</p>
            <h1>Direccion</h1>
            <p className="text-xl font-semibold text-gray-900 mb-6 w-[90%] mx-auto"> {travels.address}</p>
            <h1>Telefono</h1>
            <p className="text-xl font-semibold text-gray-900 mb-6 w-[90%] mx-auto"> {travels.phone}</p>
            </div>
            <StarComponent travelId={travels.id}/>
            <div >
            <div className="relative w-[90%] mx-auto">
              <CarouselTravels items={imagenes} />
            </div>
            <MapsComponet address={address}/>
            </div>
            <div>
              <ReviewsComponent travelId={travels.id}/>
            </div>
          </div>
        </div>
    );
}

export default TravelDetail;