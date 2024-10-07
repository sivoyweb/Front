"use client";

import React, { useState } from "react";
import sendHelpEmail from "@/lib/server/fetchSendHelp";
import { ISendHelp } from "@/interfaces/interfaces";

export default function ContactForm() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [subject, setSubject] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage(null);

    // Crear el objeto con los datos del formulario según ISendHelp
    const formData: ISendHelp = {
      name,
      email,
      helpType: subject, // Asunto
      message: message || "", // Mensaje opcional
    };

    try {
      await sendHelpEmail(formData); // Llamada a la función modularizada
      alert("¡Tu mensaje fue enviado con éxito!");
      // Limpiar los campos del formulario después del envío exitoso
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setErrorMessage((error as Error).message || "Error al enviar el mensaje");
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

      {/* Campo de asunto */}
      <div className="mb-4">
        <label className="block text-sivoy-blue mb-2" htmlFor="subject">
          Asunto
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Campo de mensaje */}
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
        {isSubmitting ? "Procesando..." : "Enviar Mensaje"}
      </button>
    </form>
  );
}