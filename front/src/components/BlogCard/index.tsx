"use client";

import Image from "next/image";
import { IBlogArticleProps } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";

export const BlogCard = ({ blogArticles, image }: IBlogArticleProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/blog-article/${blogArticles.id}`);
    };

    // Manejo de imagen para evitar errores
    const imageUrl = image?.url || "/path/to/placeholder/image.jpg"; // Agregar un placeholder si image es undefined

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
            <div className="relative w-full h-[200px]"> {/* Contenedor con tamaño fijo */}
                <Image
                    src={imageUrl}
                    alt={blogArticles.title} // Verifica que blogArticles no sea undefined
                    fill // Llenar el contenedor
                    className="object-cover" // Mantener la relación de aspecto
                />
            </div>
            <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">{blogArticles.date}</p>
                <h2 className="text-xl font-semibold mb-4 text-sivoy-blue">{blogArticles.title}</h2>
                <button onClick={handleClick}>
                    Leer Más
                </button>
            </div>
        </div>
    );
};