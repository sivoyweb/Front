"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { ITeamFormValues } from "@/interfaces/interfaces";

const TeamForm: React.FC = () => {
  const formik = useFormik<ITeamFormValues>({
    initialValues: {
      name: "",
      description: "",
      linkedin: "",
      image: { id: "", url: null, publicId: "", alt: "", active: true }, // Adaptación del objeto IImage
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
      description: Yup.string().required("La descripción es obligatoria."),
      linkedin: Yup.string()
        .url("Debe ser un enlace válido de LinkedIn")
        .required("El enlace de LinkedIn es obligatorio."),
      image: Yup.object().shape({
        url: Yup.string().required("La imagen es obligatoria."), // Validamos el campo `url`
      }),
    }),
    onSubmit: async (values, { resetForm }) => {
      const token =  localStorage.getItem("token") ;
      try {
        // Payload ajustado según el formato requerido
        const payload = {
          name: values.name,
          description: values.description,
          linkedin: values.linkedin,
          image: {
            url: values.image.url,
            publicId: values.image.publicId,
          },
        };

        console.log("Payload:", payload);

        await axios.post("https://api-sivoy.onrender.com/team", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        resetForm();
        Swal.fire({
          icon: "success",
          text: "¡Persona agregada exitosamente al equipo!",
        });
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          text: "Hubo un error al agregar la persona.",
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
        <h2 className="text-2xl font-bold mb-4">Agregar Persona al Equipo</h2>

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
            htmlFor="description"
            className="block text-xl font-medium text-gray-700"
          >
            Descripción
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
            htmlFor="linkedin"
            className="block text-xl font-medium text-gray-700"
          >
            LinkedIn
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.linkedin}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.linkedin && formik.errors.linkedin
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.linkedin && formik.errors.linkedin ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.linkedin}
            </p>
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
                  active: true,
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
              <button
                type="button"
                className="focus text-ls px-3 py-2 text-white bg-blue-500 rounded-md ml-2"
                onClick={() => open()}
              >
                Subir imagen
              </button>
            )}
          </CldUploadWidget>
          {formik.touched.image?.url && formik.errors.image?.url ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.image.url}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Enviando..." : "Agregar Persona"}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
