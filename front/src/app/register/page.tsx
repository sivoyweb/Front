import ButtonLogin from "@/components/ButtonLogin";
import Register from "@/components/Register";
import Image from "next/image";

function RegisterPage() {
  return (
    <div className="relative bg-sivoy-gradient">

      <div className="relative z-10 flex justify-center items-center h-full bg-black bg-opacity-50">
        <div className="flex flex-col justify-center p-8">
          <h1 className="text-white text-4xl mb-6 text-center">
          Ingrese sus datos para crear la cuenta en Sí, Voy! (* Campos Obligatorios)
          </h1>
          <Register />
          <h2 className="text-white text-4xl mb-6 text-center m-3">Si ya tenes una cuenta en si voy ingresa aca: <ButtonLogin/></h2>
          
        </div>

        <div className="m-6 bg-white rounded-full p-5">
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
  );
}

export default RegisterPage;