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
        console.error("Error fetching users:", error);
        MySwal.fire({
          title: "Error!",
          text: "Failed to load users",
          icon: "error",
          confirmButtonText: "Ok",
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://api-sivoy.onrender.com/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(users.filter((user) => user.id !== id));
          MySwal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting user:", error);
          MySwal.fire({
            title: "Error!",
            text: "Failed to delete user",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      }
    });
  };

  const makeAdmin = async (id: string | undefined) => {
    if (!id) return;

    try {
      await axios.put(
        `https://api-sivoy.onrender.com/users/${id}`,
        { role: "admin" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, role: "admin" } : user
        )
      );
      MySwal.fire({
        title: "Success!",
        text: "User role updated to Admin",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      MySwal.fire({
        title: "Error!",
        text: "Failed to update role",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="bg-white p-4 mb-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>
              <strong>Role:</strong> {user.role || "No role"}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete User
              </button>
              <button
                onClick={() => makeAdmin(user.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Make Admin
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUsersComponent;
