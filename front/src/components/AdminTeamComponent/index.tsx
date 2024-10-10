"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ITeam } from "@/interfaces/interfaces";
import Image from "next/image"
import CloudinaryButton from "../CloudinaryButton";

// SweetAlert2 con React
const MySwal = withReactContent(Swal);

const AdminTeamComponent = () => {
  const [team, setTeam] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<ITeam | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchTeam = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") === 'true' : null;
      if (!token) {
        setError("No se encontró un token de autenticación.");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://api-sivoy.onrender.com/team", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeam(response.data);
    } catch (err) {
      setError("Hubo un problema al obtener el equipo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Función para manejar la edición de un miembro del equipo
  const handleEdit = async (id: string) => {
    if (!editingMember) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("token") === 'true' : null;

    try {

      const result = await Swal.fire({
        title: "¿Estás seguro de que desea guardar los cambios?",
        text: "Se aplicarán los cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
      });
      if(result.isConfirmed){
      const { name, description, linkedin, image } = editingMember;

      const response = await axios.put(
        `https://api-sivoy.onrender.com/team/${id}`,
        { name, description, linkedin, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response);

      Swal.fire(
        "¡El miembro del equipo ha sido actualizado correctamente!"
      );
      setEditingMember(null);
      fetchTeam(); 
    }
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo actualizar el miembro del equipo.",
        "error"
      );
    }
  };

  // Función para manejar la eliminación de un miembro del equipo
  const handleDelete = async (id: string) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") === 'true' : null;
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
        await axios.delete(`https://api-sivoy.onrender.com/team/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire(
          "El miembro del equipo ha sido eliminado."
        );
        setTeam(team.filter((member) => member.id !== id));
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Hubo un problema al eliminar el miembro del equipo.",
        "error"
      );
    }
  };

  // Función para manejar la actualización de la lista del equipo
  const handleUpdateTeam = async () => {
    setUpdating(true); // Activar el estado de carga
    await fetchTeam();
    setUpdating(false); // Desactivar el estado de carga
  };

  if (loading) {
    <p className=".loader"></p>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Equipo</h1>

      {team.length === 0 ? (
        <div className="text-center">
          No hay miembros del equipo disponibles.
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleUpdateTeam}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={updating}
          >
            {updating ? "Actualizando..." : "Actualizar Equipo"}
          </button>

          {team.map((member) => (
            <div key={member.id} className="border rounded-lg p-4 shadow-md">
              <button
                className="blogToggleBtn"
                onClick={() =>
                  document
                    .getElementById(`member-${member.id}`)
                    ?.classList.toggle("hidden")
                }
              >
                <div className="font-bold text-xl">{member.name}</div>
              </button>

              <div id={`member-${member.id}`} className="hidden mt-4">
                {editingMember?.id === member.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingMember.name}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          name: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <textarea
                      value={editingMember.description}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          description: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <input
                      type="text"
                      value={editingMember.linkedin}
                      onChange={(e) =>
                        setEditingMember({
                          ...editingMember,
                          linkedin: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    {editingMember.image && (
                      <Image
                        src={editingMember.image.url ?? "/default-image.jpg"}
                        alt={`Imagen de ${editingMember.name}`}
                        width={128}
                        height={128}
                        className="mt-4 object-cover"
                      />
                    )}
                    <button
                      onClick={() => handleEdit(member.id)}
                      className="guardarInfo m-3"
                    >
                      Guardar Cambios
                    </button>
                    <CloudinaryButton/>
                    <button
                      onClick={() => setEditingMember(null)}
                      className="cancelarBtn m-3"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>Descripción:</strong> {member.description}
                    </p>
                    <p>
                      <strong>LinkedIn:</strong> {member.linkedin}
                    </p>
                    {member.image && (
                      <Image
                        src={member.image.url ?? "/default-image.jpg"}
                        alt={`Imagen de ${member.name}`} 
                        width={128}
                        height={128}
                        className="mt-4 object-cover"
                      />
                    )}
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="editarBtn"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
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

export default AdminTeamComponent;
