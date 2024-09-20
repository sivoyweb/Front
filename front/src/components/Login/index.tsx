"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ILoginFormValues } from "../../interfaces/interfaces";

const Login: React.FC = () => {
  const initialValues: ILoginFormValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

  const handleSubmit = (values: ILoginFormValues) => {
    console.log('Datos del formulario:', values);
  };

  return (
    <div className="p-10">
      <div className="bg-slate-50 m-5 p-8 rounded shadow-xl w-full max-w-md mx-4 md:mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium">
                  Nombre de usuario
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Contraseña
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;