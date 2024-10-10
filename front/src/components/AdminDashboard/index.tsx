"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AdminDonationsComponent from "../AdminDonationsComponent";
import AdminProjectsComponent from "../AdminProjectsComponent";
import AdminTeamComponent from "../AdminTeamComponent";
import AdminPromotionComponent from "../AdminPromotionComponent";
import AdminBlogsComponent from "../AdminBlogsComponent";
import AdminProvidersComponent from "../AdminProvidersComponent";
import AdminUsersComponent from "../AdminUsersComponent";
import AdminTravelComponent from "../AdminTravelComponent";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import AdminReviewsComponent from "../AdminReviewsComponent";
import AdminFaqComponent from "../AdminFaqComponent";
import ProjectForm from "../ProjectForm";
import TeamForm from "../TeamForm";
import PromotionForm from "../PromotionForm";
import BlogForm from "../BlogForm";
import TravelForm from "../TravelForm";
import ProvidersForm from "../ProvidersForm";
import FaqForm from "../FaqForm";
import AdminAliComponent from "../AdminAliComponent";
import AliForm from "../AliForm";


const AdminDashboard = () => {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("donaciones"); 
  const { user } = useContext(UserContext)

  useEffect(() => {
  if(user?.role !== "admin"){
    router.push('/')
  }
  }, [user,router])
  

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
          <div className=" flex bg-white rounded-lg shadow-lg p-3">
           <AdminProjectsComponent />
           <ProjectForm />
          </div>
        );
      case "equipo":
        return (
          <div className=" flex bg-white rounded-lg shadow-lg p-6">
           <AdminTeamComponent />
           <TeamForm/>
          </div>
        );
      case "promociones":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
           <AdminPromotionComponent />
           <PromotionForm />
          </div>
        );

      case "blogs":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
           <AdminBlogsComponent />
           <BlogForm />
          </div>
        );

      case "prestadores":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AdminProvidersComponent />
            <ProvidersForm />
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
            <TravelForm />
            <AdminTravelComponent />
          </div>
        );
      case "reviews":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AdminReviewsComponent />
          </div>
        );
      case "FAQ":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AdminFaqComponent />
            <FaqForm />
          </div>
        );
      case "alianza":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AdminAliComponent />
            <AliForm />
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
          <Link
            href="#"
            onClick={() => setActiveSection("reviews")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Reseñas
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("FAQ")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            FAQ
          </Link>
          <Link
            href="#"
            onClick={() => setActiveSection("alianza")}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Alianzas
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
