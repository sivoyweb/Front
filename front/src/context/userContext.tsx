"use client";

import { createContext, useEffect, useState } from "react";
import {
  IUserContextType,
  ILogin,
  IRegister,
  IUserProps,
  IUserChange,
  IloginGoogle,
} from "../interfaces/interfaces";
import { postLogin, postLoginGoogle, postRegister } from "@/lib/server/fetchUsers";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  login: async () => false,
  register: async () => false,
  logOut: () => {},
  updateUser:()=> {},
  loginWithGoogle:async()=>false
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<Partial<IUserProps> | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const { data: session } = useSession();

  const login = async (credentials: ILogin) => {
    try {
      const data = await postLogin(credentials);
      if (!data || !data.userFinal || !data.token) {
        throw new Error("Datos de inicio de sesión incorrectos");
      }

      const dataUser = data.userFinal;
      setUser(dataUser);

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      Swal.fire({
        title: "Inicio de sesión exitoso",
        text: `¡Bienvenido/a ${dataUser.name}!`,
        icon: "success",
      });

      return true;
    } catch (error: unknown) {
      let errorMessage = "Algo salió mal";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "No se pudo iniciar sesión",
        text: errorMessage,
        icon: "error",
      });
      return false;
    }
  };

  const loginWithGoogle = async (credentials: IloginGoogle) => {
    try {
      const data = await postLoginGoogle(credentials);
     
      
      if (!data || !data.userFinal || !data.token) {
        throw new Error("Datos de inicio de sesión incorrectos");
      }
  
      const dataUser = data.userFinal;
      setUser(dataUser);
  
      localStorage.setItem("user", JSON.stringify(dataUser));
      localStorage.setItem("token", data.token);

      router.push('/')
  
      return true;
    } catch (error: unknown) {
      let errorMessage = "Algo salió mal";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      Swal.fire({
        title: "No se pudo iniciar sesión",
        text: errorMessage,
        icon: "error",
      });
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const TokenGoogle = localStorage.getItem("TokenGoogle");

    if (session?.user) {
      localStorage.setItem("TokenGoogle", "true");
    }
      setIsLogged(!!(token || TokenGoogle));
    }
  , [session]);

  const register = async (user: IRegister) => {
    try {
      const data = await postRegister(user);
      if (data) {
        Swal.fire({
          text: "¡Registro Exitoso! Revise su casilla de correo para verificar su cuenta",
          icon: "success",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
        
        return true;
      } else if (data.error === "email already in use") {
        Swal.fire({
          title: "Correo ya registrado",
          text: "El correo ya tiene una cuenta creada. Intente iniciar sesión.",
          icon: "warning",
        });
        return false;
      } else {
       
        Swal.fire({
          title: "Algo salió mal",
          text: "Vuelva a intentarlo",
          icon: "error",
        });
        return false;
      }
    } catch (error: unknown) {
      let errorMessage = "Algo salió mal";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "No se pudo registrar el usuario",
        text: errorMessage,
        icon: "error",
      });
      return false;
    }
  };

  const updateUser = (updatedUser:IUserChange) => {
    const currentUserString = localStorage.getItem("user");
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const newUser = {
        ...currentUser, 
        ...updatedUser,  
      };  
      
      setUser(newUser);     
      localStorage.setItem("user", JSON.stringify(newUser));
  }
}
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("TokenGoogle");
    signOut();
    setUser(null);
    setIsLogged(false);
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      return;
    }
    setUser(null);
  }, []);
  

  return (
    <UserContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, login, register, logOut,updateUser,loginWithGoogle }}
    >
      {children}
    </UserContext.Provider>
  );
};
