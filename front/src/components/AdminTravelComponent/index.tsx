"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { IUpdateTravel } from "@/interfaces/interfaces";
import Image from "next/image";
import Loader from "@/components/Loader"

// SweetAlert2 con React
const MySwal = withReactContent(Swal);

const AdminTravelComponent = () => {
  const [travels, setTravels] = useState<IUpdateTravel[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTravel, setEditingTravel] = useState<IUpdateTravel | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api-sivoy.onrender.com/travels",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTravels(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchTravels();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.delete(`https://api-sivoy.onrender.com/travels/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        MySwal.fire("El destino ha sido eliminado.");
        setTravels(travels.filter((travel) => travel.id !== id));
      }
    } catch (error) {
      MySwal.fire("Error", "Hubo un problema al eliminar el destino.", "error");
    }
  };

  const handleSave = async () => {
    if (!editingTravel) return;
    const token = localStorage.getItem("token");
    setSaving(true);
    try {
      await axios.put(
        `https://api-sivoy.onrender.com/travels/${editingTravel.id}`,
        editingTravel,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTravels(
        travels.map((travel) =>
          travel.id === editingTravel.id ? editingTravel : travel
        )
      );
      setEditingTravel(null);
      MySwal.fire("¡El destino ha sido actualizado!");
    } catch (error) {
      MySwal.fire(
        "Error",
        "Hubo un problema al actualizar el destino.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      {travels.length === 0 ? (
        <div>No hay viajes disponibles</div>
      ) : (
        <div className="space-y-4">
          {travels.map((travel) => (
            <div key={travel.id} className="border rounded-lg p-4 shadow-md">
              {editingTravel?.id === travel.id ? (
                <div>
                  {/* Inputs de edición */}
                  <input
                    type="text"
                    value={editingTravel.name}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={editingTravel.country}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        country: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={editingTravel.city}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        city: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <textarea
                    value={editingTravel.description}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={editingTravel.serviceType}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        serviceType: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={editingTravel.website}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        website: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={editingTravel.phone}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <input
                    type="email"
                    value={editingTravel.email}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={editingTravel.address}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        address: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    value={editingTravel.openingHours}
                    onChange={(e) =>
                      setEditingTravel({
                        ...editingTravel,
                        openingHours: e.target.value,
                      })
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                    onClick={() => setEditingTravel(null)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div>
                  {/* Información del destino */}
                  <h2 className="font-bold text-xl">{travel.name}</h2>
                  <p>
                    <strong>País:</strong> {travel.country}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {travel.city}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {travel.description}
                  </p>
                  <p>
                    <strong>Tipo de servicio:</strong> {travel.serviceType}
                  </p>
                  <p>
                    <strong>Website:</strong> {travel.website}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {travel.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {travel.email}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {travel.address}
                  </p>
                  <p>
                    <strong>Horario de apertura:</strong> {travel.openingHours}
                  </p>

                  {/* Renderizar las imágenes */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {travel.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image.url || `imagen`} // Asegúrate de que `image` sea la URL completa
                        alt={`Imagen ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    ))}
                  </div>

                  {/* Botón para imágenes */}
                  <div className="flex justify-start items-center space-x-2 mt-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                      Subir Imágenes
                    </button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
                      Subir Sello de Accesibilidad
                    </button>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={() => setEditingTravel(travel)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(travel.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTravelComponent;
