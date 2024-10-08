import { IProjects } from "@/interfaces/interfaces";

export async function fetchProjects(): Promise<IProjects[]> {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/projects");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const projects = await response.json();
        return projects;
        
    } catch (error) {
        throw error;
    }
};