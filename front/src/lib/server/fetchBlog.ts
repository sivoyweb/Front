import { IBlogArticle } from "@/interfaces/interfaces";

export async function fetchBlog(): Promise<IBlogArticle[]> {
    try {
        const response = await fetch("http://localhost:3001/blog");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const blogArticles = await response.json();
        return blogArticles;
    } catch (error) {
        console.error("Error en fetchBlog:", error);
        throw error;
    }
};


export async function fetchBlogArticleById(id: string): Promise<IBlogArticle> {
    const response = await fetch(`http://localhost:3001/blog/${id}`);
    const blogArticle = await response.json();
    return blogArticle;
};