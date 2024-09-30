"use client";
import { ITravel } from "@/interfaces/interfaces";
import TravelCard from "../TravelCard";

interface TravelGridProps {
  travels: ITravel[];
}

function TravelGridComponent({ travels }: TravelGridProps) {
  return (
    <div className="flex justify-center px-4 md:px-8 -ml-24">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full -mr-24">
        {travels.map((travel: ITravel) => (
          <TravelCard travels={travel} key={travel.id} />
        ))}
      </div>
    </div>
  );
}

export default TravelGridComponent;