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
      setUpdating(false);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró un token de autenticación.");
        return;
      }

      // Paso 1: Llamar a la API para exportar "Donation"
      const exportResponse = await axios.get(
        "https://api-sivoy.onrender.com/data/export/Donation", // Aquí enviamos la entidad Donation
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Asumimos que el objeto de respuesta tiene la propiedad `fileName`
      const fileName = exportResponse.data.fileName;
      if (!fileName) {
        setError("No se pudo obtener el nombre del archivo.");
        return;
      }

      // Paso 2: Descargar el archivo exportado
      const downloadResponse = await axios({
        url: `https://api-sivoy.onrender.com/data/download/${fileName}`,
        method: "GET",
        responseType: "blob", // Esto es importante para manejar archivos binarios
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Nombre del archivo que descargaremos
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Elimina el enlace tras la descarga

    } catch (err) {
      setError("Hubo un problema al descargar el archivo.");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleUpdateDonations = async () => {
    setUpdating(true);
    await fetchDonations();
  };

  if (loading) {
    <p className="loader"></p>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Listado de Donaciones</h1>
        <div>
          <button
            onClick={handleUpdateDonations}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={updating}
          >
            {updating ? "Actualizando..." : "Actualizar Donaciones"}
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
          >
            Descargar Excel
          </button>
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="text-center">No hay donaciones disponibles.</div>
      ) : (
        <div className="space-y-4">
          {donations.map((donation, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <button
                className="custom-button"
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
