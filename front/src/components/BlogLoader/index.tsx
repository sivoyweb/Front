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
    }, []);

    if (error) return <div>{error}</div>;

    return <BlogGrid blogArticles={blogArticles} />;
};

export default BlogLoader;
