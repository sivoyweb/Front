/*import Image from "next/image";
import { fetchTravelById } from "@/lib/server/fetchTravels";


async function TravelDetail({params}:{params:{travelId:string}}) {
    const travels = await fetchTravelById(params.travelId)
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-lg w-full dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{travels.name}</h1>
          <div className="mb-4 flex justify-center">
            <Image
              src={travels.images}
              alt={travels.name}
              width={300}
              height={300}
              className="object-cover rounded-lg shadow-md"
            />
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{travels.description}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6">$ {travels.price}</p>
        </div>
      </div>
  
    );
}

export default TravelDetail;*/