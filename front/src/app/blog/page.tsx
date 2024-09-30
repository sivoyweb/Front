import Image from "next/image";
import nieve from "@/assets/nieve.jpeg";
import BlogLoader from "@/components/BlogLoader";

const BlogPage = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="relative w-full h-96 mb-8 mt-4">
                <Image
                    src={nieve}
                    alt="Blog header"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 15%" // Ajusta estos valores según lo necesites
                    className="rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-start">
                    <h1 className="text-4xl font-bold text-white ml-4 font-arialroundedmtbold">
                        Blog
                    </h1>
                </div>
            </div>
            <BlogLoader />
        </div>
    );
};

export default BlogPage;
