"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { format } from "date-fns";
import Image from "next/image";
import { IPromotionAdmin } from "@/interfaces/interfaces";

// SweetAlert2 con React
const MySwal = withReactContent(Swal);

const AdminPromotionComponent = () => {
  const [promotions, setPromotions] = useState<IPromotionAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPromotion, setEditingPromotion] =
    useState<IPromotionAdmin | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotions = async () => {
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
        "https://api-sivoy.onrender.com/promotions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPromotions(response.data);
    } catch (err) {
      console.error("Error al obtener las promociones", err);
      setError("Hubo un problema al obtener las promociones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleEdit = async (id: string) => {
    if (!editingPromotion) return;

    const token = localStorage.getItem("token");
    try {
      const { name, description, validFrom, validUntil, images } =
        editingPromotion;
      await axios.put(
        `https://api-sivoy.onrender.com/promotions/${id}`,
        { name, description, validFrom, validUntil, images },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire(
        "Promoción actualizada",
        "La promoción ha sido actualizada correctamente",
        "success"
      );
      setEditingPromotion(null);
      fetchPromotions();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la promoción.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const result = await MySwal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.delete(`https://api-sivoy.onrender.com/promotions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("¡Eliminado!", "La promoción ha sido eliminada.", "success");
        setPromotions(promotions.filter((promotion) => promotion.name !== id));
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar la promoción.", "error");
    }
  };

  const handleImageUpdate = () => {
    // Aquí puedes agregar la lógica del widget de Cloudinary
    console.log("Abrir widget de Cloudinary");
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Promociones</h1>

      {/* Botón para actualizar la lista de promociones */}
      <div className="text-right mb-4">
        <button
          onClick={fetchPromotions}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Actualizar Promociones
        </button>
      </div>

      {promotions.length === 0 ? (
        <div className="text-center">No hay promociones disponibles.</div>
      ) : (
        <div className="space-y-4">
          {promotions.map((promotion, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <button
                className="w-full text-left"
                onClick={() =>
                  document
                    .getElementById(`promotion-${index}`)
                    ?.classList.toggle("hidden")
                }
              >
                <div className="font-bold text-xl">{promotion.name}</div>
              </button>

              <div id={`promotion-${index}`} className="hidden mt-4">
                {editingPromotion?.name === promotion.name ? (
                  <div>
                    <input
                      type="text"
                      value={editingPromotion.name}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          name: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <textarea
                      value={editingPromotion.description || ""}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          description: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <p>Valido desde el:</p>
                    <input
                      type="date"
                      value={format(
                        new Date(editingPromotion.validFrom),
                        "yyyy-MM-dd"
                      )}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          validFrom: new Date(e.target.value),
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <p>Vence el:</p>
                    <input
                      type="date"
                      value={format(
                        new Date(editingPromotion.validUntil),
                        "yyyy-MM-dd"
                      )}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          validUntil: new Date(e.target.value),
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <div className="mb-2">
                      {editingPromotion.images?.map((img) => (
                        <Image
                          key={img.id}
                          src={img.url ?? `imagenes`}
                          alt={`Image for ${promotion.name}`}
                          width={128}
                          height={128}
                          className="object-cover inline-block mr-2 w-32 h-32"
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleImageUpdate}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
                    >
                      Actualizar Imágenes
                    </button>
                    <button
                      onClick={() => handleEdit(promotion.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setEditingPromotion(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>Descripción:</strong>{" "}
                      {promotion.description || "No disponible"}
                    </p>
                    <p>
                      <strong>Válido desde:</strong>{" "}
                      {format(new Date(promotion.validFrom), "dd/MM/yyyy")}
                    </p>
                    <p>
                      <strong>Válido hasta:</strong>{" "}
                      {format(new Date(promotion.validUntil), "dd/MM/yyyy")}
                    </p>
                    <p>
                      <strong>Estado:</strong>{" "}
                      {promotion.isActive ? "Activo" : "Inactivo"}
                    </p>
                    <div className="mb-2">
                      {promotion.images?.map((img) => (
                        <Image
                          key={img.id}
                          src={img.url ?? `imagenes`}
                          alt={`Image for ${promotion.name}`}
                          width={128}
                          height={128}
                          className="object-cover inline-block mr-2 w-32 h-32"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingPromotion(promotion)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(promotion.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPromotionComponent;
