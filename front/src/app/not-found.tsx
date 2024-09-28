import { NotFoundButton } from "@/components/Buttons";
import pencil from "@/assets/pencil.png"
import Image from "next/image";


export default function ErrorPage() {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-8xl font-arialroundedmtbold text-sivoy-blue mb-14 -mt-16">404</h1>
          <Image src={pencil} alt="lápiz roto"/>
          <p className="text-xl text-sivoy-blue mt-8 mb-8">
            ¡Lo sentimos! La página que estás buscando no existe.
          </p>
          <NotFoundButton/>
        </div>
      </div>
    );
  }
  