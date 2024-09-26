"use client";

import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IRegister, IRegisterGoogle } from "../../interfaces/interfaces";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context/userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"; 
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { postRegister } from '@/lib/server/fetchUsers';
import { GoogleAuthProvider, getAuth , signInWithPopup } from 'firebase/auth';
import { initializeApp } from "firebase/app";


const provider = new GoogleAuthProvider();



const Register: React.FC = () => {
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
  const [showPassword, setShowPassword] = useState(false);
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
  
  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const callRegisterGoogle = async() =>{
    signInWithPopup(auth,provider)
    .then((result)=>{
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(token)
      console.log(user)
      console.log(credential);
      const newUser = {
        name:user.displayName,
        token:token,
        email:user.email,
        phone:user.phoneNumber
      }
      postRegister(newUser as IRegisterGoogle)
      
      Swal.fire({
       title:'Registro exitoso',
            icon:'success'
      })
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }).catch((error)=> {
      const errorMesage = error.Message;
      //const credential = GoogleAuthProvider.credentialFromError(error);
      Swal.fire({
        title: 'Algo salió mal',
        text: `Vuelva a intentarlo:${errorMesage} `,
        icon: 'error'
      })
    });

    Swal.fire
  }


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

            <div className='relative'>
              <label htmlFor="password" className="block text-xl font-medium">
                Repetir contraseña
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-3 pr-10 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <span onClick={tooglePasswordVisibility}
                    className='absolute inset-y-0 right-3  mt-7 flex items-center cursor-pointer'>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-base mt-1"
              />
            </div>

            <div className='relative'>
              <label htmlFor="confirmPassword" className="block text-xl font-medium">
                Repetir contraseña
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-3 pr-10 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <span onClick={tooglePasswordVisibility}
                    className='absolute inset-y-0 right-3  mt-7 flex items-center cursor-pointer'>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>

              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-base mt-1"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className='rounded-3xl bg-sivoy-orange py-2 px-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-700 focus:shadow-none active:bg-orange-700 hover:bg-orange-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2'
              >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </button>
              
              <button
                className='flex items-center justify-center text-lg font-semibold text-gray-700 bg-white border border-gray-300 shadow-md rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all py-2 px-6'
                onClick={(e) => {
                  callRegisterGoogle();
                  e.currentTarget.blur();
                }}
              >
                <FontAwesomeIcon icon={faGoogle} className="text-xl text-gray-700 mr-2" />
                <span className="text-base">Registrarse con Google</span>
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;