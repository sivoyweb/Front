"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { IDonationAdmin } from "@/interfaces/interfaces";

const AdminDonationsComponent = () => {
  const [donations, setDonations] = useState<IDonationAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDonations = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró un token de autenticación.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "https://api-sivoy.onrender.com/donations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDonations(response.data);
    } catch (err) {
      setError("Hubo un problema al obtener las donaciones.");
    } finally {
      setLoading(false);
      setUpdating(false); // Apagar el estado de actualización
    }
  };

  // Se llama a fetchDonations al montar el componente
  useEffect(() => {
    fetchDonations();
  }, []);

  // Manejador para actualizar las donaciones
  const handleUpdateDonations = async () => {
    setUpdating(true);
    await fetchDonations(); // Reutilizamos la función fetchDonations para actualizar
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Listado de Donaciones</h1>
        <button
          onClick={handleUpdateDonations}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={updating}
        >
          {updating ? "Actualizando..." : "Actualizar Donaciones"}
        </button>
      </div>

      {donations.length === 0 ? (
        <div className="text-center">No hay donaciones disponibles.</div>
      ) : (
        <div className="space-y-4">
          {donations.map((donation, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <button
                className="w-full text-left"
                onClick={() =>
                  document
                    .getElementById(`donation-${index}`)
                    ?.classList.toggle("hidden")
                }
              >
                <div className="font-bold text-xl">{donation.payer.name}</div>
              </button>
              <div id={`donation-${index}`} className="hidden mt-4">
                <p>
                  <strong>Email del donante:</strong> {donation.payer.email}
                </p>
                <p>
                  <strong>Precio unitario:</strong> ${donation.amount}
                </p>
                {donation.description && (
                  <p>
                    <strong>Descripción:</strong> {donation.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDonationsComponent;
