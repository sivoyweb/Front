import { IAlliances } from "@/interfaces/interfaces";

export async function fetchTeam(): Promise<IAlliances[]> {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/alliances");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const teamMembers = await response.json();
        return teamMembers;
    } catch (error) {
        console.error("Error en fetchFAQ:", error);
        throw error;
    }
};