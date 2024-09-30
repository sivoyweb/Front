"use client";
import React, { useState, useContext } from 'react';
import Rating from 'react-rating';
import axios from 'axios';
import { IReviewProps } from '@/interfaces/interfaces';
import { TravelContext } from '@/context/travelContext';

interface ReviewComponentProps {
  travelId: string;
}

const StarComponent: React.FC<ReviewComponentProps> = ({ travelId }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const { refreshTravels } = useContext(TravelContext);

  const handleSubmit = async () => {
    if (!review || rating === 0) {
      console.error("Faltan valores de reseña o calificación.");
      return;
    }
    const data: IReviewProps = {
      review,
      stars: rating,
      travelId,
    };

    
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token de autenticación.');
      return;
    }
    
    
    try {
      const response = await axios.post(
        'https://api-sivoy.onrender.com/travels/reviews',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Datos que se envían al backend:", data);
      console.log("Reseña enviada exitosamente:", response.data);

      setReview("");
      setRating(0);

      await refreshTravels();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al enviar la reseña:", error.message);
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  const starStyle = { color: 'gold' };
  const emptyStarStyle = { color: 'lightgray' };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Contanos tu experiencia:</h2>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Escribe tu reseña aquí"
        className="border p-2 w-full max-w-md mb-4"
      />

      <Rating
        initialRating={rating}
        onClick={(rate: number) => setRating(rate)}
        emptySymbol={<i className="fa-regular fa-star fa-2x" style={emptyStarStyle} />}
        fullSymbol={<i className="fa-solid fa-star fa-2x" style={starStyle} />}
      />

      <p className="mt-2">Nivel de satisfaccion: {rating} estrellas</p>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Enviar reseña
      </button>
    </div>
  );
};

export default StarComponent;