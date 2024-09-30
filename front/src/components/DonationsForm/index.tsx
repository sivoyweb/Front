"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DonationsForm() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Monto:', amount);
        console.log('Mensaje:', message);
        
       
        router.push('/checkout');

        // Resetea los campos del formulario
        setAmount('');
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
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
        </form>
    );
}
