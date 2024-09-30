// components/BlogLoader.tsx

"use client";

import { useEffect, useState } from "react";
import { fetchBlog } from "@/lib/server/fetchBlog";
import { IBlogArticle } from "@/interfaces/interfaces";
import { BlogGrid } from "@/components/BlogGrid";

const BlogLoader = () => {
    const [blogArticles, setBlogArticles] = useState<IBlogArticle[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBlogArticles = async () => {
            try {
                const articles = await fetchBlog();
                setBlogArticles(articles);
            } catch (error) {
                setError("No se pudieron cargar los artículos del blog.");
                console.error(error);
            }
        };

        loadBlogArticles();
    }, []); // Dependencias vacías para que solo se ejecute una vez

    if (error) return <div>{error}</div>; // Manejo de error simple

    return <BlogGrid blogArticles={blogArticles} />;
};

export default BlogLoader;
