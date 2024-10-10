"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";

interface IImage {
  url: string | null;
  publicId: string;
  alt: string;
}

export interface IAlliances {
  id: string;
  name: string;
  url: string;
  visible: boolean;
  image: IImage;
}

const AdminAliComponent: React.FC = () => {
  const [alliances, setAlliances] = useState<IAlliances[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [editingAlliance, setEditingAlliance] = useState<IAlliances | null>(
    null
  );

  useEffect(() => {
    fetchAlliances();
  }, []);

  const fetchAlliances = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://api-sivoy.onrender.com/alliances", // Reemplaza con la URL de tu API
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlliances(response.data);
    } catch (error) {
      console.error("Error al obtener las alianzas:", error);
    }
  };

  const handleEdit = (alliance: IAlliances) => {
    setEditingAlliance(alliance);
  };

  const handleSave = async (allianceId: string, updatedData: IAlliances) => {
    const token = localStorage.getItem("token");
    console.log(updatedData);
    try {
      await axios.put(
        `https://api-sivoy.onrender.com/alliances/${allianceId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlliances((prevAlliances) =>
        prevAlliances.map((a) => (a.id === allianceId ? updatedData : a))
      );
      setEditingAlliance(null);
      Swal.fire({
        icon: "success",
        text: "¡Alianza actualizada exitosamente!",
      });
    } catch (error) {
      console.error("Error al actualizar la alianza:", error);
      Swal.fire({
        icon: "error",
        text: "Hubo un error al actualizar la alianza.",
      });
    }
  };

  const handleDelete = async (allianceId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://api-sivoy.onrender.com/alliances/${allianceId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlliances((prevAlliances) =>
        prevAlliances.filter((a) => a.id !== allianceId)
      );
      Swal.fire({
        icon: "success",
        text: "¡Alianza eliminada exitosamente!",
      });
    } catch (error) {
      console.error("Error al eliminar la alianza:", error);
      Swal.fire({
        icon: "error",
        text: "Hubo un error al eliminar la alianza.",
      });
    }
  };

  const handleDeactivate = async (allianceId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `https://api-sivoy.onrender.com/alliances/${allianceId}`,
        { visible: false }, // Actualiza el campo "visible" a false
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlliances((prevAlliances) =>
        prevAlliances.map((a) =>
          a.id === allianceId ? { ...a, visible: false } : a
        )
      );
      Swal.fire({
        icon: "success",
        text: "¡Alianza desactivada exitosamente!",
      });
    } catch (error) {
      console.error("Error al desactivar la alianza:", error);
      Swal.fire({
        icon: "error",
        text: "Hubo un error al desactivar la alianza.",
      });
    }
  };

  const handleImageUpload = (
    allianceId: string,
    result: CloudinaryUploadWidgetInfo | undefined
  ) => {
    if (result && typeof result === "object") {
      const newImage: IImage = {
        url: result.secure_url,
        publicId: result.public_id,
        alt: result.original_filename,
      };
      console.log("Nueva imagen:", newImage); // console.log para verificar la nueva imagen
      setAlliances((prevAlliances) => {
        const updatedAlliances = prevAlliances.map((a) =>
          a.id === allianceId ? { ...a, image: newImage } : a
        );
        console.log("Alliances actualizadas:", updatedAlliances); // console.log para verificar el estado actualizado
        return updatedAlliances;
      });
    }
  };
  return (
    <div>
      {alliances.slice(0, showMore ? alliances.length : 5).map((alliance) => (
        <div key={alliance.id} className="p-4 border rounded-md mb-4">
          {editingAlliance?.id === alliance.id ? (
            // Formulario de edición
            <div>
              <input
                type="text"
                value={editingAlliance.name}
                onChange={(e) =>
                  setEditingAlliance({
                    ...editingAlliance,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={editingAlliance.url}
                onChange={(e) =>
                  setEditingAlliance({
                    ...editingAlliance,
                    url: e.target.value,
                  })
                }
              />
              <CldUploadWidget
                uploadPreset="updateimage"
                onSuccess={(result) => {
                  if (result.info && typeof result.info === "object") {
                    // Verificar el tipo de result.info
                    handleImageUpload(alliance.id, result.info);
                  }
                }}
              >
                {({ open }) => (
                  <button type="button" onClick={() => open()}>
                    Subir imagen
                  </button>
                )}
              </CldUploadWidget>
              {/* Mostrar la imagen de la alianza */}
              {alliance.image.url && ( // Mostrar la imagen si existe
                <Image
                  src={alliance.image.url}
                  alt={alliance.image.alt || ""}
                  width={200}
                  height={100}
                  className="w-full"
                />
              )}
              <button
                type="button"
                onClick={() => handleSave(alliance.id, editingAlliance)}
              >
                Guardar
              </button>
              <button type="button" onClick={() => setEditingAlliance(null)}>
                Cancelar
              </button>
            </div>
          ) : (
            // Vista normal de la alianza
            <div>
              <h3>{alliance.name}</h3>
              <p>{alliance.url}</p>
              {alliance.image.url && (
                <Image
                  src={alliance.image.url}
                  alt={alliance.image.alt}
                  width={200}
                  height={100}
                  className="w-full"
                />
              )}
              <div>
                <button type="button" onClick={() => handleEdit(alliance)}>
                  Editar
                </button>
                <button type="button" onClick={() => handleDelete(alliance.id)}>
                  Eliminar
                </button>
                <button
                  type="button"
                  onClick={() => handleDeactivate(alliance.id)}
                >
                  Desactivar
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {alliances.length > 5 && !showMore && (
        <button type="button" onClick={() => setShowMore(true)}>
          Ver más
        </button>
      )}
    </div>
  );
};

export default AdminAliComponent;
