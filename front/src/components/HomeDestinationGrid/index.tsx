"use client"

import { useContext } from "react";
import { TravelContext } from "../../context/travelContext";
import { ITravel } from "@/interfaces/interfaces";
import HomeDestinationCard from "../HomeDestinationCard";

function HomeGridComponent() {
    const { travels } = useContext(TravelContext);

    const topTravels = travels
        .sort((a: ITravel, b: ITravel) => b.averageStars - a.averageStars)
        .slice(0, 6);

    return (
        <div className="flex justify-center mr-6 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6 2xl:grid-cols-6 4k:grid-cols-7 gap-4 4k:gap-8 justify-center">
                {topTravels.map((travel: ITravel, index: number) => (
                    <HomeDestinationCard travels={travel} key={travel.id} index={index} />
                ))}
            </div>
        </div>
    );
};

export default HomeGridComponent;