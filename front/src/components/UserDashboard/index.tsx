"use client";
import { IUser } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
 
  
  useEffect(() => {
   const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

   if(userData){
    const parsedData = JSON.parse(userData);
    setUser(parsedData);
   }
  }, [])
  

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
            
            {sidebarOpen ? <span>&#10005; Cerrar</span> : <span>&#9776; </span>}
          </button>
        </div>
        <nav className="mt-10">
          <a
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Perfil
          </a>
          <a
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Favoritos
          </a>
          <a
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Cuenta
          </a>
          <a
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Ajustes
          </a>
        </nav>
      </div>

      
      <div className="flex-1 p-6">
        
        <header className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <div className="flex items-center">
            <span className="ml-2 text-sm font-medium">Bienvenido, {user?.name}</span>
          </div>
        </header>

        
        <main className="mt-8">
          <div className="block space-y-6">
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Reseñas</h2>
              <ul>
                <li className="text-gray-600">Reseña 1 - 10/12/2024</li>
                <li className="text-gray-600">Reseña 2 - 11/12/2024</li>
                <li className="text-gray-600">Reseña 3 - 15/12/2024</li>
              </ul>
            </div>

            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">lugares Favoritos</h2>
              <ul>
                <li className="text-gray-600">Lugar 1: ------</li>
                <li className="text-gray-600">Lugar 2: ------</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
