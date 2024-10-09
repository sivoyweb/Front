"use client"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import axios from "axios";
import { IDisability } from "@/interfaces/interfaces";



interface Credential {
  avatar: {
    url: string;
    publicId: string;
  };
}
interface FormData {
  name: string;
  phone: string;
  disabilities: IDisability[];
  credential: Credential;
  isRepresentative: boolean | null;
  id: string | undefined; 
}


const UserDashboard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { user ,updateUser} = useContext(UserContext);
  
  const router = useRouter()

  const disabilitiesOption=[
    { category: 'Visual', selected: false },
    { category: 'Auditiva', selected: false },
    { category: 'Motora', selected: false },
    { category: 'Física', selected: false },
    { category: 'Sensorial', selected: false },
    { category: 'Cognitiva', selected: false },
    { category: 'Psicosocial', selected: false },
  ]

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  
  const [formData, setFormData] = useState<FormData>({
    name:user?.name || '',
    phone:user?.phone || '',
    disabilities:user?.disabilities || [],
    credential: {
      avatar: {
        url: user?.credential?.avatar?.url || '',
        publicId: user?.credential?.avatar?.publicId || '',
      },
    },
    id:user?.id,
    isRepresentative:user?.isRepresentative || null 
   });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('account');
  const [isEditing, setIsEditing] = useState(false); 
  const [selectedDisabilities, setSelectedDisabilities] = useState<string[]>([]);
  const [isDisabilityListOpen, setIsDisabilityListOpen] = useState(false);
  

  
  

 
  useEffect(() => {
    if(!user){
      Swal.fire({
        titleText:"Ingresa a tu cuenta o regístrate para entrar al Panel de Usuario",
        icon:"warning"
      });
      setTimeout(() => {
        router.push('/login')
      }, 2000);
    }
  },[user,router])
  
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
        
           const response = await axios.put(`https://api-sivoy.onrender.com/users/${user.id}`,formData,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            });

            if(response.data && response.data.user){
              updateUser(response.data.user)
            }
           
            
          }
          Swal.fire({
            title: "Cambios guardados con éxito",
            icon: 'success',
          });
        } catch (error) {
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

  

  const handleToggleDisability = (disabilityCategory: string) => {
    setFormData((prev: FormData) => {
      const isAlreadySelected = prev.disabilities.some(disability => disability.name === disabilityCategory);
  
      // Actualiza el array de discapacidades en el formData
      const updatedDisabilities = isAlreadySelected
        ? prev.disabilities.filter(disability => disability.name !== disabilityCategory) // Si está seleccionada, la eliminamos
        : [...prev.disabilities, { name: disabilityCategory } as IDisability]; // Si no está, la añadimos
  
      return {
        ...prev,
        disabilities: updatedDisabilities,
      };
    });
  
    // Actualiza el array de discapacidades seleccionadas para el span
    setSelectedDisabilities((prevSelected) => {
      if (prevSelected.includes(disabilityCategory)) {
        return prevSelected.filter((item) => item !== disabilityCategory);
      } else {
        return [...prevSelected, disabilityCategory];
      }
    });
  };

  const handleRepresentativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      isRepresentative: checked, // Actualiza el estado según el valor del checkbox
    }));
  };
  

  const toggleDisabilityList = () => setIsDisabilityListOpen(!isDisabilityListOpen);


console.log("este es el formdata:",formData);


  const renderSection = () => {
    
    switch (activeSection) {
     
      
      case 'account':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-20 font-arialroundedmtbold">
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
                <p className="text-gray-600">Nombre: {user?.name }</p>
                <p className="text-gray-600">Email: {user?.credential?.email }</p>
               <p className="text-gray-600">Teléfono:{user?.phone} </p> 
               <p className="text-gray-600">Representante: {user?.phone}</p>
               <p className="text-gray-600">discapcidad/es: {
          (user?.disabilities ?? []).map(disability => disability.name).join(', ') || 'Ninguna'
        }</p>
                
              </>
            ) : (
              <form className="space-y-4 font-arialroundedmtbold"
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
                  <label className="flex items-center mt-7">
                    <input
                      type="checkbox"
                      name="isRepresentative"
                      checked={formData.isRepresentative || undefined}
                      onChange={handleRepresentativeChange} 
                      className="mr-2"
                    />
                    Soy representante de alguien más
                  </label>
                </div>
                <div className="flex gap-4">
 {/*categories*/}
<div className="w-full max-w-xs flex flex-col gap-1 mt-5 mb-5">
  <label htmlFor="disabilities" className="w-fit pl-0.5 text-sm text-neutral-600">Discapacidad</label>
  <div className="relative">
    <button
      type="button"
      role="combobox"
      onClick={toggleDisabilityList}
      className="inline-flex w-full items-center justify-between gap-2 whitespace-nowrap border-0 bg-transparent px-4 py-2 text-sm font-medium capitalize tracking-wide text-neutral-600 transition hover:bg-gray-200 focus:bg-gray-300 focus:outline-none"
      aria-haspopup="listbox"
      aria-controls="namesList"
    >
  <span className="text-sm w-full font-normal text-start overflow-hidden text-ellipsis whitespace-nowrap">
  {selectedDisabilities.length > 0
    ? Array.from(new Set([
        ...selectedDisabilities, 
        ...(user?.disabilities ?? []).map(disability => disability.name)
      ])).join(', ') // Combina las discapacidades seleccionadas con las que ya tiene el usuario
    : (user?.disabilities ?? []).map(disability => disability.name).join(', ') // Si no hay nuevas seleccionadas, muestra las anteriores
  }
</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
      </svg>
    </button>

    <input id="disabilities" name="disabilities" type="text" hidden value={selectedDisabilities.join(',')} />
    <ul id="disabilitiesList"
      className={`absolute z-10 left-0 top-full flex max-h-44 w-full flex-col overflow-hidden overflow-y-auto border-neutral-300 bg-neutral-50 py-1.5 rounded-md transition-height ${
        isDisabilityListOpen ? 'visible-list' : 'hidden-list'
      }`}
      role="listbox"
      
    >
        {disabilitiesOption.map(option => (
        <li key={option.category} role="option">
          <label className="combobox-label flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.disabilities.some(disability => disability.name === option.category)} // Verifica si la discapacidad está seleccionada
              onChange={() => handleToggleDisability(option.category)} // Controlador para añadir/eliminar discapacidades
            />
            <span>{option.category}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
</div>

  
 
</div>




                 <div>
                  <label className="block text-sm font-medium text-gray-700 mt-6 ">Avatar</label>
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
  

  return (
    <div className="flex h-screen bg-gray-100 font-arialroundedmtbold text-sivoy-blue">
      <div
        className={`bg-sivoy-gradient text-white ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        <div className="p-2">
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
             src={user?.credential?.avatar?.url ||  ''}
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
