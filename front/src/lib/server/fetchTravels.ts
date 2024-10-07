import { ITravel, ITravelsProps } from "@/interfaces/interfaces";

export async function fetchTravels(): Promise<ITravel[]> {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/travels");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const travels = await response.json();
        return travels;
    } catch (error) {
        console.error("Error en fetchTravels:", error);
        throw error;
    }
}

export async function fetchTravelById(id: string): Promise<ITravelsProps> {
    const response = await fetch(`https://api-sivoy.onrender.com/travels/${id}`);
    const travel = await response.json();
    return travel;
}