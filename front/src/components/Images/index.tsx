"use client";
import { CldImage } from 'next-cloudinary';

export default function TuDestinoImage() {
  return (
    <CldImage
      src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1727356842/si-voy/bggkk2cac4p8ypelq0sd.png" 
      alt="tu destino sin límites"
      className="absolute top-[-50px] w-3/4 h-auto"
      fill
    />
  );
};