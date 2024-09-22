/*"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

function DestinationsCard() {

  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail/${travels.id}`);
  };

    return (
  <div className='flex justify-center'>
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 transition-transform duration-300 hover:scale-110">
      <Link href="#">
        <div>
          <Image 
            className="rounded-t-lg" 
            src={travels.image} 
            alt={travels.name} 
            width={400} 
            height={250} 
          />
        </div>
      </Link>
      <div className="p-5">
        <Link href="#">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {travels.name}
            </h5>
          </div>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
        <button
          onClick={handleClick}
          className="bg-black text-white font-semibold py-2 px-4 m-2 rounded-lg shadow-md hover:bg-yellow-300 hover:text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50 text-center"
        >
          Detalles
        </button>
      </div>
    </div>
    </div>
    );
}

export default DestinationsCard;*/