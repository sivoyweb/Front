"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {ILoginFormValues} from "../../interfaces/interfaces"

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
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
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
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
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
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;