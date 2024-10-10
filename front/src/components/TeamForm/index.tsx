"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

interface ITeamFormValues {
  name: string;
  description: string;
  linkedin: string;
  image: File | null;
}

const TeamForm: React.FC = () => {
  const formik = useFormik<ITeamFormValues>({
    initialValues: {
      name: "",
      description: "",
      linkedin: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
      description: Yup.string().required("La descripción es obligatoria."),
      linkedin: Yup.string()
        .url("Debe ser un enlace válido de LinkedIn")
        .required("El enlace de LinkedIn es obligatorio."),
      image: Yup.mixed().required("La imagen es obligatoria."),
    }),
    onSubmit: async (values, { resetForm }) => {
      const token =  localStorage.getItem("token") ;
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("linkedin", values.linkedin);
        if (values.image) {
          formData.append("image", values.image);
        }

        await axios.post("https://api-sivoy.onrender.com/team", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        resetForm();
        Swal.fire({
          icon: "success",
          text: "¡Persona agregada exitosamente al equipo!",
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
          <label
            htmlFor="image"
            className="block text-xl font-medium text-gray-700"
          >
            Imagen
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              formik.setFieldValue(
                "image",
                event.currentTarget.files?.[0] || null
              );
            }}
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
          />
          {formik.touched.image && formik.errors.image ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          ) : null}
        </div>

        <button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Enviando..." : "Agregar Persona"}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
