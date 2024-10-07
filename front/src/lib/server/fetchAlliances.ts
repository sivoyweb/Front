import { IAlliances } from "@/interfaces/interfaces";

export async function fetchAlliances(): Promise<IAlliances[]> {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/alliances");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const alliances = await response.json();
        return alliances;
    } catch (error) {
        console.error("Error en fetchAlliances:", error);
        throw error;
    }
};