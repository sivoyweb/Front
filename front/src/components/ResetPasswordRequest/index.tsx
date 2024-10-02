"use client"
import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/send-reset-password-code', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending reset code');
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Paso 1: Ingrese su correo electrónico</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          className="border border-gray-300 p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          type="submit" 
          className="w-full">
          Enviar código de restablecimiento
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}