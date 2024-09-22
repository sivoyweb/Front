import { ITravel } from "@/interfaces/interfaces";

export async function fetchTravels() {
    try {
        const response = await fetch("https://pm-4-fe-cris-acevey-3xzr.vercel.app/products");
        const travels = await response.json();
        return travels;
    } catch (error) {
        console.log(error);
    }
    
}


export async function fetchTravelById(id: string): Promise<ITravel> {
    const response = await fetch(`https://pm-4-fe-cris-acevey-3xzr.vercel.app/travels/${id}`);
    const travel = await response.json();
    return travel;
}