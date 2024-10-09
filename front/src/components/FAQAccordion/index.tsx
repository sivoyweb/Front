"use client"

import React, { useState, useEffect } from 'react';
import { IAccordionItemProps } from '@/interfaces/interfaces';
import { IFAQ } from '@/interfaces/interfaces';
import { fetchFAQ } from '@/lib/server/fetchFAQ';

const AccordionItem: React.FC<IAccordionItemProps> = ({ question, answer, isOpen, onToggle }) => {
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
  const [faqs, setFaqs] = useState<IFAQ[]>([]);

  useEffect(() => {
    const getFaqs = async () => {
      try {
        const fetchedFaqs = await fetchFAQ();
        setFaqs(fetchedFaqs); 
      } catch (error) {
      }
    };

    getFaqs(); 
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-arialroundedmtbold mt-8 mb-4 text-sivoy-blue">Preguntas Frecuentes</h2>
      <div className='md:text-xl'>
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
    </div>
  );
};

export default FAQAccordion;
