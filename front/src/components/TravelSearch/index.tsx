"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

const TravelSearch = () => {
  const [travels, setTravels] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTravels = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/travels', {
        params: {
          page: 1,  // Puedes modificarlo según la lógica de paginación
          limit: 10,  // Límite de resultados a mostrar
          query: query,  // Si estás implementando un filtrado por nombre o ciudad, puedes enviar la query
        },
      });
      setTravels(response.data);
    } catch (error) {
      setError('Error fetching travels');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, [query]); // La consulta se ejecutará cada vez que se cambie el valor de `query`

  console.log(travels);
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
      <ul>
        {travels.map((travel) => (
          <li key={travel.id}>{travel.name} - {travel.city}</li>
        ))}
      </ul>
    </div>
  );
};

export default TravelSearch;
