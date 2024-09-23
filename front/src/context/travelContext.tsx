"use client";
import React, { createContext, useEffect, useState } from "react";
import { ITravel, ITravelContextType } from "../interfaces/interfaces";
import { fetchTravels } from "../lib/server/fetchTravels";



export const TravelContext = createContext<ITravelContextType>({
    travels: [],
    isLoading: true,
    error: null,
})

export const TravelProvider = ({ children }: { children: React.ReactNode }) => {
    const [travels, setTravels] = useState<ITravel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const travels = await fetchTravels();
                setTravels(travels);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to fetch products");
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <TravelContext.Provider value={{ travels, isLoading, error }}>
            {children}
        </TravelContext.Provider>
    );
};