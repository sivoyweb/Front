"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { format } from "date-fns";
import Image from "next/image";
import { IPromotionAdmin } from "@/interfaces/interfaces";
import CloudinaryButton from "../CloudinaryButton";

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

    // Mostrar confirmación antes de editar la promoción
    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas actualizar esta promoción?",
      text: "Se aplicarán los cambios realizados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario cancela, salir de la función
    if (!result.isConfirmed) {
      return;
    }

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
        "La promoción ha sido actualizada correctamente"
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
        Swal.fire("La promoción ha sido eliminada.");
        setPromotions(promotions.filter((promotion) => promotion.id !== id));
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar la promoción.", "error");
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        MySwal.fire({
          title: "Error",
          text: "No se encontró un token de autenticación.",
          icon: "error",
        });
        return;
      }

      // Paso 1: Llamar a la API para exportar "Promotion"
      const exportResponse = await axios.get(
        "https://api-sivoy.onrender.com/data/export/Promotion", // Cambia 'Promotion' según tu entidad
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Asumimos que el objeto de respuesta tiene la propiedad `fileName`
      const fileName = exportResponse.data.fileName;
      if (!fileName) {
        MySwal.fire({
          title: "Error",
          text: "No se pudo obtener el nombre del archivo.",
          icon: "error",
        });
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
      MySwal.fire({
        title: "¡Error!",
        text: "Hubo un problema al descargar el archivo.",
        icon: "error",
      });
    }
  };

  if (loading) {
    <p className="loader"></p>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Lista de Promociones</h1>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Descargar Promociones en Excel
        </button>
      </div>

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
                className="custom-button"
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
                          alt={`Imagen de ${promotion.name}`}
                          width={128}
                          height={128}
                          className="object-cover inline-block mr-2 w-32 h-32"
                        />
                      ))}
                    </div>
                    <CloudinaryButton />
                    <button
                      onClick={() => handleEdit(promotion.id)}
                      className="guardarInfo m-2"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setEditingPromotion(null)}
                      className="cancelarBtn"
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
                          alt={`Imagen de ${promotion.name}`}
                          width={128}
                          height={128}
                          className="object-cover inline-block mr-2 w-32 h-32"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingPromotion(promotion)}
                        className="editarBtn"
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
