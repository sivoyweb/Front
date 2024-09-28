import Image from "next/image"
import { fetchBlogArticleById } from "@/lib/server/fetchBlog";

async function BlogArticle({params}:{params:{blogId:string}}) {
  const blogArticle = await fetchBlogArticleById(params.blogId)
  const image = blogArticle.images[0];

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">

      <div className="mb-8">
        <Image
          src= {image.url}
          alt= {blogArticle.title}
          width={800}
          height={400}
          className="rounded-lg shadow-md"
        />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 font-arialroundedmtbold">
        {blogArticle.title}
      </h1>

      <h2 className="text-xl md:text-4xl font-bold mb-4 font-arialroundedmtbold">
        {blogArticle.date}
      </h2>

      <div className="prose prose-lg">
        <p>{blogArticle.content}</p>
      </div>
    </article>
  )
}

export default BlogArticle;