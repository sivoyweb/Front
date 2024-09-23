import Image from "next/image";
import headerblog from "@/assets/headerblog.jpg"
import { BlogButton } from "@/components/BlogButton";

type BlogPost = {
    id: number
    date: string
    title: string
    imageUrl: string
  }
  
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      date: "2024-05-17",
      title: "En busca de dinosaurios en territorios cuyanos",
      imageUrl: "http://admin.sivoy.com.ar/Images/Noticias/3095/cabecera/3095517202441849PM.png"
    },
    {
      id: 2,
      date: "2023-09-15",
      title: "Trevelin, pueblo de experiencias únicas",
      imageUrl: "http://admin.sivoy.com.ar/Images/Noticias/3094/cabecera/3094916202341753PM.jpg"
    },
    {
      id: 3,
      date: "2023-07-21",
      title: "Un viaje accesible a la selva misionera",
      imageUrl:"http://admin.sivoy.com.ar/Images/Noticias/3093/cabecera/3093721202310018PM.jpg"
    },
    {
      id: 4,
      date: "2022-11-02",
      title: "Integración laboral en el sector turístico para personas sordas",
      imageUrl: "http://admin.sivoy.com.ar/Images/Noticias/3089/cabecera/3089112202291205AM.webp"
    },
  ]

  export default function Blog() {
    return (
      <div className="container mx-auto px-4">

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
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ml-2 mr-2">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={300}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                <BlogButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  };