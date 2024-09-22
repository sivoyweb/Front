
"use client"

import { createContext, useEffect, useState } from "react"
import { IUserContextType, IUser, IUserResponse, ILogin } from "../interfaces/interfaces"
import {  postLogin, postRegister } from "@/lib/server/fetchUsers";


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

 const register = async (user: Omit<IUser, "id">) =>{
    try {
        const data = await postRegister(user);

        if (data.id){
            login({email: user.email, password: user.password});
            return true;
        }
        return false;
    } catch (error) {
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