import { ITeam } from "@/interfaces/interfaces";

export async function fetchTeam(): Promise<ITeam[]> {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/team");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }
        const teamMembers = await response.json();
        return teamMembers;
    } catch (error) {
        console.error("Error en fetchTeam:", error);
        throw error;
    }
};