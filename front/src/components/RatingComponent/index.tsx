"use client";
import React from "react";
import Rating from "react-rating";

interface StarRatingProps {
  rating: number; 
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const starStyle = {
    color: "#ffd700",
  };

  const emptyStarStyle = {
    color: "#d1d5db",
  };

  return (
    <div>
      <Rating
  initialRating={rating}
  readonly
  emptySymbol={<i className="fa-regular fa-star" style={emptyStarStyle} />}
  fullSymbol={<i className="fa-solid fa-star" style={starStyle} />}
  fractions={4}
/>
    </div>
  );
};

export default StarRating;