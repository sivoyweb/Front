import { IDonation } from "@/interfaces/interfaces";

export const postDonation = async (preference: IDonation) => {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/donations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(preference),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener el mensaje de error detallado
            throw new Error(`Error en la petición: ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        
        // Asegúrate de obtener el payment_url y el preference_id de la respuesta
        const { payment_url, preference_id } = data;

        // Si prefieres redirigir al usuario al pago desde aquí
        if (payment_url) {
            window.location.href = payment_url; // Redirige al usuario al URL de pago
        };

        return preference_id;
    } catch (error) {
        console.error("Error al crear la donación:", error);
        throw error;
    }
};
