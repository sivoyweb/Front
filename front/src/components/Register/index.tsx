"use client";

import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IRegister } from "../../interfaces/interfaces";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context/userContext";

const Register: React.FC = () => {
  const router = useRouter();
  const { register } = useContext(UserContext);

  const initialValues: IRegister = {
    name: '',
    email: '',
    phone: "",
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre completo es obligatorio'),
    email: Yup.string()
      .email('Correo electrónico inválido')
      .required('El correo electrónico es obligatorio'),
    phone: Yup.number()
      .required('El número de teléfono es obligatorio')
      .positive('Debe ser un número positivo')
      .integer('Debe ser un número entero'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/\d/, 'Debe contener al menos un número')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Debe contener al menos un signo')
      .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
      .required('Repetir la contraseña es obligatorio'),
  });

  const handleSubmit = async (values: IRegister) => {
    const resultado = await register(values);
    if (resultado){ router.push("/login");}
  };



  return (
    <div>      
      <div className='flex items-center justify-between gap-x-4 mb-6'>
        <h1 className="text-2xl font-arialroundedmtbold text-sivoy-blue">Registro</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 mb-6 text-sivoy-blue">
            <div>
              <label htmlFor="name" className="block text-lg">
                Nombre Completo
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-base mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg">
                Correo electrónico
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-base mt-1"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-lg">
                Número de teléfono
              </label>
              <Field
                type="number"
                id="phone"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-base mt-1"
              />
            </div>


            <div>
              <label htmlFor="password" className="block text-lg font-medium">
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
                className="text-red-500 text-base mt-1"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-medium">
                Confirmar contraseña
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-base mt-1"
              />
            </div>
            <div className='flex-col pt-4'> 
              <button
              type="submit"
              disabled={isSubmitting}
              className='text-base -ml-1 w-1/3'
              >
              {isSubmitting ? 'Registrando...' : 'Registro'}
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;