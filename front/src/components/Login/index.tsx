// Login.tsx
"use client";

import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ILogin, IRegisterGoogle } from "../../interfaces/interfaces";
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"; 
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { postRegister } from '@/lib/server/fetchUsers';
import { auth } from '../../../firebase.config';
 // Ajusta la ruta según la estructura de tu proyecto

const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

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
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLoginGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previene el comportamiento por defecto del botón
    signInWithRedirect(auth, provider);
  }

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if(result?.user){
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          console.log('Token:', token);
          console.log('Usuario:', user);
          console.log('Credenciales:', credential);

          const newUser = {
            name: user.displayName,
            token: token,
            email: user.email,
            phone: user.phoneNumber
          }

          postRegister(newUser as IRegisterGoogle)
            .then(() => {
              Swal.fire({
                title: 'Inicio de sesión exitoso',
                text: 'Bienvenido',
                icon: 'success'
              }).then(() => {
                router.push("/"); // Redirige después de mostrar la alerta
              });
            })
            .catch((error) => {
              Swal.fire({
                title: 'Error al registrar usuario',
                text: `Vuelva a intentarlo: ${error.message}`,
                icon: 'error'
              });
            });
        }
      })
      .catch((error)=> {
        Swal.fire({
          title: 'Algo salió mal',
          text: `Vuelva a intentarlo: ${error.message}`,
          icon: 'error'
        });
      });
  }, [auth, router]);

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

              <div className='relative'>
                <label htmlFor="password" className="block text-xl font-medium">
                  Contraseña
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
                />
                <span 
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-3 mt-8 flex items-center text-sm leading-5 cursor-pointer'
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />  
                  ) : (
                    <FontAwesomeIcon icon={faEye} /> 
                  )}
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xl mt-1"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sivoy-green text-white py-2 px-4 rounded hover:bg-sivoy-green-dark transition duration-200"
                >
                  {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
                </button>
                
                <button
                  type="button" // Cambiado a 'button' para evitar que se comporte como 'submit'
                  className='flex items-center justify-center mt-5 text-lg font-semibold text-gray-700 bg-white border border-gray-300 shadow-md rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all py-2 px-6'
                  onClick={handleLoginGoogle}
                >
                  <FontAwesomeIcon icon={faGoogle} className="text-xl text-gray-700 mr-2" />
                  <span className="text-base">Iniciar sesión con Google</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
