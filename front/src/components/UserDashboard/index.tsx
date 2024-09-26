"use client";
import { UserContext } from "@/context/userContext";
import { useContext, useState } from "react";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('profile'); // Estado para controlar la sección activa
  const { user } = useContext(UserContext);

  // Funciones para manejar el contenido a renderizar
  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Perfil</h2>
            <p className="text-gray-600">Nombre: {user?.user?.name}</p>
            <p className="text-gray-600">Email: {user?.user?.email}</p>
          </div>
        );
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Cuenta</h2>
            <p className="text-gray-600">Información de la cuenta del usuario</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Ajustes</h2>
            <p className="text-gray-600">Ajustes de la cuenta y preferencias</p>
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
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none"
          >
            {sidebarOpen ? <span>&#10005; Cerrar</span> : <span>&#9776;</span>}
          </button>
        </div>
        <nav className="mt-10">
          {/* Cambiamos el estado según el enlace seleccionado */}
          <a
            href="#"
            onClick={() => setActiveSection('profile')}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Perfil
          </a>
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
          <a
            href="#"
            onClick={() => setActiveSection('settings')}
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
            <span className="ml-2 text-sm font-medium">
              Bienvenido, {user?.user?.name}
            </span>
          </div>
        </header>

        <main className="mt-8">
          {/* Aquí se renderiza dinámicamente el contenido */}
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
