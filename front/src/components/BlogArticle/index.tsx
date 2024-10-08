import Image from "next/image";
import { IBlogArticleProps } from "@/interfaces/interfaces";

export const BlogArticle = ({ article }: IBlogArticleProps) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        {article.images && article.images.length > 0 && (
          <Image
            src={article.images[0].url}
            alt={article.images[0].alt || "Imagen del artículo"}
            width={600}
            height={400}
            className="rounded-3xl mx-auto block"
          />
        )}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 font-arialroundedmtbold text-sivoy-blue">
        {article.title}
      </h1>

      <h2 className="text-sm md:text-lg mb-4 text-gray-500">
        {article.date}
      </h2>

      <div className="text-lg text-justify text-sivoy-blue">
        <p>{article.content}</p>
      </div>
    </article>
  );
};