"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface IProjectFormValues {
  name: string;
  description: string;
}

const ProjectForm: React.FC = () => {
  const formik = useFormik<IProjectFormValues>({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
      description: Yup.string().required("La descripción es obligatoria."),
    }),
    onSubmit: async (values, { resetForm }) => {
      const token = localStorage.getItem("token");
      console.log(values);
      try {
        await axios.post(
          "https://api-sivoy.onrender.com/projects",
          { values },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        resetForm();
        alert("¡Proyecto creado exitosamente!");
      } catch (error) {}
    },
  });

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Crear Proyecto</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-xl font-medium text-gray-700"
          >
            Nombre del Proyecto
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
            Descripción del Proyecto
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

        <button type="submit" className="w-full" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Enviando..." : "Crear Proyecto"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
