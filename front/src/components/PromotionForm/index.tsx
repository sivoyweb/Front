"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from "next/image";

interface IImage {
  url: string;
  alt: string;
}

interface IPromotionFormValues {
  name: string;
  description: string;
  images: IImage[]; // Arreglo de imágenes
  validFrom: string;
  validUntil: string;
}

const PromotionForm: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<IImage[]>([]); // Guardar imágenes subidas

  const handleImageUpload = () => {
    // Aquí puedes implementar la lógica para abrir el widget de Cloudinary
    // Por ejemplo:
    // window.cloudinary.openUploadWidget({ ... }, (error, result) => { ... });
    // Una vez que se haya subido la imagen, almacenas la URL y otros datos:
    const newImage: IImage = {
      url: "https://ejemplo.com/imagen.jpg", // Esta es la URL obtenida tras la subida
      alt: "Descripción de la imagen", // Esto lo puedes configurar manualmente o desde el widget
    };
    setUploadedImages([...uploadedImages, newImage]);
  };

  const formik = useFormik<IPromotionFormValues>({
    initialValues: {
      name: "",
      description: "",
      images: [],
      validFrom: "",
      validUntil: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
      description: Yup.string().required("La descripción es obligatoria."),
      validFrom: Yup.date().required("La fecha de inicio es obligatoria."),
      validUntil: Yup.date().required("La fecha de fin es obligatoria."),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = { ...values, images: uploadedImages }; // Añadir las imágenes subidas al formulario
        await axios.post("/api/promotions", formData);
        resetForm();
        setUploadedImages([]); // Reiniciar las imágenes subidas
        alert("¡Promoción creada exitosamente!");
      } catch (error) {
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Crear Promoción</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-xl font-medium text-gray-700"
          >
            Nombre de la Promoción
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-xl font-medium text-gray-700"
          >
            Descripción de la Promoción
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="validFrom"
            className="block text-xl font-medium text-gray-700"
          >
            Fecha de inicio
          </label>
          <input
            id="validFrom"
            name="validFrom"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.validFrom}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.validFrom && formik.errors.validFrom
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.validFrom && formik.errors.validFrom ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.validFrom}
            </p>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="validUntil"
            className="block text-xl font-medium text-gray-700"
          >
            Fecha de fin
          </label>
          <input
            id="validUntil"
            name="validUntil"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.validUntil}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.validUntil && formik.errors.validUntil
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.validUntil && formik.errors.validUntil ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.validUntil}
            </p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Imágenes de la Promoción
          </label>
          <button
            type="button"
            onClick={handleImageUpload}
            className="mt-2 p-2 w-full "
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
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Enviando..." : "Crear Promoción"}
        </button>
      </form>
    </div>
  );
};

export default PromotionForm;
