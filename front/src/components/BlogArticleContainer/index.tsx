// components/BlogArticleContainer.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchBlogArticleById } from "@/lib/server/fetchBlog";
import { IBlogArticle } from "@/interfaces/interfaces";
import { BlogArticle } from "@/components/BlogArticle";

export const BlogArticleContainer = () => {
  const [article, setArticle] = useState<IBlogArticle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathArray = window.location.pathname.split("/");
      const articleId = pathArray[pathArray.length - 1];
      setId(articleId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const loadBlogArticle = async () => {
        try {
          const blogArticle = await fetchBlogArticleById(id);
          setArticle(blogArticle);
        } catch (error) {
          setError("No se pudo cargar el artículo del blog.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      loadBlogArticle();
    }
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>No se encontró el artículo.</div>;

  return <BlogArticle article={article} />;
};

