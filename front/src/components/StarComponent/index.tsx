"use client";
import React, { useState, useContext } from 'react';
import Rating from 'react-rating';
import axios from 'axios';
import { IReviewProps } from '@/interfaces/interfaces';
import { UserContext } from '@/context/userContext';

interface ReviewComponentProps {
  travelId: string;
}

const StarComponent: React.FC<ReviewComponentProps> = ({ travelId }) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const { user } = useContext(UserContext);
  const userId = user?.user?.id; // Recuperamos el userId desde el contexto

  const handleSubmit = async () => {
    if (!userId) {
      console.error("El userId no está definido.");
      return;
    }
    
    if (!review || rating === 0) {
      console.error("Faltan valores de reseña o calificación.");
      return;
    }

    const data: IReviewProps = {
      review,
      stars: rating,
      userId,
      travelId,
    };

    console.log("Datos que se envían al backend:", data);

    try {
      const response = await axios.post('https://api-sivoy.onrender.com/travels/reviews', data);
      console.log("Reseña enviada exitosamente:", response.data);
      // Opcional: Puedes limpiar el formulario aquí si lo deseas
      setReview("");
      setRating(0);
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

      <p className="mt-2">Calificación actual: {rating} estrellas</p>

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