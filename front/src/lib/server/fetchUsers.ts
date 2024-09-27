import { ILogin, IloginGoogle, IRegister, IRegisterGoogle, IUserChange } from "../../interfaces/interfaces";

export const postRegister = async (user: IRegister | IRegisterGoogle)=>{
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


export const postLogin = async (credentials: ILogin | IloginGoogle) =>{
    const response = await fetch("https://api-sivoy.onrender.com/auth/signin",{
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