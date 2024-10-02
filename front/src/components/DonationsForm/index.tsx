"use client";

import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { postDonation } from "@/lib/server/fetchDonations";

export default function DonationsForm() {
  const [name, setName] = useState(""); // Campo para el nombre del donante
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [preference_id, setPreferenceId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Mensajes de error

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY || "", {
      locale: "es-AR",
    });
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validación de monto mayor que 0
    if (Number(amount) <= 0) {
      setErrorMessage("El monto debe ser mayor a 0.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const donationData = {
        description: message, // Mensaje como descripción
        title: name, // Nombre del donante como título
        unit_price: Number(amount), // Monto de la donación
      };

      const preference_id = await postDonation(donationData);
      if (preference_id) {
        setPreferenceId(preference_id);
      }

      // Limpiar campos
      setName("");
      setAmount("");
      setMessage("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Error al procesar la donación.");
      } else {
        setErrorMessage("Error desconocido al procesar la donación.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          Nombre del donante:
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
        <label className="block text-gray-700 mb-2" htmlFor="amount">
          Monto:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="message">
          Mensaje:
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
        className="w-full bg-blue-500 text-white p-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Procesando..." : "Donar"}
      </button>

      {preference_id && typeof preference_id === "string" && (
        <Wallet
          initialization={{ preferenceId: preference_id }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}
    </form>
  );
}
