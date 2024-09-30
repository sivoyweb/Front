import Image from "next/image";
import { fetchTravelById } from "@/lib/server/fetchTravels";
import CarouselTravels from "@/components/CarouselTravels";
import StarComponent from "@/components/StarComponent";
import MapsComponet from "@/components/MapsComponent";
import ReviewsComponent from "@/components/ReviewsComponent";
import StarRating from "@/components/RatingComponent";

async function TravelDetail({ params }: { params: { travelId: string } }) {
  const travels = await fetchTravelById(params.travelId);
  const imagen = travels.images[0];
  const imagenes = [
    {
      id: "1",
      url: "https://r4.wallpaperflare.com/wallpaper/29/716/942/bosque-invierno-lago-paisaje-wallpaper-32b12220bd161e1bda58e2e510c8c942.jpg",
      publicId: "nieve",
    },
    {
      id: "2",
      url: "https://r4.wallpaperflare.com/wallpaper/106/85/265/austria-bosque-lago-naturaleza-wallpaper-48fcd1d9b00c50cb8f6ed85f83761f5b.jpg",
      publicId: "lago",
    },
    {
      id: "3",
      url: "https://r4.wallpaperflare.com/wallpaper/504/836/940/architecture-bridges-building-cities-wallpaper-2e0c7c16d4188ed546fdbcacf6ed39ec.jpg",
      publicId: "templo",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 pb-8 pt-6">
      <div className="relative w-full h-[450px] lg:h-[550px]">
        <Image
          src={imagen.url}
          alt={travels.name}
          fill
          priority={true}
          className="object-cover bg-black/50"
        />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white p-6 bg-black/60 rounded-lg shadow-lg w-4/5 lg:w-3/5">
          <h2 className="text-xl lg:text-2xl mb-2">{travels.serviceType}</h2>
          <h1 className="py-2 text-3xl lg:text-4xl font-bold">{travels.name}</h1>
          <h2 className="text-lg lg:text-xl mt-3">
            {travels.country} - {travels.city}
          </h2>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-full lg:w-3/4 mt-8">
        <div className="w-[90%] mx-auto">
          <h1 className="text-2xl mb-4 font-semibold">Descripción:</h1>
          <p className="text-gray-700 mb-6">{travels.description}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Sitio web</h2>
              <p className="text-gray-900">{travels.website}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email</h2>
              <p className="text-gray-900">{travels.email}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Dirección</h2>
              <p className="text-gray-900">{travels.address}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Teléfono</h2>
              <p className="text-gray-900">{travels.phone}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Calificacion</h2>
              <StarRating rating={travels.averageStars}/>
            </div>
          </div>
        </div>

        <StarComponent travelId={travels.id} />

        <div className="w-full lg:w-[80%] mx-auto mt-8">
          <MapsComponet address={travels.address} />
        </div>

        <div className="w-full lg:w-[80%] mx-auto mt-8">
          <CarouselTravels items={imagenes} />
        </div>

        <div className="w-full lg:w-[80%] mx-auto mt-8">
          <ReviewsComponent travelId={travels.id} />
        </div>
      </div>
    </div>
  );
}

export default TravelDetail;