"use client";

import { useRouter } from 'next/navigation';


export const LoginButton = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push("/login");
      };

    return ( <div>
        <button onClick={handleClick}>Iniciar Sesión</button>
    </div> );
};

export const RegisterButton = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push("/register");
      };

    return ( <div>
        <button onClick={handleClick}>Registro</button>
    </div> );
};

export const HomeButton = () => {
    const router = useRouter();
  
    const handleClick = () => {
      router.push('/destinations');
    };
  
    return (
      <button 
        onClick={handleClick}
        className='4k:text-2xl'
      >
        Explorar Destinos
      </button>
    );
};

export const NotFoundButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleClick}
      className='text-xl'
    >
      Volver al Home
    </button>
  )
};

export const DonationButton = () => {
  const router = useRouter ();

  const handleClick = () => {
    router.push("/donations");
  };

  return (
    <button
      onClick={handleClick}
      className='bg-sivoy-gradient 4k:text-2xl ml-6'
    >
      Ayúdanos a Crecer
    </button>
  );
}