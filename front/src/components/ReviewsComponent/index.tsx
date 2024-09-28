"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IReviewGet } from "@/interfaces/interfaces";

// Interfaz para definir el tipo de reseña


interface ReviewAccordionProps {
  travelId: string;
}

const ReviewsComponent: React.FC<ReviewAccordionProps> = ({ travelId }) => {
  const [reviews, setReviews] = useState<IReviewGet[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    // Función para obtener las reseñas
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api-sivoy.onrender.com/travels/${travelId}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error al obtener las reseñas:", error);
      }
    };

    fetchReviews();
  }, [travelId]);

  // Función para alternar el acordeón
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

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
            A continuación, se muestran las reseñas dejadas por los usuarios para
            este viaje.
          </p>

          {/* Mapeamos las reseñas */}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="border p-4 mb-4 rounded-lg dark:bg-gray-800"
              >
                <p className="text-lg font-bold text-gray-700 dark:text-white">
                  {review.user.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {review.stars} estrellas
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {review.review}
                </p>
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