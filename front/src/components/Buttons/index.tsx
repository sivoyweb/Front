"use client";

import { useRouter } from 'next/navigation';


export const LoginButton = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push("/login");
      };

    return ( <div className='justify-center'>
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
        className='text-xs md:text-base'
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
      className='bg-sivoy-gradient ml-6 text-xs md:text-base'
    >
      Ayúdanos a Crecer
    </button>
  );
}