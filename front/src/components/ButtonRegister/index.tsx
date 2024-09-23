"use client"
import { useRouter } from "next/navigation";


function ButtonRegister() {
    const router = useRouter();
    const handleClick = () => {
        router.push("/register");
      };

    return ( <div>
        <button className="rounded-3xl bg-sivoy-orange py-2 px-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-700 focus:shadow-none active:bg-orange-700 hover:bg-orange-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={handleClick}>Registrarse</button>
    </div> );
}

export default ButtonRegister;