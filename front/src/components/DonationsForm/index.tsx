"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { postDonation } from "@/lib/server/fetchDonations";

export default function DonationsForm() {
    const [name, setName] = useState(''); // Campo para el nombre del donante
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [preferenceId, setPreferenceId] = useState<string | null>(null); 

    const router = useRouter();

    useEffect(() => {
        initMercadoPago(process.env.NEXT_PUBLIC_YOUR_PUBLIC_KEY || '', {
            locale: "es-AR",
        });
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const donationData = {
            description: message,   // Mensaje como descripción
            title: name,            // Nombre del donante como título
            unit_price: Number(amount),  // Monto de la donación
        };

        const id = await postDonation(donationData);
        if (id) {
            setPreferenceId(id);
            router.push('/checkout');
        }

        setName('');  // Limpiar campo nombre
        setAmount(''); // Limpiar campo monto
        setMessage(''); // Limpiar campo mensaje
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Nombre del donante:</label>
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
                <label className="block text-gray-700 mb-2" htmlFor="amount">Monto:</label>
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
                <label className="block text-gray-700 mb-2" htmlFor="message">Mensaje (opcional):</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={4}
                />
            </div>
            <button type="submit" className="w-full">
                Donar
            </button>
            
            {preferenceId && (
                <Wallet 
                    initialization={{ preferenceId: preferenceId }} 
                />
            )}
        </form>
    );
};