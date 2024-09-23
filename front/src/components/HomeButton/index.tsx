"use client";

import { useRouter } from 'next/navigation';

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