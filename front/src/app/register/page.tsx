import Register from "@/components/Register";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-8">
      <div className="flex max-w-4xl w-full space-x-8">
        <div className="flex-1 bg-white shadow-md rounded-lg p-8">
          <Register />
        </div>

        <div className="w-80 flex flex-col justify-between">
          <div className="bg-white shadow-md p-6 mb-4 rounded-full">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-fit bg-white rounded-full flex items-center justify-center text-gray-600">
               <Image
              src="https://res.cloudinary.com/ddzcann0m/image/upload/v1726790351/wolbf7thf78to3chhlk8.png"
              width={400}
              height={300}
              alt="Sivoy"
              className="z-10"
            />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}