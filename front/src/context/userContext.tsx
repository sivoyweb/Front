
"use client"

import { createContext, useEffect, useState } from "react"
import { IUserContextType, ILogin, IRegister, IUserProps } from "../interfaces/interfaces"
import { postLogin, postRegister} from "@/lib/server/fetchUsers";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


export const UserContext = createContext<IUserContextType>({
    
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    login: async () => false,
    register: async () => false,
    logOut: () => {},
});



export const UserProvider = ({children}:{children: React.ReactNode})=>{
const router = useRouter();
const [user, setUser] = useState<Partial<IUserProps> | null>(null);
const [isLogged, setIsLogged] = useState(false);


const login = async (credentials: ILogin) => {
    try {
        const data = await postLogin(credentials);
        const dataUser = data.userFinal;
        setUser(dataUser);
        console.log(dataUser);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        Swal.fire({
            title:'Inicio de sesion exitoso',
            text:'Bienvenido',
            icon:'success'
           });
        return true;
    } catch (error: unknown) { 
      let errorMessage = 'Algo salió mal';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      Swal.fire({
        title: 'No se pudo iniciar sesión',
        text: errorMessage,
        icon: 'error'
      });
      return false;
        
    }    
};

const register = async (user: IRegister) => {
    try {
      const data = await postRegister(user);
      
      if (data.token) {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Inicie Sesión',
          icon: 'success',
        });
  
        setTimeout(() => {
          router.push('/login');
        }, 2000);
  
        return true;
      } else {
        Swal.fire({
          title: 'Algo salió mal',
          text: 'Vuelva a intentarlo',
          icon: 'error',
        });
        return false;
      }
    } catch (error: unknown) { 
      let errorMessage = 'Algo salió mal';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      Swal.fire({
        title: 'No se pudo Registrar el usuario',
        text: errorMessage,
        icon: 'error'
      });
      return false;
        
    }    
  };


const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLogged(false);
};

useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token){
        setIsLogged(true);
    }
}, [user]);

useEffect(()=>{
    const user = localStorage.getItem("user");
    if(user){
        setUser(JSON.parse(user));
        return;
    }
    setUser(null);
}, []);

return (
    <UserContext.Provider
    value={
        {user,
        setUser,
        isLogged,
        setIsLogged,
        login,
        register,
        logOut,
    }}
    >{children}</UserContext.Provider>
)


};