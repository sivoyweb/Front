
import Image from "next/image";
import { fetchTravelById } from "@/lib/server/fetchTravels";
import CarouselTravels from "@/components/CarouselTravels";
import StarComponent from "@/components/StarComponent";
import MapsComponent from "@/components/MapsComponent";
import ReviewsComponent from "@/components/ReviewsComponent";
import StarRating from "@/components/RatingComponent";
import Link from "next/link";





const TravelDetail = async({ params }: { params: { travelId: string } }) => {
  
  const travels = await fetchTravelById(params.travelId);
  const imagen = travels.images[0];


  return (
    
    
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 pb-8 pt-6">
    <div className="relative w-full h-[450px] lg:h-[550px]">
      <Image
        src={imagen?.url || ""}
        alt={travels.name}
        fill
        priority={true}
        className="object-cover rounded-3xl"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sivoy-blue bg-white/80 p-8 w-3/4 rounded-3xl">
        <h2 className="text-xl lg:text-3xl py-4 text-sivoy-blue">
          {travels.serviceType}
        </h2>
        <h1 className="py-4 text-4xl lg:text-6xl font-arialroundedmtbold text-sivoy-blue">
          {travels.name}
        </h1>
        <h2 className="text-lg lg:text-2xl py-4 text-sivoy-blue">
          {travels.country} - {travels.city}
        </h2>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 w-full lg:w-auto m-1 mt-8">
      <div className="w-[90%] mx-auto">
        {/* Ícono de regreso sobre la descripción */}
        <div className="mb-4">
          <Link href="/destinations" className="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevrons-left"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="#1a7970"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 7l-5 5l5 5" />
              <path d="M17 7l-5 5l5 5" />
            </svg>
          </Link>
        </div>

        {/* Texto de la descripción */}
        <p className="text-sivoy-blue text-xl mb-6 mt-4 text-justify">
          {travels.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-xl font-arialroundedmtbold">Sitio web</h2>
            <p className="text-sivoy-blue text-lg">{travels.website}</p>
          </div>
          <div>
            <h2 className="text-xl font-arialroundedmtbold">Dirección</h2>
            <p className="text-sivoy-blue text-lg">{travels.address}</p>
          </div>
          
         <div>
            <h2 className="text-xl font-arialroundedmtbold">Email</h2>
            <p className="text-sivoy-blue text-lg">{travels.email}</p>
          </div>
          <div>
            <h2 className="text-xl font-arialroundedmtbold">Teléfono</h2>
            <p className="text-sivoy-blue text-lg">{travels.phone}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-arialroundedmtbold">Calificación</h2>
            <StarRating rating={travels.averageStars} />
          </div>
        </div>
      </div>

      <ReviewsComponent travelId={travels.id} />

      <div className="w-[92%] mx-auto mt-8 px-4">
        <StarComponent travelId={travels.id} />
      </div>

      <div className="w-[92%] mx-auto mt-8 px-4">
        <MapsComponent address={travels.address} />
      </div>

      <div className="w-[92%] mx-auto mt-8 px-4">
        <CarouselTravels items={travels.images} />
      </div>
    </div>
  </div>
  );
}

export default TravelDetail;
