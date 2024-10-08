"use client";

import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ILogin } from "../../interfaces/interfaces";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import { signIn, useSession } from "next-auth/react";

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { login,loginWithGoogle } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (values: ILogin) => {
    const resultado = await login(values);
    if (resultado) router.push("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const callLoginGoogle = async () => {
    try {
      
      await signIn("google");
    } catch (error: unknown) {
      Swal.fire({
        title: "Algo salió mal",
        text: `Vuelva a intentarlo: ${error}`,
        icon: "error",
      });
      
    }
  };

  useEffect(() => {
    if (session) {
      const emailGoogle = {
        email: session.user?.email || '',
        name: session.user?.name || '',
        phone: '', 
        token: '' 
      };
      Swal.fire({
        title:"Inicio de sesión exitoso",
        text:`¡Bienvenido/a ${session.user?.name}!`,
        icon:'success'
      })

      loginWithGoogle(emailGoogle);
    }
  }, [session,loginWithGoogle]);

  return (
    <div className="">
  <div className="">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              type="text"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-sivoy-green"
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm mt-1"
          />

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
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
              className="absolute z-10 inset-y-0 mt-4 right-3 top-1/2 transform -translate-y-1/2 flex items-center text-sm leading-5 cursor-pointer"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm mt-1"
          />

          <div className="flex space-x-4 mt-8 justify-center">
            <button type="submit" disabled={isSubmitting} className="w-64">
              {isSubmitting ? "Iniciando..." : "Iniciar sesión"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>

  
  <div className="mt-4 flex justify-center">
    <button
      className="rounded-2xl flex items-left justify-start text-lg font-semibold text-gray-700 bg-white border border-gray-300 shadow-md hover:bg-gray-100 focus:outline-none focus:bg-gray-300 transition-all py-2 px-6"
      onClick={callLoginGoogle} 
    >
      <FontAwesomeIcon
        icon={faGoogle}
        className="text-xl text-gray-700 mr-2"
      />
      <span className="text-base">Iniciar sesión con Google</span>
    </button>
  </div>

  <div className="flex flex-col items-end space-y-4 mt-8">
    <a href="/forgot-password" className="text-sivoy-blue hover:underline ">
      ¿Olvidó su Contraseña?
    </a>
    <div className="ml-1 text-right">
      <p className="text-sivoy-blue">
        ¿Aún no tiene una cuenta?
        </p>
        <a
          href="/register"
          className="text-sivoy-orange font-bold hover:text-orange-600 "
        >
           Regístrese aquí
        </a>
    </div>
  </div>
</div>

  );
};

export default Login;
