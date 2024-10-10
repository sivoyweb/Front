"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IReviewAdmin } from "@/interfaces/interfaces";

const AdminReviewsComponent: React.FC = () => {
  const [reviews, setReviews] = useState<IReviewAdmin[]>([]);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const token =  localStorage.getItem("token") ;
  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api-sivoy.onrender.com/travels/reviews/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sortedReviews = response.data.sort(
        (a: IReviewAdmin, b: IReviewAdmin) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setReviews(sortedReviews);
    } catch (error) {
      console.error("Error al obtener las reseñas:", error);
    }
  }, [token]);
  console.log(reviews);
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleApprove = async (id: string) => {
    try {
      await axios.patch(
        `https://api-sivoy.onrender.com/travels/reviews/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReviews();
    } catch (error) {
      console.error("Error al aprobar la reseña:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.patch(
        `https://api-sivoy.onrender.com/travels/reviews/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReviews();
    } catch (error) {
      console.error("Error al rechazar la reseña:", error);
    }
  };

  const handleLoadAllReviews = async () => {
    try {
      const response = await axios.get(
        "https://api-sivoy.onrender.com/travels/reviews/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error al obtener todas las reseñas:", error);
    }
  };

  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  const handleUpdateReviews = () => {
    fetchReviews();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
      {reviews.slice(0, visibleReviews).map((review) => (
        <div key={review.id} className="mb-4 p-4 border rounded-lg shadow">
          <p>
            <strong>{review.user.name}</strong> {review?.user.email}
          </p>
          <p>Reseña: {review.review}</p>
          <p>Estrellas: {review.stars}</p>
          <p>Estado: {review.state}</p>
          <p>Fecha: {new Date(review.date).toLocaleDateString()}</p>
          <div className="flex justify-end gap-2">
            {review.state !== "Aprobado" && (
              <button
                onClick={() => handleApprove(review.id)}
                className="custom-button"
              >
                Aceptar
              </button>
            )}

            {review.state !== "Rechazado" && (
              <button
                onClick={() => handleReject(review.id)}
                className="px-4 py-2 "
              >
                Rechazar
              </button>
            )}
          </div>
        </div>
      ))}

      {visibleReviews < reviews.length && (
        <button onClick={handleShowMore} className="mt-4 px-4 py-2 ">
          Ver más
        </button>
      )}

      <div className="flex justify-end mt-4 gap-4">
        <button onClick={handleLoadAllReviews} className="px-4 py-2 ">
          Ver todas las reseñas
        </button>
        <button onClick={handleUpdateReviews} className="px-4 py-2 ">
          Actualizar reseñas
        </button>
      </div>
    </div>
  );
};

export default AdminReviewsComponent;
