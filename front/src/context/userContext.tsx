
"use client"

import { createContext, useEffect, useState } from "react"
import { IUserContextType, IUserResponse, ILogin, IRegister } from "../interfaces/interfaces"
import {  postLogin, postRegister } from "@/lib/server/fetchUsers";
import Swal from "sweetalert2";


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
const [user, setUser] = useState<Partial<IUserResponse> | null>(null);
const [isLogged, setIsLogged] = useState(false);


const login = async (credentials: ILogin) => {
    try {
        const data = await postLogin(credentials);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        return true;
    } catch (error) {
        return false;
    }    
};

 const register = async (user: IRegister) =>{
    try {
        const data = await postRegister(user);

        if (data.id){
           Swal.fire({
            title:'Registro exitoso',
            text:'Inicie Sesion',
            icon:'success'
           })
        }
        return false;
    } catch (error) {
        Swal.fire({
            title:'Algo salio mal',
            text:'vuelva a intentarlo',
            icon:'error',
           })
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