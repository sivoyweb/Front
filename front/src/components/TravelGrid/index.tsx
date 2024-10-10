"use client";
import { ITravel } from "@/interfaces/interfaces";
import TravelCard from "../TravelCard";

interface TravelGridProps {
  travels: ITravel[];
}

function TravelGridComponent({ travels }: TravelGridProps) {
  return (
    <div className="flex justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 w-full">
        {travels.map((travels: ITravel) => (
          <TravelCard travels={travels} key={travels.id} />
        ))}
      </div>
    </div>
  );
}

export default TravelGridComponent;