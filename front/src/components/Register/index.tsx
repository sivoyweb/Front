"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IRegisterFormValues } from "../../interfaces/interfaces";

const Register: React.FC = () => {
  const initialValues: IRegisterFormValues = {
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    fullName: Yup.string().required('El nombre completo es obligatorio'),
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
      .required('Repetir la contraseña es obligatorio'),
  });

  const handleSubmit = (values: IRegisterFormValues) => {
    console.log('Datos del formulario:', values);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Registrarse</h1>
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
              <label htmlFor="fullName" className="block text-sm font-medium">
                Nombre completo
              </label>
              <Field
                type="text"
                id="fullName"
                name="fullName"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Correo electrónico
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <ErrorMessage
                name="email"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Repetir contraseña
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;