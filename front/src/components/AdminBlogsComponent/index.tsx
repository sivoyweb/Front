"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { IBlogArticle } from "@/interfaces/interfaces";
import { format } from "date-fns";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image"; 


const MySwal = withReactContent(Swal);

const AdminBlogsComponent = () => {
  const [blogs, setBlogs] = useState<IBlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<IBlogArticle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró un token de autenticación.");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://api-sivoy.onrender.com/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data);
    } catch (err) {
      setError("Hubo un problema al obtener los blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  const handleUploadImages = async () => {
  };

  const handleEdit = async (id: string) => {
    if (!editingBlog) return;

    const token = localStorage.getItem("token");
    try {
      const { title, content } = editingBlog;
      await axios.put(
        `https://api-sivoy.onrender.com/blogs/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire(
        "¡El blog ha sido actualizado exitosamente!",
        "success"
      );
      setEditingBlog(null);
      fetchBlogs(); 
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el blog.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.delete(`https://api-sivoy.onrender.com/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("El blog ha sido eliminado.", "success");
        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar el blog.", "error");
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Blogs</h1>

      <div className="text-right mb-4">
        <button
          onClick={fetchBlogs}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Actualizar Blogs
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center">No hay blogs disponibles.</div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border rounded-lg p-4 shadow-md">
              <button
                className="w-full text-left"
                onClick={() =>
                  document
                    .getElementById(`blog-${blog.id}`)
                    ?.classList.toggle("hidden")
                }
              >
                <div className="font-bold text-xl">{blog.title}</div>
              </button>

              <div id={`blog-${blog.id}`} className="hidden mt-4">
                {editingBlog?.id === blog.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingBlog.title}
                      onChange={(e) =>
                        setEditingBlog({
                          ...editingBlog,
                          title: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <textarea
                      value={editingBlog.content}
                      onChange={(e) =>
                        setEditingBlog({
                          ...editingBlog,
                          content: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <div className="mb-2">
                      {editingBlog.images.map((img) => (
                        <Image
                          key={img.alt}
                          src={img.url}
                          alt={`Image for ${blog.title}`}
                          width={128}
                          height={128}
                          className="object-cover inline-block mr-2"
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleUploadImages}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Subir Imágenes
                    </button>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEdit(blog.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                      >
                        Guardar Cambios
                      </button>
                      <button
                        onClick={() => setEditingBlog(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{blog.content}</p>
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {format(new Date(blog.date), "dd/MM/yyyy")}
                    </p>
                    <div className="mb-2">
                      {blog.images.map((img) => (
                        <Image
                          key={img.alt}
                          src={img.url}
                          alt={`Image for ${blog.title}`}
                          width={128}
                          height={128}
                          className="object-cover inline-block mr-2"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingBlog(blog)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogsComponent;
