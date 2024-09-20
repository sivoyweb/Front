import Login from "@/components/Login";
import Image from "next/image";

function LoginPage() {
  return (
    <div className="relative">
      <Image
        src="https://res.cloudinary.com/ddzcann0m/image/upload/v1726792832/lay5koxqn1haaos3wqmm.jpg"
        alt="Login"
        fill
        className="object-cover z-0"
        priority={true}
      />

      <div className="relative z-10 flex justify-center items-center h-full bg-black bg-opacity-50">
        <div className="flex flex-col justify-center p-8">
          <h1 className="text-white text-4xl mb-6 text-center">
            Ingrese su nombre de usuario y contraseña para acceder.
          </h1>
          <Login />
          <h2 className="text-white text-4xl mb-6 text-center m-3">¿Todavía no sos parte de la comunidad de Sí, Voy!? Registrate aca: <button className=" w-auto p-3 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-sivoy-green">Registrarse</button></h2>
        </div>

        <div className="ml-6 bg-white rounded-full p-5">
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

export default LoginPage;