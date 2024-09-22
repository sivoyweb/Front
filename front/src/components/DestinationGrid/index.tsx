/*"use client"
import { useContext } from "react";
import { ProductContext } from "@/context/products";
import DestinationsCard from "../DestinationCard";
import { ITravel } from "@/interfaces/interfaces";

 function ProductsGridComponent() {
  
    const {travels} = useContext(ProductContext);
    return (
        <div className="flex justify-center m-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {travels.map((dest: ITravel) => (
        <DestinationsCard travels ={travels} key={travels.id} />
      ))}
    </div>
  </div>
    );
}

export default ProductsGridComponent;*/