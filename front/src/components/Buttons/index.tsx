"use client";
import { useRouter } from 'next/navigation';

export const BlogButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/blog-article');
  };

  return (
    <button 
      onClick={handleClick}
    >
      Leer Más
    </button>
  );
};

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
        <button onClick={handleClick}>Registrarse</button>
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
      >
        Explorar Destinos
      </button>
    );
  };