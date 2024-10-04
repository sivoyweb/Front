"use client";

import React, { useState } from "react";

export default function OtherDonationsForm() {
  const [name, setName] = useState(""); // Campo para el nombre
  const [helpType, setHelpType] = useState(""); // Campo para el tipo de ayuda
  const [message, setMessage] = useState(""); // Campo para el mensaje
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el envío
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Mensajes de error

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      setName("");
      setHelpType("");
      setMessage("");
    } catch (error: unknown) {
      setErrorMessage("Error al procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <div className="mb-4">
        <label className="block text-sivoy-blue mb-2" htmlFor="message">
          Mensaje
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
}