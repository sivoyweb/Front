"use client"

import { useContext } from "react";
import { TravelContext } from "../../context/travelContext";
import { ITravel } from "@/interfaces/interfaces";
import HomeDestinationCard from "../HomeDestinationCard";

function HomeGridComponent() {
    const { travels } = useContext(TravelContext);

    return (
        <div className="flex justify-center m-4 -ml-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {travels.map((travel: ITravel, index: number) => (
    <HomeDestinationCard travels={travel} key={travel.id} index={index} />
))}

            </div>
        </div>
    );
}

export default HomeGridComponent;