"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IFAQAdmin } from "@/interfaces/interfaces";

const FaqForm: React.FC = () => {
  const MySwal = withReactContent(Swal);

  const initialValues: IFAQAdmin = {
    question: "",
    answer: "",
  };

  const validationSchema = Yup.object({
    question: Yup.string()
      .min(10, "La pregunta debe tener al menos 10 caracteres")
      .required("La pregunta es obligatoria"),
    answer: Yup.string()
      .min(10, "La respuesta debe tener al menos 10 caracteres")
      .required("La respuesta es obligatoria"),
  });

  const handleSubmit = async (
    values: IFAQAdmin,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://api-sivoy.onrender.com/faq", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Alerta de éxito con SweetAlert2
      await MySwal.fire({
        icon: "success",
        title: "¡FAQ creada exitosamente!",
        text: "La FAQ ha sido añadida correctamente.",
        confirmButtonText: "Aceptar",
      });

      // Resetea el formulario después de la creación exitosa
      resetForm();
    } catch (error) {
      console.error("Error al crear la FAQ:", error);

      // Alerta de error con SweetAlert2
      await MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear la FAQ. Intenta de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crear una nueva FAQ</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="question" className="block text-sm font-medium">
                Pregunta:
              </label>
              <Field
                type="text"
                id="question"
                name="question"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="question"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="answer" className="block text-sm font-medium">
                Respuesta:
              </label>
              <Field
                as="textarea"
                id="answer"
                name="answer"
                className="w-full p-2 border rounded"
                rows={4}
              />
              <ErrorMessage
                name="answer"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button type="submit" className="w-full " disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear FAQ"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FaqForm;
