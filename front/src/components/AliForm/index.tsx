"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { IAliFormValues } from "@/interfaces/interfaces";
import Image from "next/image";

const AliForm: React.FC = () => {
  const formik = useFormik<IAliFormValues>({
    initialValues: {
      name: "",
      url: "",
      image: { id: "", url: null, publicId: "", alt: "", active: true },
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
      url: Yup.string()
        .url("Debe ser un enlace válido de LinkedIn")
        .required("El enlace de Pagina Web es obligatorio."),
      image: Yup.object().shape({
        url: Yup.string().required("La imagen es obligatoria."),
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      const token = localStorage.getItem("token");
      try {
        const payload = {
          name: values.name,
          url: values.url,
          image: {
            url: values.image.url,
            publicId: values.image.publicId,
            alt: values.image.alt,
          },
        };

        await axios.post("https://api-sivoy.onrender.com/alliances", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        resetForm();
        Swal.fire({
          icon: "success",
          text: "¡Alianza agregada exitosamente al equipo!",
        });
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          text: "Hubo un error al agregar la Alianza.",
        });
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Agregar Alianza al Equipo</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-xl font-medium text-gray-700"
          >
            Nombre
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
            htmlFor="url"
            className="block text-xl font-medium text-gray-700"
          >
            Pagina Web
          </label>
          <input
            id="url"
            name="url"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.url}
            className={`mt-1 p-2 block w-full shadow-sm border rounded-md`}
          />
          {formik.touched.url && formik.errors.url ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.url}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Imagen
          </label>
          <CldUploadWidget
            uploadPreset="siVoyPreset"
            onSuccess={(result) => {
              const uploadedImage = result?.info as CloudinaryUploadWidgetInfo;
              if (uploadedImage) {
                formik.setFieldValue("image", {
                  id: uploadedImage.asset_id,
                  url: uploadedImage.secure_url,
                  publicId: uploadedImage.public_id,
                  alt: uploadedImage.original_filename,
                });
                Swal.fire({
                  title: "¡Imagen subida con éxito!",
                  text: `URL: ${uploadedImage.secure_url}`,
                  icon: "success",
                });
              }
            }}
          >
            {({ open }) => (
              <button type="button" className="m-4" onClick={() => open()}>
                Subir imagen
              </button>
            )}
          </CldUploadWidget>
          {formik.values.image.url && (
            <div className="mt-2">
              <Image
                src={formik.values.image.url}
                alt={formik.values.image.alt || ""}
                width={300} // Ajusta el ancho según tus necesidades
                height={200} // Ajusta el alto según tus necesidades
                className="w-full"
              />
            </div>
          )}
        </div>

        <button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Enviando..." : "Agregar Alianza"}
        </button>
      </form>
    </div>
  );
};

export default AliForm;
