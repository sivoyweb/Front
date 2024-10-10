"use client";

import React, { useState, useContext } from "react";
import Rating from "react-rating";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link"; // Cambiado aquí
import { IReviewProps } from "@/interfaces/interfaces";
import { TravelContext } from "@/context/travelContext";
import { UserContext } from "@/context/userContext";

interface ReviewComponentProps {
  travelId: string;
}

const StarComponent: React.FC<ReviewComponentProps> = ({ travelId }) => {
  const { refreshTravels } = useContext(TravelContext);
  const { isLogged } = useContext(UserContext);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!review || rating === 0) {
      return;
    }

    const data: IReviewProps = {
      review,
      stars: rating,
      travelId,
    };

    const token =  localStorage.getItem("token") ;
    if (!token) {
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://api-sivoy.onrender.com/travels/reviews",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire(
        "¡Tu reseña ha sido enviada exitosamente!"
      );

      setReview("");
      setRating(0);
      await refreshTravels();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          Swal.fire(
            "Reseña duplicada",
            "Solo puedes hacer una reseña por cada destino.",
            "error"
          );
        } else {
          Swal.fire("Error", "Ocurrió un error al enviar la reseña.", "error");
        }
      } else {
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (!isLogged) {
    return (
      <Link href="/login">
        <p className="text-lg text-sivoy-orange text-center font-arialroundedmtbold underline">Debes iniciar sesión o registrarte para dejar una calificación y/o una reseña.</p>
      </Link>
    );
  }

  const starStyle = { color: "gold" };
  const emptyStarStyle = { color: "lightgray" };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Cuéntanos tu experiencia:</h2>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Escribe tu reseña aquí"
        className="border p-2 w-full max-w-md mb-4"
      />

      <Rating
        initialRating={rating}
        onClick={(rate: number) => setRating(rate)}
        emptySymbol={
          <i className="fa-regular fa-star fa-2x" style={emptyStarStyle} />
        }
        fullSymbol={<i className="fa-solid fa-star fa-2x" style={starStyle} />}
      />

      <p className="mt-2">Nivel de satisfacción: {rating} estrellas</p>

      <button onClick={handleSubmit} className="mt-4" disabled={loading}>
        {loading ? "Enviando..." : "Enviar reseña"}
      </button>
    </div>
  );
};

export default StarComponent;