"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ICarouselProps } from "@/interfaces/interfaces";

const CarouselTravels: React.FC<ICarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNextSlide]);

  return (
    <div className="relative w-full h-64 md:h-[30rem] overflow-hidden rounded-lg">
      <div className="relative h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.url}
              alt={item.publicId}
              layout="fill"
              objectFit="cover"
              className="block w-full h-full"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={goToPrevSlide}
      >
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1L1 5l4 4"
          />
        </svg>
      </button>

      <button
        type="button"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={goToNextSlide}
      >
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 9l4-4-4-4"
          />
        </svg>
      </button>

      <div className="absolute z-10 flex justify-center w-full space-x-2 bottom-5">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselTravels;