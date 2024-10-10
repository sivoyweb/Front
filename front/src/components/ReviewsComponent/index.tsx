"use client";
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
  const [saving, setSaving] = useState(false);
  const [showMyReview, setShowMyReview] = useState(false);
  const { user } = useContext(UserContext);
  console.log(saving);

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

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    if (!editingReview) return;
    setSaving(true);
    try {
      const { id, review, stars } = editingReview;
      await axios.put(
        `https://api-sivoy.onrender.com/travels/reviews/${id}`,
        { review, stars },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("La reseña ha sido actualizada correctamente");
      setEditingReview(null);
      fetchReviews();
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo actualizar la reseña. Inténtelo de nuevo.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const reviews = travelReview?.reviews || [];
  const myReview = reviews.find((review) => review.user.id === user?.id);
  console.log(handleEdit);
 
  return (
    <div className="p-5 border border-gray-200 rounded-lg">
      <div className="mb-4">
        <button onClick={fetchReviews} disabled={loading} className="mr-4">
          {"Actualizar Reseñas"}
        </button>
        {myReview && (
          <button onClick={() => setShowMyReview((prev) => !prev)} className="">
            {showMyReview ? "Ver Todas" : "Mi reseña"}
          </button>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {reviews.length > 0 ? (
        (showMyReview && myReview ? [myReview] : reviews).map((review) => (
          <div key={review.id} className="mb-4 p-4 border border-gray-300 rounded-md">
            {/* Mostrar nombre del usuario */}
            <p className="text-lg font-bold mb-1">{review.user.name}</p>

            {/* Mostrar reseña en un label */}
            <label className="block mb-2 text-gray-700">
              {review.review}
            </label>

            {/* Mostrar rating */}
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

            {/* Acciones solo para la reseña del usuario */}
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
        <p className="text-sivoy-blue text-lg ml-2 text-center font-arialroundedmtbold">
          No hay reseñas disponibles.
        </p>
      )}
    </div>
  );
};

export default ReviewsComponent;
