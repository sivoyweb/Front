import { ILogin, IRegister } from "../../interfaces/interfaces";

export const postRegister = async (user: IRegister)=>{
    const response = await fetch("https://api-sivoy.onrender.com/auth/signup",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    return data;
  }
  const textData = await response.text();
  return { message: textData };
};


export const postLogin = async (credentials: ILogin) =>{
    const response = await fetch("https://api-sivoy.onrender.com/auth/signin",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
};