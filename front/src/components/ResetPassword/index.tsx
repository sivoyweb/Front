"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface ResetPasswordDTO {
  email: string;
  password: string;
  confirmPassword: string;
  resetCode: string;
}

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Por favor, asegúrese de que las contraseñas coincidan.",
      });
      return;
    }

    const resetPasswordData: ResetPasswordDTO = {
      email,
      password: newPassword,
      confirmPassword,
      resetCode,
    };

    setIsLoading(true);

    try {
      const response = await axios.put(
        "https://api-sivoy.onrender.com/auth/reset-password",
        resetPasswordData
      );

      Swal.fire({
        icon: "success",
        title: "Contraseña cambiada con éxito",
        text: response.data.message || "Tu contraseña ha sido actualizada.",
      });

      setMessage(response.data.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al intentar restablecer la contraseña.",
      });
      setMessage("Error al restablecer la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Paso 3: Ingrese el email, código y nueva contraseña
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <h2 className="text-xl text-center">Ingresa el email de la cuenta:</h2>
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          className="border border-gray-900 p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <h2 className="text-xl text-center">
          Ingresa el codigo para cambiar la contraseña:
        </h2>
        <input
          type="text"
          placeholder="Ingrese el código de restablecimiento"
          className="border border-gray-900 p-2 rounded w-full"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          disabled={isLoading}
        />
        <h2 className="text-xl text-center">Ingresa la contraseña nueva:</h2>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingrese nueva contraseña"
            className="border border-gray-900 p-2 rounded w-full text-gray-800"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent hover:bg-transparent border-none shadow-sky-50 focus:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <h2 className="text-xl text-center">Confirma la contraseña nueva:</h2>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirme nueva contraseña"
            className="border border-gray-900 p-2 rounded w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent hover:bg-transparent border-none shadow-sky-50 focus:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="" disabled={isLoading}>
          {isLoading ? "Restableciendo..." : "Restablecer contraseña"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-700">Contraseña cambiada con éxito</p>
      )}
    </div>
  );
}
