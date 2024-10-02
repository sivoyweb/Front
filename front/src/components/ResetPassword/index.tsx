"use client"
import { useState } from 'react';
import axios from 'axios';

export default function ResetPassword() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/auth/reset-password', {
        code,
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Paso 3: Ingrese el código y nueva contraseña</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="Ingrese el código de restablecimiento"
          className="border border-gray-300 p-2 rounded w-full"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingrese nueva contraseña"
            className="border border-gray-300 p-2 rounded w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button 
            type="button" 
            className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent hover:bg-transparent border-none shadow-sky-50"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirme nueva contraseña"
            className="border border-gray-300 p-2 rounded w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button 
            type="button" 
            className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button 
          type="submit" 
          className="">
          Restablecer contraseña
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}