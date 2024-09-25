"use client";

import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ILogin } from "../../interfaces/interfaces";
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useContext(UserContext);

  const initialValues: ILogin = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

  const handleSubmit = async (values: ILogin) => {
    const resultado = await login(values);
    if (resultado) router.push("/");
    else alert("Error al conectarse");
  };

  return (
    <div className="p-10">
      <div className="bg-slate-50 m-5 p-8 rounded shadow-xl w-full max-w-md mx-4 md:mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xl font-medium">
                  Email
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xl mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xl font-medium">
                  Contraseña
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xl mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
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