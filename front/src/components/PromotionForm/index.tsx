"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

interface IImage {
  url: string;
  publicId: string;
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
      const token = localStorage.getItem("token");
      try {
        const formData = { ...values, images: uploadedImages };
        await axios.post(
          "https://api-sivoy.onrender.com/Promotions",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        resetForm();
        setUploadedImages([]);
        Swal.fire({
          icon: "success",
          text: "¡Proyecto creado exitosamente!",
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
          <CldUploadWidget
            uploadPreset="siVoyPreset" // Reemplaza con tu preset de Cloudinary
            onSuccess={(result) => {
              const uploadedImage = result?.info as CloudinaryUploadWidgetInfo;
              if (uploadedImage) {
                setUploadedImages((prevImages) => [
                  ...prevImages,
                  {
                    url: uploadedImage.secure_url,
                    publicId: uploadedImage.public_id,
                    alt: uploadedImage.original_filename,
                  },
                ]);
                Swal.fire({
                  title: "¡Imagen subida con éxito!",
                  text: `URL: ${uploadedImage.secure_url}`,
                  icon: "success",
                });
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                className="focus text-ls px-3 py-2 text-white bg-blue-500 rounded-md ml-2"
                onClick={() => open()}
              >
                Subir imagen
              </button>
            )}
          </CldUploadWidget>
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
          {formik.isSubmitting ? "Enviando..." : "Crear Promoción"}
        </button>
      </form>
    </div>
  );
};

export default PromotionForm;
