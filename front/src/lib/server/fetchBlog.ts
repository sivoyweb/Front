import { IBlogArticle } from "@/interfaces/interfaces";

export async function fetchBlog(): Promise<IBlogArticle[]> {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/blogs");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const blogArticles = await response.json();
        return blogArticles;
    } catch (error) {
        throw error;
    }
};


export async function fetchBlogArticleById(id: string): Promise<IBlogArticle> {
    const response = await fetch(`https://api-sivoy.onrender.com/blogs/${id}`);
    const blogArticle = await response.json();
    return blogArticle;
};