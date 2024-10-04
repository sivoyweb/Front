"use client"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
//import { changeData } from "@/lib/server/fetchUsers";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import axios from "axios";



const UserDashboard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLogged,user } = useContext(UserContext);
  const router = useRouter()
 const token = localStorage.getItem('token');
  
  const [formData, setFormData] = useState({
    name:user?.name || '',
    phone:user?.phone || '',
    disability:[{
      category:'',
      name:'',
    }],
    credential: {
      avatar: {
        url: '',
        publicId: '',
      },
    },
    id:user?.id,
    
   });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false); 
  
  const {data:session} = useSession();
  
  

 
  useEffect(() => {
    if(!isLogged){
      Swal.fire({
        titleText:"Necesitas estar logueado",
        icon:"warning"
      });
      setTimeout(() => {
        router.push('/login')
      }, 2000);
    }
  },[isLogged,router])
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true);

try {
  if(user){

    await axios.put(`https://api-sivoy.onrender.com/users/${user.id}`,formData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
  Swal.fire({
    title: "Cambios guardados con éxito",
    icon: 'success',
  });
} catch (error) {
  console.error(error)
  Swal.fire({
    title: "Error",
    text: "No se pudieron guardar los cambios.",
    icon: 'error',
  });
} finally{
  setIsSubmitting(false);
}
};

  
  const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData)=> ({
      ...prevData,
      [name]:name=== "disability" ? value.split(",") : value,
    }));
  };

  const handleChangeDisability = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const { value } = e.target;
  
    setFormData((prevData) => {
      const updatedDisability = [...prevData.disability];
      updatedDisability[index] = {
        ...updatedDisability[index],
        [field]: value, 
      };
  
      return {
        ...prevData,
        disability: updatedDisability,
      };
    });
  };

 



  const renderSection = () => {
    
    switch (activeSection) {
     
      case 'favorites':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Lugares Favoritos</h2>
            <ul>
              <li className="text-gray-600">Lugar 1: ------</li>
              <li className="text-gray-600">Lugar 2: ------</li>
            </ul>
          </div>
        );
      case 'account':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-20">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Cuenta</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="focus:text-white hover:text-gray-700"
              >
                {isEditing ? "Cancelar" : "Editar información"}
              </button>
            </div>
            {!isEditing ? (
              <>
                <p className="text-gray-600">Nombre: {user?.name || session?.user?.name}</p>
                <p className="text-gray-600">Email: {user?.credential?.email || session?.user?.email}</p>
               {!session?.user ? <p className="text-gray-600">Teléfono:{user?.phone} </p> : null}
                
              </>
            ) : (
              <form className="space-y-4"
                    onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    defaultValue={user?.name}
                  />
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="Ingresa tu número de teléfono"
                  />
                </div>
                <div>
  <label className="block text-sm font-medium text-gray-700">Discapacidad</label>
  {formData.disability.map((disability, index) => (
    <div key={index} className="flex space-x-2">
      <input
        name={`disability-category-${index}`}
        value={disability.category}
        onChange={(e) => handleChangeDisability(e, index, 'category')}
        type="text"
        className="mt-1 p-2 border border-gray-300 rounded w-full"
        placeholder="Ingrese categoría"
      />
      <input
        name={`disability-name-${index}`}
        value={disability.name}
        onChange={(e) => handleChangeDisability(e, index, 'name')}
        type="text"
        className="mt-1 p-2 border border-gray-300 rounded w-full"
        placeholder="Ingrese nombre"
      />
    </div>
  ))}
</div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Avatar</label>
                  <CldUploadWidget uploadPreset="siVoyPreset"
                                   onSuccess={(result)=>{

                                    

                                    const uploadedImage = result?.info as CloudinaryUploadWidgetInfo;
                                    if(uploadedImage){ 
                                      
                                      
                                    setFormData((prevData)=>({
                                      ...prevData,
                                      credential:{
                                        ...prevData.credential,
                                        avatar:{
                                          url:uploadedImage.secure_url || '',
                                          publicId:uploadedImage.public_id || '',
                                        },
                                      },
                                    }));
                                    Swal.fire({
                                      title:"Imagen subida con exito",
                                      icon:"success"
                                    })
                                  }else{
                                    Swal.fire({
                                      title:"Error al subir la imagen",
                                      icon:"error"
                                      
                                    })
                                  }
                                   }}>
                  {({open})=>{
                    return <button className='focus text-xs px-3 py-2' 
                                    onClick={()=>open()}>Subir imagen</button>
                  }}
                  </CldUploadWidget>
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 text-white px-4 py-2 hover:text-gray-700 text-align-right ml-auto block"
                >
                 {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </button>
              </form>
            )}
          </div>
        );
      
      default:
        return <p>Selecciona una opción del menú.</p>;
    }
  };
  console.log(formData)

  return (
    <div className="flex h-screen bg-gray-100 font-arialroundedmtbold text-sivoy-blue">
      <div
        className={`bg-sivoy-gradient text-white ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none"
          >
            {sidebarOpen ? <span>&#10005; Cerrar</span> : <span>&#9776;</span>}
          </button>
        </div>
        <nav className="mt-10">
         
          <a
            href="#"
            onClick={() => setActiveSection('favorites')}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Favoritos
          </a>
          <a
            href="#"
            onClick={() => setActiveSection('account')}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Cuenta
          </a>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <header className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <div className="flex items-center">
          
             <Image
             alt="imagen de perfil"
             src={user?.credential?.avatar.url || session?.user?.image || ''}
             width={50}  
             height={50} 
             className="rounded-full" />
                   </div>
        </header>

        <main className="mt-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
