"use client";

import React, { useState } from "react";
import sendHelpEmail from "@/lib/server/fetchSendHelp"; 
import { ISendHelp } from "@/interfaces/interfaces";
import Swal from "sweetalert2";

export default function OtherDonationsForm() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [helpType, setHelpType] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);

    const formData: ISendHelp = {
      name,
      email,
      helpType,
      message: message || "", 
    };

    try {
      await sendHelpEmail(formData); 
      // Alerta de éxito
      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: '¡Tu ayuda fue enviada con éxito!',
        confirmButtonText: 'Aceptar',
      });

      setName("");
      setEmail("");
      setHelpType("");
      setMessage("");
    } catch (error) {
      // Alerta de error
      setErrorMessage((error as Error).message || "Error al enviar el correo");
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage || 'Ocurrió un error al enviar el correo.',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo de nombre */}
      <div className="mb-4">
        <label className="block text-sivoy-blue mb-2" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Campo de correo */}
      <div className="mb-4">
        <label className="block text-sivoy-blue mb-2" htmlFor="email">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sivoy-blue mb-2" htmlFor="helpType">
          Tipo de ayuda
        </label>
        <select
          id="helpType"
          value={helpType}
          onChange={(e) => setHelpType(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecciona una opción</option>
          <option value="donacion-recurrente">Donación Recurrente</option>
          <option value="en-especie">Donación en Especie</option>
          <option value="corporativa">Donación Corporativa</option>
          <option value="voluntario">Inscríbete como Voluntario</option>
          <option value="trabajo">Trabaja con Nosotros</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Campo de mensaje */}
      <div className="mb-4">
        <label className="block text-sivoy-blue mb-2" htmlFor="message">
          Mensaje (Obligatorio)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        className="w-full text-white p-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Procesando..." : "Contáctate con Nosotros"}
      </button>
    </form>
  );
};