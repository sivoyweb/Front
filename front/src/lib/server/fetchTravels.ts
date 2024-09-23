import { ITravel } from "@/interfaces/interfaces";

export async function fetchTravels() {
    try {
        const response = await fetch("http://localhost:3001/travels");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const travels = response.json();
        return travels;
    } catch (error) {
        console.error("Error en fetchTravels:", error);
        throw error; 
    }
}


export async function fetchTravelById(id: string): Promise<ITravel> {
    const response = await fetch(`http://localhost:3001/travels/${id}`);
    const travel = await response.json();
    return travel;
}