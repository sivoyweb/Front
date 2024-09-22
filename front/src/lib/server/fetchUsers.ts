import { ILogin, IRegister } from "../../interfaces/interfaces";

export const postRegister = async (user: IRegister)=>{
    const response = await fetch("https://pm-4-fe-cris-acevey-3xzr.vercel.app/users/register",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
};

export const postLogin = async (credentials: ILogin) =>{
    const response = await fetch("https://pm-4-fe-cris-acevey-3xzr.vercel.app/users/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
};