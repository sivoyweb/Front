// app/blog/[id]/page.tsx
import { BlogArticleContainer } from "@/components/BlogArticleContainer";

const BlogArticlePage = () => {
  return (
    <div className="container mx-auto p-4">
      <BlogArticleContainer />
    </div>
  );
};

export default BlogArticlePage;