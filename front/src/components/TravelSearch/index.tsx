// components/TravelSearch.tsx
"use client";
import { useState, useContext } from 'react';
import { TravelContext } from '../../context/travelContext';
import { ITravel } from '@/interfaces/interfaces';

interface TravelSearchProps {
  setFilteredTravels: (travels: ITravel[]) => void; // Prop para actualizar los resultados filtrados
}

const TravelSearch = ({ setFilteredTravels }: TravelSearchProps) => {
  const { travels } = useContext(TravelContext);
  const [queryService, setQueryService] = useState('');
  const [queryLocation, setQueryLocation] = useState('');

  const handleSearch = () => {
    const results = travels.filter(travel => 
      travel.name.toLowerCase().includes(queryService.toLowerCase()) &&
      travel.city.toLowerCase().includes(queryLocation.toLowerCase())
    );
    setFilteredTravels(results);
  };

  return (
    <div className="flex flex-row space-x-4 items-center">
      <div>
        <h1 className="text-white text-2xl mb-6 font-arialroundedmtbold">¿Qué servicio busca?</h1>
        <input
          type="text"
          value={queryService}
          onChange={(e) => setQueryService(e.target.value)}
          placeholder="Escribe algo..."
          className="px-4 py-2 w-64 rounded-md bg-white/80"
        />
      </div>
      <div>
        <h1 className="text-white text-2xl mb-6 font-arialroundedmtbold">¿En dónde?</h1>
        <input
          type="text"
          value={queryLocation}
          onChange={(e) => setQueryLocation(e.target.value)}
          placeholder="Escribe algo..."
          className="px-4 py-2 w-64 rounded-md bg-white/80"
        />
        <button className="ml-8" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default TravelSearch;
