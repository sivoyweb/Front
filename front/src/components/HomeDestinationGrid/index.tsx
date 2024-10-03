"use client";

import { useContext } from "react";
import { TravelContext } from "../../context/travelContext";
import { ITravel } from "@/interfaces/interfaces";
import HomeDestinationCard from "../HomeDestinationCard";

function HomeGridComponent() {
    const { travels } = useContext(TravelContext);

    // Obtén el ancho de la ventana
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

    // Define cuántas tarjetas mostrar en función del ancho de la pantalla
    let cardsToShow = 4; // por defecto

    if (screenWidth >= 1500) { // pantallas grandes (lg)
        cardsToShow = 12;
    } else if (screenWidth >= 1440) { // pantallas medianas (md)
        cardsToShow = 10;
    } else if (screenWidth >= 1024) { // pantallas medianas (md)
        cardsToShow = 8;
    } else if (screenWidth >= 768) { // pantallas medianas (md)
        cardsToShow = 6;
    }

    const topTravels = travels
        .sort((a: ITravel, b: ITravel) => b.averageStars - a.averageStars)
        .slice(0, cardsToShow);

    return (
        <div className="flex justify-center mr-6 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 justify-center">
                {topTravels.map((travel: ITravel, index: number) => (
                    <HomeDestinationCard travels={travel} key={travel.id} index={index} />
                ))}
            </div>
        </div>
    );
};

export default HomeGridComponent;