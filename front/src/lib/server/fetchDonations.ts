import { IDonation } from "@/interfaces/interfaces"

export const postDonation = async (preference: IDonation) => {
    const response = await fetch("https://api-sivoy.onrender.com/donations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
    });
    
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const data = await response.json();
    
    const { id } = data;
    return id;
};
