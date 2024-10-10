"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IProjects } from "@/interfaces/interfaces";

const MySwal = withReactContent(Swal);

const AdminProjectsComponent = () => {
  const [projects, setProjects] = useState<IProjects[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<IProjects | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchProjects = async () => {
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
        "https://api-sivoy.onrender.com/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);
    } catch (err) {
      setError("Hubo un problema al obtener los proyectos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = async (id: string) => {
    if (!editingProject) return;

    const token = localStorage.getItem("token");
    try {
      const { name, description } = editingProject;
      await axios.put(
        `https://api-sivoy.onrender.com/projects/${id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire(
        "¡El proyecto ha sido actualizado correctamente!"
        
      );
      setEditingProject(null);
      fetchProjects(); // Actualizar lista después de editar
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el proyecto.", "error");
    }
  };

  // Función para manejar la eliminación de un proyecto
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
        await axios.delete(`https://api-sivoy.onrender.com/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("El proyecto ha sido eliminado.");
        setProjects(projects.filter((project) => project.id !== id));
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar el proyecto.", "error");
    }
  };

  // Función para manejar la actualización de la lista de proyectos
  const handleUpdateProjects = async () => {
    setUpdating(true); // Activar el estado de carga
    await fetchProjects();
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
      <h1 className="text-xl font-bold mb-4">Lista de Proyectos</h1>

      {projects.length === 0 ? (
        <div className="text-center">No hay proyectos disponibles.</div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleUpdateProjects}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={updating} // Desactivar el botón mientras se actualiza
          >
            {updating ? "Actualizando..." : "Actualizar Proyectos"}
          </button>

          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 shadow-md">
              <button
                className="w-full text-left"
                onClick={() =>
                  document
                    .getElementById(`project-${project.id}`)
                    ?.classList.toggle("hidden")
                }
              >
                <div className="font-bold text-xl">{project.name}</div>
              </button>

              <div id={`project-${project.id}`} className="hidden mt-4">
                {editingProject?.id === project.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingProject.name}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          name: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <textarea
                      value={editingProject.description}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          description: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <button
                      onClick={() => handleEdit(project.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>Descripción:</strong> {project.description}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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

export default AdminProjectsComponent;
