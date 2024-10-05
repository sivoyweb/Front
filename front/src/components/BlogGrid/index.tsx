
import { IBlogArticle } from "@/interfaces/interfaces";
import { BlogCard } from "../BlogCard";

interface BlogGridProps {
    blogArticles: IBlogArticle[]; // Asegúrate de que esta prop sea un array de artículos
}

export const BlogGrid: React.FC<BlogGridProps> = ({ blogArticles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogArticles.map((blogArticle) => (
                <BlogCard 
                    key={blogArticle.id} 
                    blogArticles={blogArticle} // Pasar todo el objeto del artículo, sin separar `image`
                />
            ))}
        </div>
    );
};

