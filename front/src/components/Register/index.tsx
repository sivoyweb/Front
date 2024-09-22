"use client";

import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IRegister } from "../../interfaces/interfaces";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context/userContext";

const Register: React.FC = () => {
  const router = useRouter();
  const {register} = useContext(UserContext);

  const initialValues: IRegister = {
    name: '',
    phone: 0,
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

  const handleSubmit = async(values: IRegister) => {
    const resultado = await register(values);
        if (resultado) router.push("/home");
        if (!resultado) alert("Error al crear el usuario")
  };

  return (
      <div className="bg-white mt-3 p-9 px-11 rounded shadow-lg w-full max-w-md mx-4 md:mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Registrarse</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-xl font-medium">
                  Nombre Completo
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xl mt-1"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xl font-medium">
                  Numero de telefono
                </label>
                <Field
                  type="number"
                  id="phone"
                  name="phone"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xl mt-1"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xl font-medium">
                  Correo electrónico
                </label>
                <Field
                  type="email"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-xl font-medium">
                  Repetir contraseña
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xl mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
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