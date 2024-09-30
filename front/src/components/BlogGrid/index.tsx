// components/BlogGrid.tsx

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
                    blogArticles={blogArticle} 
                    image={blogArticle.images[0] || { url: "/path/to/placeholder/image.jpg" }} // Placeholder si no hay imagen
                />
            ))}
        </div>
    );
};
