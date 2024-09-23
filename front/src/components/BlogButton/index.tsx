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