"use client"

import React, { useState } from 'react';
import { AccordionItemProps } from '@/interfaces/interfaces';

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="font-arialroundedmtbold text-sivoy-blue">{question}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="p-4 text-gray-700">{answer}</div>}
    </div>
  );
};

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo puedo saber si un destino es accesible?",
      answer: "En nuestra plataforma, cada destino listado incluye una descripción detallada de sus características de accesibilidad. Puedes filtrar los resultados según tus necesidades específicas."
    },
    {
      question: "¿Qué tipos de discapacidades cubre SI VOY?",
      answer: "Nos enfocamos en una amplia gama de discapacidades, incluyendo discapacidades físicas, visuales, auditivas, y cognitivas. Cada destino tiene información específica sobre las facilidades disponibles."
    },
    {
      question: "¿Cómo puedo contribuir con SI VOY?",
      answer: "Puedes colaborar con nosotros como voluntario, donando, o compartiendo información sobre destinos accesibles. Contacta con nosotros a través de nuestro formulario de contacto o redes sociales."
    },
    {
      question: "¿SI VOY solo cubre destinos en Argentina?",
      answer: "Aunque comenzamos en Argentina, estamos expandiendo nuestra base de datos para incluir destinos en toda América Latina."
    },
    {
      question: "¿Puedo sugerir un destino accesible?",
      answer: "¡Por supuesto! Si conoces un lugar que debería estar en nuestra plataforma, utiliza la opción de 'Sugerir un Destino' en nuestro sitio web y envíanos la información detallada."
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-arialroundedmtbold mt-8 mb-4 text-sivoy-blue">Preguntas Frecuentes</h2>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default FAQAccordion;
