import { ILogin, IloginGoogle, IRegister, IRegisterGoogle, IUserChange } from "../../interfaces/interfaces";

<<<<<<< HEAD
export const postRegister = async (user: IRegister)=>{
    const response = await fetch("https://api-sivoy.onrender.com/signup",{
=======
export const postRegister = async (user: IRegister )=>{
    const response = await fetch("https://api-sivoy.onrender.com/auth/signup/",{
>>>>>>> 32b10cfe2959785316e05b9298e8eb5ac2109857
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


<<<<<<< HEAD
export const postLogin = async (credentials: ILogin) =>{
    const response = await fetch("https://api-sivoy.onrender.com/auth/signin",{
=======
export const postLogin = async (credentials: ILogin ) =>{
    const response = await fetch("https://api-sivoy.onrender.com/auth/signin/",{
>>>>>>> 32b10cfe2959785316e05b9298e8eb5ac2109857
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
    console.log(data)
};

export const postRegisterGoogle = async (user: IRegisterGoogle )=>{
    const response = await fetch("https://api-sivoy.onrender.com/auth/signup/google",{
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


export const postLoginGoogle = async (credentials: IloginGoogle ) =>{
    const response = await fetch("https://api-sivoy.onrender.com/auth/signin/google",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    console.log(data)
    return data;
};



export const changeData = async(user:IUserChange) => {
    const response = await fetch(`https://api-sivoy.onrender.com/users/${user.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al actualizar los datos: ${errorData.message}`);
      }
      const updatedUser = await response.json();
      return updatedUser;
}