"use client";
import Link from "next/link";
import { useState } from "react";
import AdminDonationsComponent from "../AdminDonationsComponent";
import AdminProjectsComponent from "../AdminProjectsComponent";
import AdminTeamComponent from "../AdminTeamComponent";
import AdminPromotionComponent from "../AdminPromotionComponent";
import AdminBlogsComponent from "../AdminBlogsComponent";
import AdminProvidersComponent from "../AdminProvidersComponent";
import AdminUsersComponent from "../AdminUsersComponent";
import AdminTravelComponent from "../AdminTravelComponent";


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("donaciones"); 

  const renderActiveSection = () => {
    switch (activeSection) {
      case "donaciones":
        return (
          <div className="block space-y-6">
           <AdminDonationsComponent />
            </div>
        );

      case "proyectos":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
           <AdminProjectsComponent />
          </div>
        );
      case "equipo":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
           <AdminTeamComponent />
          </div>
        );
      case "promociones":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
           <AdminPromotionComponent />
          </div>
        );

      case "blogs":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
           <AdminBlogsComponent />
          </div>
        );

      case "prestadores":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AdminProvidersComponent />
          </div>
        );
      case "gestion de usuarios":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
           <AdminUsersComponent />
          </div>
        );
      case "destinos":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AdminTravelComponent />
          </div>
        );

      default:
        return (
          <div className="block space-y-6">
           <p>Este es el default</p>           
          </div>
        );
    }
  };

  return (
    <div className="flex bg-gray-100 font-arialroundedmtbold text-sivoy-blue">
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
            onClick={() => setActiveSection("donaciones")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Donaciones
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("proyectos")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Proyectos
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("equipo")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Equipo
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("destinos")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Destinos
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("promociones")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Promociones
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("blogs")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Blogs
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("prestadores")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Prestadores
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("gestion de usuarios")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Usuarios
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

        <main className="mt-8 ">
          {renderActiveSection()} 
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
