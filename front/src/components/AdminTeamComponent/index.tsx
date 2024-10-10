"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ITeam } from "@/interfaces/interfaces";

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
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró un token de autenticación.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "https://api-sivoy.onrender.com/team",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const handleEdit = async (id: string) => {
    if (!editingMember) return;

    const token = localStorage.getItem("token");

    try {
      const result = await Swal.fire({
        title: "¿Estás seguro de que deseas actualizar este miembro?",
        text: "Se aplicarán los cambios al miembro del equipo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const { name, description } = editingMember;

        await axios.put(
          `https://api-sivoy.onrender.com/team/${id}`,
          { name, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire("¡El miembro ha sido actualizado correctamente!");
        setEditingMember(null);
        fetchTeam();
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el miembro.", "error");
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
        await axios.delete(`https://api-sivoy.onrender.com/team/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("El miembro ha sido eliminado.");
        setTeam(team.filter((member) => member.id !== id));
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar el miembro.", "error");
    }
  };

  const handleUpdateTeam = async () => {
    setUpdating(true);
    await fetchTeam();
    setUpdating(false);
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

      // Paso 1: Llamar a la API para exportar "Team"
      const exportResponse = await axios.get(
        "https://api-sivoy.onrender.com/data/export/Team", // Cambia 'Team' según tu entidad
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
        <h1 className="text-xl font-bold">Lista del Equipo</h1>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Descargar Equipo en Excel
        </button>
      </div>

      {team.length === 0 ? (
        <div className="text-center">No hay miembros disponibles.</div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleUpdateTeam}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            } transition-colors duration-200 hover:bg-blue-600 focus:outline-none`}
            disabled={updating}
          >
            {updating ? "Actualizando..." : "Actualizar Equipo"}
          </button>

          {team.map((member) => (
            <div key={member.id}>
              <button
                className="custom-button"
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
                    <button
                      onClick={() => handleEdit(member.id)}
                      className="guardarInfo"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setEditingMember(null)}
                      className="cancelarBtn"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>Descripción:</strong> {member.description}
                    </p>
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
