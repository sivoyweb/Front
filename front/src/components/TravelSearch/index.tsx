// components/TravelSearch.tsx
"use client";
import { useState, useEffect } from 'react';
import { ITravel } from '@/interfaces/interfaces';
import { fetchTravels } from '@/lib/server/fetchTravels';

interface TravelSearchProps {
  setSearchResults: (travels: ITravel[]) => void; // Función para actualizar resultados
}

const TravelSearch = ({ setSearchResults }: TravelSearchProps) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTravelData = async () => {
    setLoading(true);
    setError('');

    try {
      const fetchedTravels = await fetchTravels(query); // Asumiendo que tu función puede filtrar por query
      setSearchResults(fetchedTravels); // Actualiza los resultados en Destinations
    } catch (error) {
      setError('Error al obtener los viajes. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchTravelData();
    } else {
      setSearchResults([]); // Limpia resultados si no hay consulta
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search travels"
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TravelSearch;
