"use client";
import React, { createContext, useEffect, useState } from "react";
import { ITravel, ITravelContextType } from "../interfaces/interfaces";
import { fetchTravels } from "../lib/server/fetchTravels";

export const TravelContext = createContext<ITravelContextType>({
    travels: [],
    isLoading: true,
    error: null,
    filteredTravels: [],
    noResults: false,
    setFilteredTravels: () => {},
    setNoResults: () => {},
    refreshTravels: async () => {},  // Añadimos la función en el contexto
});

export const TravelProvider = ({ children }: { children: React.ReactNode }) => {
    const [travels, setTravels] = useState<ITravel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredTravels, setFilteredTravels] = useState<ITravel[]>([]);
    const [noResults, setNoResults] = useState(false);

    const fetchData = async () => {
        try {
            const travels = await fetchTravels();
            setTravels(travels);
            setIsLoading(false);
        } catch (err) {
            setError("Failed to fetch travels");
            setIsLoading(false);
        }
    };

    // Función para refrescar los datos
    const refreshTravels = async () => {
        setIsLoading(true);  // Mostramos loading mientras traemos los datos
        await fetchData();    // Llamamos a la función que trae los datos y actualiza el estado
    };

    useEffect(() => {
        fetchData();  // Cargamos los datos inicialmente
    }, []);

    return (
        <TravelContext.Provider value={{ 
            travels, 
            isLoading, 
            error, 
            filteredTravels, 
            noResults, 
            setFilteredTravels, 
            setNoResults, 
            refreshTravels  // Pasamos la función como parte del contexto
        }}>
            {children}
        </TravelContext.Provider>
    );
};