
import { IBlogArticle } from "@/interfaces/interfaces";
import { BlogCard } from "../BlogCard";

interface BlogGridProps {
    blogArticles: IBlogArticle[];
}

export const BlogGrid: React.FC<BlogGridProps> = ({ blogArticles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mx-1">
            {blogArticles.map((blogArticle) => (
                <BlogCard 
                    key={blogArticle.id} 
                    article={blogArticle}
                />
            ))}
        </div>
    );
};

