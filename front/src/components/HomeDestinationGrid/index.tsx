"use client"

import { useContext } from "react";
import { TravelContext } from "../../context/travelContext";
import { ITravel } from "@/interfaces/interfaces";
import HomeDestinationCard from "../HomeDestinationCard";

function HomeGridComponent() {
    const { travels } = useContext(TravelContext);

    return (
        <div className="flex justify-center mr-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 4k:grid-cols-7 gap-4 4k:gap-8">
                {travels.map((travel: ITravel, index: number) => (
                    <HomeDestinationCard travels={travel} key={travel.id} index={index} />
                ))}
            </div>
        </div>
    );
}

export default HomeGridComponent;
