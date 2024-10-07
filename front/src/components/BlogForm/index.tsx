"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from "next/image"; // Importar Image de Next.js

interface IImage {
  url: string;
  alt: string;
}

interface IBlogFormValues {
  title: string;
  content: string;
  images: IImage[]; // Arreglo de imágenes
}

const BlogForm: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<IImage[]>([]); // Guardar imágenes subidas

  const handleImageUpload = () => {
    // Aquí puedes implementar la lógica para abrir el widget de Cloudinary
    // Ejemplo de manejo de subida de imagen:
    const newImage: IImage = {
      url: "https://ejemplo.com/imagen.jpg", // La URL obtenida tras la subida
      alt: "Descripción de la imagen", // Configurable manualmente o desde el widget
    };
    setUploadedImages([...uploadedImages, newImage]);
  };

  const formik = useFormik<IBlogFormValues>({
    initialValues: {
      title: "",
      content: "",
      images: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("El título es obligatorio."),
      content: Yup.string().required("El contenido es obligatorio."),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = { ...values, images: uploadedImages }; // Añadir las imágenes subidas al formulario
        const response = await axios.post("/api/blogs", formData);
        console.log("Blog creado:", response.data);
        resetForm();
        setUploadedImages([]); // Reiniciar las imágenes subidas
        alert("¡Blog creado exitosamente!");
      } catch (error) {
        console.error("Error al crear el blog:", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Crear Blog</h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-xl font-medium text-gray-700"
          >
            Título del Blog
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-xl font-medium text-gray-700"
          >
            Contenido del Blog
          </label>
          <textarea
            id="content"
            name="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.content && formik.errors.content
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.content && formik.errors.content ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Imágenes del Blog
          </label>
          <button
            type="button"
            onClick={handleImageUpload}
            className="mt-2 p-2 w-full"
          >
            Subir Imágenes
          </button>
          <div className="mt-2">
            {uploadedImages.map((image, index) => (
              <div key={index} className="mt-2">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={300}
                  height={150}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Enviando..." : "Crear Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
