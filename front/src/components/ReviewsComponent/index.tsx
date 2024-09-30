"use client";
import React, { useState, useEffect, useCallback } from "react";
import Rating from "react-rating";
import axios from "axios";
import { ITravelReview } from "@/interfaces/interfaces"; // Asegúrate de importar la nueva interfaz

interface ReviewsComponentProps {
  travelId: string;
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({ travelId }) => {
  const [travelReview, setTravelReview] = useState<ITravelReview | null>(null); // Usamos ITravelReview
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [openReview, setOpenReview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ITravelReview>(
        `https://api-sivoy.onrender.com/travels/${travelId}/reviews`
      );
      setTravelReview(response.data); // Almacenamos los datos del viaje con las reseñas
    } catch (error) {
      setError("No se pudieron cargar las reseñas. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }, [travelId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const toggleReview = (reviewId: string) => {
    setOpenReview((prevId) => (prevId === reviewId ? null : reviewId));
  };

  const starStyle = {
    color: "#ffd700",
  };

  const emptyStarStyle = {
    color: "#d1d5db",
  };

  // Asegúrate de que travelReview y su array de reseñas estén disponibles antes de intentar mapearlas
  const reviews = travelReview?.reviews || [];

  return (
    <div id="accordion-nested-parent" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={toggleAccordion}
          aria-expanded={isAccordionOpen}
          aria-controls="accordion-collapse-body-1"
        >
          <span>Reseñas de los usuarios</span>
          <svg
            className={`w-3 h-3 transform ${
              isAccordionOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`${isAccordionOpen ? "block" : "hidden"}`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-4 text-gray-500 dark:text-gray-400">
            A continuación, se muestran las reseñas dejadas por los usuarios para este viaje.
          </p>

          <button
            onClick={fetchReviews}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Actualizar Reseñas"}
          </button>

          {error && <p className="text-red-500">{error}</p>}

          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id}>
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-4 mb-2 font-medium text-gray-700 dark:text-white border border-gray-200 rounded focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:bg-gray-800"
                  onClick={() => toggleReview(review.id)}
                >
                  <span>{review.user.name}</span>
                  <svg
                    className={`w-3 h-3 transform ${
                      openReview === review.id ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
                {openReview === review.id && (
                  <div className="p-4 mb-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p>
                      <Rating
                        initialRating={review.stars}
                        readonly
                        emptySymbol={<i className="fa-regular fa-star" style={emptyStarStyle} />}
                        fullSymbol={<i className="fa-solid fa-star" style={starStyle} />}
                      />
                    </p>
                    <p className="mt-2">{review.review}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No hay reseñas disponibles para este viaje.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsComponent;