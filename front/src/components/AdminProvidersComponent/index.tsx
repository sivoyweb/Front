"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { IProvider } from "@/interfaces/interfaces";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "@/components/Loader"

const MySwal = withReactContent(Swal);

const AdminProvidersComponent = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProvider, setEditingProvider] = useState<IProvider | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") === 'true' : null;
      if (!token) {
        setError("No se encontró un token de autenticación.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "https://api-sivoy.onrender.com/providers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProviders(response.data);
    } catch (err) {
      setError("Hubo un problema al obtener los proveedores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleEdit = async (id: string) => {
    if (!editingProvider) return;
  
    const token = typeof window !== "undefined" ? localStorage.getItem("token") === 'true' : null;
  

    const result = await Swal.fire({
      title: "¿Estás seguro de que deseas actualizar este proveedor?",
      text: "Se aplicarán los cambios realizados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });
  
    
    if (!result.isConfirmed) {
      return;
    }
  
    try {
      const { name, description } = editingProvider;
  
      
      await axios.put(
        `https://api-sivoy.onrender.com/providers/${id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      
      Swal.fire(
        "Proveedor actualizado",
        "El proveedor ha sido actualizado correctamente"
      );
  
      setEditingProvider(null);
      fetchProviders(); 
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el proveedor.", "error");
    }
  };

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
        await axios.delete(`https://api-sivoy.onrender.com/providers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("El proveedor ha sido eliminado.");
        setProviders(providers.filter((provider) => provider.id !== id));
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar el proveedor.", "error");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Proveedores</h1>

      {/* Botón para actualizar la lista de proveedores */}
      <div className="text-right mb-4">
        <button
          onClick={fetchProviders}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Actualizar Proveedores
        </button>
      </div>

      {providers.length === 0 ? (
        <div className="text-center">No hay proveedores disponibles.</div>
      ) : (
        <div className="space-y-4">
          {providers.map((provider) => (
            <div key={provider.id} className="border rounded-lg p-4 shadow-md">
              <button
                className="blogToggleBtn"
                onClick={() =>
                  document
                    .getElementById(`provider-${provider.id}`)
                    ?.classList.toggle("hidden")
                }
              >
                <div className="font-bold text-xl">{provider.name}</div>
              </button>

              <div id={`provider-${provider.id}`} className="hidden mt-4">
                {editingProvider?.id === provider.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingProvider.name}
                      onChange={(e) =>
                        setEditingProvider({
                          ...editingProvider,
                          name: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <textarea
                      value={editingProvider.description}
                      onChange={(e) =>
                        setEditingProvider({
                          ...editingProvider,
                          description: e.target.value,
                        })
                      }
                      className="border p-2 w-full mb-2"
                    />
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEdit(provider.id)}
                        className="guardarInfo"
                      >
                        Guardar Cambios
                      </button>
                      <button
                      onClick={() => setEditingProvider(null)}
                      className="cancelarBtn"
                    >
                      Cancelar
                    </button>
                     
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{provider.description}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setEditingProvider(provider)}
                        className="editarBtn"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(provider.id)}
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

export default AdminProvidersComponent;
