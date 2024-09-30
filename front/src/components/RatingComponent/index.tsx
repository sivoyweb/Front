"use client";
import React from "react";
import Rating from "react-rating";

interface StarRatingProps {
  rating: number; // Recibirá el promedio de estrellas (1-5)
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const starStyle = {
    color: "#ffd700", // Color de las estrellas llenas
  };

  const emptyStarStyle = {
    color: "#d1d5db", // Color de las estrellas vacías
  };

  return (
    <div>
      <Rating
  initialRating={rating}
  readonly
  emptySymbol={<i className="fa-regular fa-star" style={emptyStarStyle} />}
  fullSymbol={<i className="fa-solid fa-star" style={starStyle} />}
  fractions={4}  // Permite cuartos de estrella (e.g., 2.25, 2.75, etc.)
/>
    </div>
  );
};

export default StarRating;