"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IUser } from "@/interfaces/interfaces";

const MySwal = withReactContent(Swal);

const AdminUsersComponent = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api-sivoy.onrender.com/users/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        MySwal.fire({
          title: "Error",
          text: "No se pudo cargar la lista de usuarios.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const deleteUser = async (id: string | undefined) => {
    if (!id) return;

    MySwal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://api-sivoy.onrender.com/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(users.filter((user) => user.id !== id));
          MySwal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          MySwal.fire({
            title: "Error",
            text: "No se pudo eliminar el usuario.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  const makeAdmin = async (email: string | undefined) => {
    try {
      await axios.put(
        `https://api-sivoy.onrender.com/users/make-admin/`,
        { email: `${email}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user.email === email ? { ...user, role: "admin" } : user
        )
      );
      MySwal.fire({
        title: "Éxito",
        text: "El usuario ha sido actualizado a administrador.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al actualizar rol:", error);
      MySwal.fire({
        title: "Error",
        text: "No se pudo actualizar el rol del usuario.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      {users.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        users.map((user) => (
          <details
            key={user.id}
            className="bg-white p-4 mb-4 rounded shadow-md"
          >
            <summary className="cursor-pointer text-xl font-semibold">
              {user.name} - {user.role || "Sin rol"}
            </summary>
            <div className="mt-2">
              <p>
                <strong>Teléfono:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong> {user.credential.email}
              </p>
              <p>
                <strong>Fecha de creación:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar Usuario
              </button>
              <button
                onClick={() => makeAdmin(user.credential.email)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Hacer Admin
              </button>
            </div>
          </details>
        ))
      )}
    </div>
  );
};

export default AdminUsersComponent;
