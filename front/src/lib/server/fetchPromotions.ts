import { IPromotionAdmin } from "@/interfaces/interfaces";

export async function fetchPromotions(): Promise<IPromotionAdmin[]> {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/promotions");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const promotions = await response.json();
        return promotions;
        
    } catch (error) {
        throw error;
    }
};