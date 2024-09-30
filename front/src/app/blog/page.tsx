import Image from "next/image";
import headerblog from "@/assets/headerblog.jpg"
import BlogLoader from "@/components/BlogLoader"

const BlogPage = () => {
    return (
        <div className="container mx-auto p-4">
             <div className="relative w-full h-64 mb-8 mt-4">
          <Image
            src={headerblog}
            alt="Blog header"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 flex items-center justify-start">
            <h1 className="text-4xl font-bold text-white ml-4 font-arialroundedmtbold">Blog</h1>
          </div>
        </div>
            <BlogLoader />
        </div>
    );
};

export default BlogPage;
