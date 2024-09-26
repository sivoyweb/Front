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

          <div className="bg-white shadow-md rounded-lg p-6">
            {/* <button
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Iniciar sesión con Google
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}