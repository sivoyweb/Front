"use client";

import Image from "next/image";
import { fetchTeam } from "@/lib/server/fetchTeam";
import { ITeam } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

export const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<ITeam[]>([]);

  useEffect(() => {
    const getTeam = async () => {
      try {
        const data = await fetchTeam();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error al obtener los miembros del equipo:", error);
      }
    };

    getTeam();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {teamMembers.map((member) => (
        <div key={member.id} className="flex flex-col items-center">
          <a
            href={member.linkedin}
            className="flex flex-col items-center border shadow-md rounded-3xl hover:scale-105 duration-300 transition-transform w-full max-w-xs p-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {member.image?.url ? (
  <Image 
    src={member.image.url as string}  // No es necesario el índice 0
    alt={`Foto de perfil de ${member.name}`} 
    width={180} 
    height={180} 
    className=""
  />
) : (
  <div className="w-[180px] h-[180px] bg-gray-300 flex items-center justify-center">
    <span>Sin imagen</span>
  </div>
)}

            <p className="font-arialroundedmtbold text-sivoy-blue text-center mt-2 4k:text-3xl">
              {member.name}
            </p>
            <p className="text-sivoy-blue text-center 4k:text-2xl">
              {member.description}
            </p>
            <Image
              src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728048850/si-voy/dgywowgy47drvtjlylo1.png" // Cambia esto por la ruta correcta
              alt="logo linkedin"
              width={40} // Cambia el tamaño si es necesario
              height={40} // Cambia el tamaño si es necesario
              className="mt-2"
            />
          </a>
        </div>
      ))}
    </div>
  );
};
