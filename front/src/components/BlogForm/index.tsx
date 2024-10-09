"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

interface IImage {
  url: string;
  alt: string;
}

interface IBlogFormValues {
  title: string;
  content: string;
  images?: IImage[];
}

const BlogForm: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<IImage[]>([]);

  const handleImageUpload = () => {
    const newImage: IImage = {
      url: "https://ejemplo.com/imagen.jpg",
      alt: "Descripción de la imagen",
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
      const token = localStorage.getItem("token");
      try {
        const formData = { ...values, images: uploadedImages };
        await axios.post("https://api-sivoy.onrender.com/blogs", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resetForm();
        setUploadedImages([]);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "¡Blog creado exitosamente!",
        });
      } catch (error) {}
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
