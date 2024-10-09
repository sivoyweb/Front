import { IFAQ } from "@/interfaces/interfaces";

export async function fetchFAQ(): Promise<IFAQ[]> {
    try {
        const response = await fetch("https://api-sivoy.onrender.com/faq");

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const faqQuestions = await response.json();
        return faqQuestions;
    } catch (error) {
        throw error;
    }
};