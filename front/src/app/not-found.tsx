import { NotFoundButton } from "@/components/Buttons";
import Image from "next/image";


export default function ErrorPage() {
    return (
      <div className="flex h-screen items-center justify-center px-8">
        <div className="text-center">
          <h1 className="text-8xl font-arialroundedmtbold text-sivoy-blue mb-14 -mt-16">404</h1>
          <Image src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728048850/si-voy/ywogonxlxc54vzglsz8t.png" alt="lápiz roto"
          width={600} height={600}/>
          <p className="md:text-xl text-sivoy-blue mt-8 mb-8">
            ¡Lo sentimos! La página que está buscando no existe.
          </p>
          <NotFoundButton/>
        </div>
      </div>
    );
  }
  