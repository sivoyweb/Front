"use client";
import Link from "next/link";
import { useState } from "react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <Link
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Perfil
          </Link>
          <Link
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Gestion de usuarios
          </Link>
          <Link
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Proyectos
          </Link>
          <Link
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Preguntas
          </Link>
          <Link
            href="#"
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Contactos
          </Link>
        </nav>
      </div>

      
      <div className="flex-1 p-6">
        
        <header className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <div className="flex items-center">
            <span className="ml-2 text-sm font-medium">Bienvenido, Administrador</span>
          </div>
        </header>

        
        <main className="mt-8">
          <div className="block space-y-6">
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Donaciones</h2>
              <ul>
                <li className="text-gray-600">donacion 1 - 10/12/2024</li>
                <li className="text-gray-600">donacion 2 - 11/12/2024</li>
                <li className="text-gray-600">donacion 3 - 15/12/2024</li>
              </ul>
            </div>

            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Equipo</h2>
              <ul>
                <li className="text-gray-600">Equipo 1: ------</li>
                <li className="text-gray-600">Equipo 2: ------</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
