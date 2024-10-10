"use client"

import React, { useState, useEffect, useCallback, useContext } from "react";
import Rating from "react-rating";
import axios from "axios";
import Swal from "sweetalert2";
import { ITravelReview, IReviewT } from "@/interfaces/interfaces";
import { UserContext } from "@/context/userContext";

interface ReviewsComponentProps {
  travelId: string;
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({ travelId }) => {
  const [travelReview, setTravelReview] = useState<ITravelReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingReview, setEditingReview] = useState<IReviewT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMyReview, setShowMyReview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const { user } = useContext(UserContext);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ITravelReview>(
        `https://api-sivoy.onrender.com/travels/${travelId}`
      );
      setTravelReview(response.data);
    } catch (error) {
      setError(
        "No se pudieron cargar las reseñas. Inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }, [travelId]);

  console.log(editingReview)

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (reviewId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://api-sivoy.onrender.com/travels/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("La reseña ha sido eliminada correctamente");
      fetchReviews();
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo eliminar la reseña. Inténtelo de nuevo.",
        "error"
      );
    }
  };

  
  const reviews = travelReview?.reviews || [];
  const myReview = reviews.find((review) => review.user.id === user?.id);
  const paginatedReviews = showMyReview && myReview ? [myReview] : reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="p-5 border border-gray-200 rounded-lg">
      <div className="mb-4 flex justify-center space-x-4">
        <button onClick={fetchReviews} disabled={loading}>
          {"Actualizar Reseñas"}
        </button>
        {myReview && (
          <button onClick={() => setShowMyReview((prev) => !prev)}>
            {showMyReview ? "Ver Todas" : "Mi reseña"}
          </button>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {reviews.length > 0 ? (
        paginatedReviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border border-gray-300 rounded-md">
            <p className="text-lg font-bold mb-1">{review.user.name}</p>
            <label className="block mb-2 text-gray-700">{review.review}</label>
            <Rating
              readonly
              initialRating={review.stars}
              emptySymbol={
                <i className="fa-regular fa-star" style={{ color: "#000000" }} />
              }
              fullSymbol={
                <i className="fa-solid fa-star" style={{ color: "#ffd700" }} />
              }
            />
            {review.user.id === user?.id && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setEditingReview(review)}
                  className="editarBtn"
                >
                  Editar
                </button>
                <button onClick={() => handleDelete(review.id)} className="custom-button">
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-sivoy-blue md:text-lg ml-2 text-center">
          No hay reseñas disponibles.
        </p>
      )}

      {reviews.length > reviewsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsComponent;