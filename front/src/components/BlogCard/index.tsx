"use client";

import Image from "next/image";
import { IBlogArticleProps } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";

export const BlogCard = ({ article }: IBlogArticleProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/blog-article/${article.id}`);
    };

    // Manejo de imagen y alt para evitar errores
    const imageUrl = article.images[0]?.url || "/path/to/placeholder/image.jpg";
    const imageAlt = article.images[0]?.alt || "Imagen del blog"; // Tomar alt desde IImageBlog

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform">
            <div className="relative w-full h-[200px]">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                <h2 className="text-xl font-arialroundedmtbold mb-4 text-sivoy-blue line-clamp-1">{article.title}</h2>
                <button onClick={handleClick}>
                    Leer Más
                </button>
            </div>
        </div>
    );
};
