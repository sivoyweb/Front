"use client"
import { useContext } from "react";
import { TravelContext } from "../../context/travelContext";
import TravelCard from "../TravelCard";
import { ITravel } from "@/interfaces/interfaces";

 function HomeGridComponent() {
  
    const {travels} = useContext(TravelContext);
  
    return (
        <div className="flex justify-center m-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {travels.map((travels: ITravel) => (
        <TravelCard travels ={travels} key={travels.id} />
      ))}
    </div>
  </div>
    );
}

export default HomeGridComponent;