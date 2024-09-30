"use client"

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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
                src={imageUrl}
                alt={blogArticles.title} // Verifica que blogArticles no sea undefined
                width={300}
                height={200}
                className="w-full object-cover"
            />
            <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">{blogArticles.date}</p>
                <h2 className="text-xl font-semibold mb-4">{blogArticles.title}</h2>
                <button onClick={handleClick}>
                    Leer Más
                </button>
            </div>
        </div>
    );
};
