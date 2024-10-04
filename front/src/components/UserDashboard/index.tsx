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
    disabilities:[
      { category: 'Visual', name: 'Ceguera' },
      { category: 'Auditiva', name: 'Sordera' },
      { category: 'Motora', name: 'Parálisis' }
    ],
    credential: {
      avatar: {
        url: '',
        publicId: '',
      },
    },
    id:user?.id,
    
   });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('account');
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
    Swal.fire({
    title: '¿Estás seguro de los cambios?',
    text: "Revisa los campos antes de continuar.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, guardar cambios',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
    }).then(async(result)=> {
      if(result.isConfirmed){
        setIsSubmitting(true);
        try {
          if(user){
        
            await axios.put(`https://api-sivoy.onrender.com/users/${user.id}`,formData,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            });
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
    }else if(result.dismiss === Swal.DismissReason.cancel){
      Swal.fire({
        title:"Cambios cancelados",
        icon:'info',
      });
    }
    });


};

  
  const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData)=> ({
      ...prevData,
      [name]:name=== "disability" ? value.split(",") : value,
    }));
  };

  // const handleChangeDisability = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
  //   const { value } = e.target;
  
  //   setFormData((prevData) => {
  //     const updatedDisability = [...prevData.disabilities];
  //     updatedDisability[index] = {
  //       ...updatedDisability[index],
  //       [field]: value, 
  //     };
  
  //     return {
  //       ...prevData,
  //       disability: updatedDisability,
  //     };
  //   });
  // };

 



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
                <div className="flex gap-4">
  {/*categories*/}
  <div className="w-full max-w-xs flex flex-col gap-1">
    <label htmlFor="disabilities" className="w-fit pl-0.5 text-sm text-neutral-600 dark:text-neutral-300">Disabilities</label>
    <div className="relative">
      <button type="button" role="combobox" className="inline-flex w-full items-center justify-between gap-2 whitespace-nowrap border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium capitalize tracking-wide text-neutral-600 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:focus-visible:outline-white border rounded-md" aria-haspopup="listbox" aria-controls="disabilitiesList">
        <span className="text-sm w-full font-normal text-start overflow-hidden text-ellipsis  whitespace-nowrap">Please Select</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/>
        </svg>
      </button>

      <input id="disabilities" name="disabilities" type="text" hidden />
      <ul id="disabilitiesList" className="absolute z-10 left-0 top-11 flex max-h-44 w-full flex-col overflow-hidden overflow-y-auto border-neutral-300 bg-neutral-50 py-1.5 dark:border-neutral-700 dark:bg-neutral-900 border rounded-md" role="listbox">
        <li role="option">
          <label className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-950/5 dark:text-neutral-300 dark:hover:bg-white/5">
            <div className="relative flex items-center">
              <input type="checkbox" className="combobox-option peer relative size-4 cursor-pointer appearance-none overflow-hidden border border-neutral-300 bg-neutral-50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-neutral-800 rounded dark:border-neutral-700 dark:bg-neutral-900" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="4" className="pointer-events-none invisible absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-neutral-100 peer-checked:visible dark:text-black" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <span>Disability Option 1</span>
          </label>
        </li>
        <li role="option">
          <label className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-950/5 dark:text-neutral-300 dark:hover:bg-white/5">
            <div className="relative flex items-center">
              <input type="checkbox" className="combobox-option peer relative size-4 cursor-pointer appearance-none overflow-hidden border border-neutral-300 bg-neutral-50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-neutral-800 rounded dark:border-neutral-700 dark:bg-neutral-900" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="4" className="pointer-events-none invisible absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-neutral-100 peer-checked:visible dark:text-black" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <span>Disability Option 2</span>
          </label>
        </li>
      </ul>
    </div>
  </div>

  {/*names*/}
  <div className="w-full max-w-xs flex flex-col gap-1">
    <label htmlFor="names" className="w-fit pl-0.5 text-sm text-neutral-600 dark:text-neutral-300">Names</label>
    <div className="relative">
      <button type="button" role="combobox" className="inline-flex w-full items-center justify-between gap-2 whitespace-nowrap border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium capitalize tracking-wide text-neutral-600 transition hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:focus-visible:outline-white border rounded-md" aria-haspopup="listbox" aria-controls="namesList">
        <span className="text-sm w-full font-normal text-start overflow-hidden text-ellipsis  whitespace-nowrap">Please Select</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/>
        </svg>
      </button>

      <input id="names" name="names" type="text" hidden />
      <ul id="namesList" className="absolute z-10 left-0 top-11 flex max-h-44 w-full flex-col overflow-hidden overflow-y-auto border-neutral-300 bg-neutral-50 py-1.5 dark:border-neutral-700 dark:bg-neutral-900 border rounded-md" role="listbox">
        <li role="option">
          <label className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-950/5 dark:text-neutral-300 dark:hover:bg-white/5">
            <div className="relative flex items-center">
              <input type="checkbox" className="combobox-option peer relative size-4 cursor-pointer appearance-none overflow-hidden border border-neutral-300 bg-neutral-50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-neutral-800 rounded dark:border-neutral-700 dark:bg-neutral-900" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="4" className="pointer-events-none invisible absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-neutral-100 peer-checked:visible dark:text-black" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <span>Nombre 1</span>
          </label>
        </li>
        <li role="option">
          <label className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-950/5 dark:text-neutral-300 dark:hover:bg-white/5">
            <div className="relative flex items-center">
              <input type="checkbox" className="combobox-option peer relative size-4 cursor-pointer appearance-none overflow-hidden border border-neutral-300 bg-neutral-50 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-neutral-800 rounded dark:border-neutral-700 dark:bg-neutral-900" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="4" className="pointer-events-none invisible absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 text-neutral-100 peer-checked:visible dark:text-black" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>
            </div>
            <span>Nombre 2</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
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
