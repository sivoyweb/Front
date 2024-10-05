"use client";
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ResetPasswordRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await axios.post('https://api-sivoy.onrender.com/auth/forgot-password', { email });
      setMessage(response.data.message);

      Swal.fire({
        icon: 'success',
        title: 'Código enviado exitosamente',
        text: 'El código de restablecimiento ha sido enviado a su correo electrónico. El código expirará en 1 hora.',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      setMessage('Error al enviar el código de restablecimiento');
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar el código de restablecimiento. Inténtelo nuevamente más tarde.',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Paso 1: Ingrese su correo electrónico</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <h2 className='text-xl text-center'>Ingresa el email con el que te registraste:</h2>
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          className="border border-gray-300 p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading} 
        />
        <button 
          type="submit" 
          className=""
          disabled={isLoading} 
        >
          {isLoading ? "Enviando..." : "Enviar código de restablecimiento"}
        </button>
      </form>
      {message && <p className="mt-4 text-green-700">El código para cambiar la contraseña fue enviado</p>}
    </div>
  );
}