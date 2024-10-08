"use client";

import React, { useState } from "react";
import sendContactEmail from "@/lib/server/fetchContact";
import { IContact } from "@/interfaces/interfaces";

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

    const formData: IContact = {
      subject,
      name,
      email,
      message: message || "", 
    };

    try {
      await sendContactEmail(formData);
      alert("¡Tu mensaje fue enviado con éxito!");
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
    <form onSubmit={handleSubmit} className="mb-4 max-w-xl mx-auto">
      <div className="mb-4">
      <h2 className="text-2xl font-arialroundedmtbold text-sivoy-blue text-center mb-6">Formulario de Contacto</h2>
        <label className="block text-sivoy-blue text-lg mb-2" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full py-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sivoy-blue text-lg mb-2" htmlFor="email">
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
        <label className="block text-sivoy-blue mb-2 text-lg" htmlFor="subject">
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

      <div className="mb-4">
        <label className="block text-sivoy-blue mb-2 text-lg" htmlFor="message">
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
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Procesando..." : "Enviar Mensaje"}
      </button>
    </form>
  );
}
