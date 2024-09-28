"use client"

import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ILogin, IRegisterGoogle } from "../../interfaces/interfaces";
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/userContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"; 
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { postRegister } from '@/lib/server/fetchUsers';

const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDnzL23UH5VME4BSZhG1DB5uiD7wsinu2o",
    authDomain: "sivoy-264f7.firebaseapp.com",
    projectId: "sivoy-264f7",
    storageBucket: "sivoy-264f7.appspot.com",
    messagingSenderId: "497471545294",
    appId: "1:497471545294:web:215c2371658bdb9443d59f",
    measurementId: "G-ZYWMCTKXHB"
  };
  initializeApp(firebaseConfig);

  const auth = getAuth();
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
  };

  const callLoginGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        const newUser = {
          name: user.displayName,
          token: token,
          email: user.email,
          phone: user.phoneNumber
        };
        postRegister(newUser as IRegisterGoogle);

        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido',
          icon: 'success'
        });
        setTimeout(() => {
          router.push('/');
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          title: 'Algo salió mal',
          text: `Vuelva a intentarlo: ${errorMessage}`,
          icon: 'error'
        });
      });
  };

  return (
    <div className="p-5">
      <div className="max-w-md mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xl font-medium text-gray-700">
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
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className='relative'>
                <label htmlFor="password" className="block text-xl font-medium text-gray-700">
                  Contraseña
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
                />
                <span onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 flex items-center text-sm leading-5 cursor-pointer'>
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 h-fit"
                >
                  {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
                </button>
              </div>
              <div>
                <button
                  className='flex items-center justify-center mt-5 text-lg font-semibold text-gray-700 bg-white border border-gray-300 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all py-2 px-4 w-full h-fit'
                  onClick={(e) => {
                    callLoginGoogle();
                    e.currentTarget.blur();
                  }}
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


