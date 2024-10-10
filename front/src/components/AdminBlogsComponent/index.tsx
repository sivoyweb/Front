"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { IBlogArticle } from "@/interfaces/interfaces";
import { format } from "date-fns";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image"; 
import CloudinaryButton from "../CloudinaryButton";

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
      const token = localStorage.getItem("token") ;
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

  const handleEdit = async (id: string) => {
    if (!editingBlog) return;
  
    const token = localStorage.getItem("token");

    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas actualizar este blog?",
      text: "Se aplicarán los cambios realizados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

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

      Swal.fire("¡El blog ha sido actualizado exitosamente!");

      setEditingBlog(null);
      fetchBlogs(); 
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el blog.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const token =  localStorage.getItem("token");
    try {
      const result = await MySwal.fire({
        title: "¿Estás seguro/a?",
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
        Swal.fire("El blog ha sido eliminado.");
        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar el blog.", "error");
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        MySwal.fire({
          title: "Error",
          text: "No se encontró un token de autenticación.",
          icon: "error",
        });
        return;
      }

      // Paso 1: Llamar a la API para exportar "Blog"
      const exportResponse = await axios.get(
        "https://api-sivoy.onrender.com/data/export/Blog", // Cambia 'Blog' según tu entidad
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Asumimos que el objeto de respuesta tiene la propiedad `fileName`
      const fileName = exportResponse.data.fileName;
      if (!fileName) {
        MySwal.fire({
          title: "Error",
          text: "No se pudo obtener el nombre del archivo.",
          icon: "error",
        });
        return;
      }

      // Paso 2: Descargar el archivo exportado
      const downloadResponse = await axios({
        url: `https://api-sivoy.onrender.com/data/download/${fileName}`,
        method: "GET",
        responseType: "blob", // Esto es importante para manejar archivos binarios
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Nombre del archivo que descargaremos
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Elimina el enlace tras la descarga

    } catch (err) {
      MySwal.fire({
        title: "¡Error!",
        text: "Hubo un problema al descargar el archivo.",
        icon: "error",
      });
    }
  };

  if (loading) {
    <p className="loader"></p>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Lista de Blogs</h1>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Descargar Blogs en Excel
        </button>
      </div>

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
                className="custom-button"
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
                          alt={`Imagen de ${blog.title}`}
                          width={128}
                          height={128}
                          className="object-cover inline-block mr-2"
                        />
                      ))}
                    </div>
                      <CloudinaryButton />
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEdit(blog.id)}
                        className="guardarInfo"
                      >
                        Guardar Cambios
                      </button>
                      <button
                        onClick={() => setEditingBlog(null)}
                        className="cancelarBtn"
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
                          alt={`Imagen de ${blog.title}`}
                          width={128}
                          height={128}
                          className="object-cover inline-block mr-2"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingBlog(blog)}
                        className="editarBtn"
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
                     
