import Image from "next/image";
import BlogLoader from "@/components/BlogLoader";

const BlogPage = () => {
    return (
        <div className="p-4 h-screen">
            <div className="relative h-96 mx-1 mt-4 mb-10">
                <Image
                    src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728453468/si-voy/jcyrbhlj8xxnjdxis3mp.jpg"
                    alt="Carrera paralímpica"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 35%"
                    className="rounded-3xl"
                    
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white/80 p-8 w-3/4 rounded-3xl">
                    <h1 className="text-sivoy-blue py-4 text-4xl lg:text-6xl font-arialroundedmtbold">
                        Blog
                    </h1>
                </div>
            </div>
            <BlogLoader />
        </div>
    );
};

export default BlogPage;
