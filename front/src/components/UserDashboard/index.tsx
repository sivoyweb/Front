"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

interface Review {
  date: string;
  id: string;
  review: string;
  stars: number;
  state: string;
}

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('account');
  const router = useRouter();

  // Definir fetchReviews antes de usarla
  const fetchReviews = useCallback(async (token: string) => {
    try {
      const response = await axios.get(`https://api-sivoy.onrender.com/users/${user?.id}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(response.data.reviews);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las reseñas",
        icon: 'error',
      });
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user) {
      Swal.fire({
        titleText: "Ingresa a tu cuenta o regístrate para entrar al Panel de Usuario",
        icon: "warning"
      });
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [user, router]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (user && storedToken) {
      fetchReviews(storedToken);
    }
  }, [user, fetchReviews]);

  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-20 ">
            <div className="flex justify-between items-center">
              <h2 className="text-xl mb-4 font-arialroundedmtbold">Información del Usuario</h2>
              <button
                onClick={() => setActiveSection('edit')}
                className="focus:text-white hover:text-gray-700"
              >
                Editar información
              </button>
            </div>
            <div className="grid grid-cols-2 mt-8">
              <p className="text-sivoy-blue font-arialroundedmtbold">Nombre y Apellido:</p><span>{user?.name}</span>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-sivoy-blue font-arialroundedmtbold">Correo Electrónico:</p><span>{user?.credential?.email}</span>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-sivoy-blue font-arialroundedmtbold">Teléfono de Contacto:</p><span>{user?.phone}</span>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-sivoy-blue font-arialroundedmtbold">¿Es representante de un tercero?</p><span>{user?.isRepresentative ? "Sí" : "No"}</span>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-sivoy-blue font-arialroundedmtbold">Discapacidad/es:</p><span>{user?.disabilities?.map(disability => disability.name).join(', ') || 'Ninguna'}</span>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl mb-4 font-arialroundedmtbold">Reseñas</h2>
            {reviews.length === 0 ? (
              <p>No hay reseñas disponibles.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold">Reseña #{index + 1}</h3>
                    <p className="text-sm text-gray-600">Comentario: {review.review}</p>
                    <p className="text-sm text-gray-600">Fecha: {review.date}</p>
                    <p className="text-sm text-gray-600">Estado: {review.state}</p>
                    <p className="mt-2 font-bold">Calificación: {review.stars}/5</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return <p>Selecciona una opción del menú.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-sivoy-blue">
      <div className={`bg-sivoy-gradient text-white ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300`}>
        <div className="p-2">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none">
            {sidebarOpen ? <span>&#10005; Cerrar</span> : <span>&#9776;</span>}
          </button>
        </div>
        <nav className="mt-10">
          <a href="#" onClick={() => setActiveSection('account')} className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue font-arialroundedmtbold`}>
            Cuenta
          </a>
          <a href="#" onClick={() => setActiveSection('reviews')} className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue font-arialroundedmtbold`}>
            Reseñas
          </a>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <header className="flex justify-between items-center bg-white shadow p-4 rounded-3xl">
          <h1 className="text-2xl font-arialroundedmtbold">Perfil</h1>
          <div className="flex items-center">
            <Image
              alt="imagen de perfil"
              src={user?.credential?.avatar?.url || 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1728364236/qclbqnbkrp0jxjmkpguj.png'}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        </header>
        <main className="mt-8">{renderSection()}</main>
      </div>
    </div>
  );
};

export default UserDashboard;
