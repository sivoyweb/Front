import Register from "@/components/Register";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex justify-center min-h-screen p-4 lg:p-8">
      <div className="flex max-w-4xl w-full">
        {/* Columna izquierda - Formulario de registro */}
        <div className="flex-1 bg-white shadow-md rounded-s-3xl p-6 lg:p-8">
          <h2 className="text-2xl text-sivoy-blue mb-6 font-arialroundedmtbold">Registro</h2>
          <Register />
        </div>

        {/* Columna derecha - Logo de Sivoy */}
        <div className="hidden lg:flex items-center justify-center w-full lg:w-80 p-4 relative">
          <div className="absolute inset-0 bg-sivoy-gradient  rounded-e-3xl"></div>
          <div className="bg-white shadow-md rounded-full p-4 relative z-10">
            <Image
              src="https://res.cloudinary.com/ddzcann0m/image/upload/v1726790351/wolbf7thf78to3chhlk8.png"
              width={200} // Ajusta el tamaño según sea necesario
              height={150} // Ajusta el tamaño según sea necesario
              alt="Logo de Sí, Voy"
              className="object-contain max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
