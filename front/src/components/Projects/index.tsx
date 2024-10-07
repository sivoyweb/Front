"use client"

import { useState, useEffect } from 'react';
import {fetchProjects} from "@/lib/server/fetchProjects"
import { IProjects } from '@/interfaces/interfaces';

export const ProjectsSection = () => {
    const [projects, setProjects] = useState<IProjects[]>([]);


  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };

    getProjects();
  }, []);

  return (
    <section className="flex-1">
      <h2 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">Proyectos</h2>
      <ul className="list-disc list-inside text-gray-700">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <li key={index}>
              <span className="font-arialroundedmtbold">{project.name}:</span> {project.description}
            </li>
          ))
        ) : (
          <li>Cargando proyectos...</li>
        )}
      </ul>
    </section>
  );
}