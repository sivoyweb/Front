"use client";

import React, { useState, useEffect } from "react";
import { IFAQ } from "@/interfaces/interfaces";
import { fetchFAQ } from "@/lib/server/fetchFAQ";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AdminFaqComponent: React.FC = () => {
  const MySwal = withReactContent(Swal);
  const [faqs, setFaqs] = useState<IFAQ[]>([]);
  const [visibleFAQs, setVisibleFAQs] = useState(5);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedFAQ, setEditedFAQ] = useState<Partial<IFAQ>>({});

  useEffect(() => {
    const getFaqs = async () => {
      try {
        const fetchedFaqs = await fetchFAQ();
        setFaqs(fetchedFaqs);
      } catch (error) {
        console.error("Error al obtener las FAQs:", error);
      }
    };

    getFaqs();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la pregunta frecuente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://api-sivoy.onrender.com/faq/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFaqs(faqs.filter((faq) => faq.id !== id));
        await MySwal.fire("Eliminada", "La FAQ ha sido eliminada", "success");
      } catch (error) {
        console.error("Error al eliminar la FAQ:", error);
        await MySwal.fire("Error", "No se pudo eliminar la FAQ", "error");
      }
    }
  };

  const handleEdit = (index: number) => {
    setEditMode(index);
    setEditedFAQ(faqs[index]);
  };

  const handleSaveEdit = async () => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas guardar los cambios?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed && editedFAQ.id) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `https://api-sivoy.onrender.com/faq/${editedFAQ.id}`,
          editedFAQ,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFaqs((prevFaqs) =>
          prevFaqs.map((faq) =>
            faq.id === editedFAQ.id ? { ...faq, ...editedFAQ } : faq
          )
        );
        setEditMode(null);
        await MySwal.fire(
          "Guardado",
          "Los cambios se han guardado correctamente",
          "success"
        );
      } catch (error) {
        console.error("Error al guardar la FAQ:", error);
        await MySwal.fire("Error", "No se pudo guardar la FAQ", "error");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedFAQ({});
  };

  const handleShowMore = () => {
    setVisibleFAQs(faqs.length);
  };

  const handleUpdateFaqs = async () => {
    try {
      const fetchedFaqs = await fetchFAQ();
      setFaqs(fetchedFaqs);
      setVisibleFAQs(5);
    } catch (error) {
      console.error("Error al actualizar las FAQs:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        MySwal.fire({
          title: "Error",
          text: "No se encontró un token de autenticación.",
          icon: "error",
        });
        return;
      }

      // Paso 1: Llamar a la API para exportar "FAQ"
      const exportResponse = await axios.get(
        "https://api-sivoy.onrender.com/data/export/FAQ", // Cambia 'FAQ' según tu entidad
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fileName = exportResponse.data.fileName;
      if (!fileName) {
        MySwal.fire({
          title: "Error",
          text: "No se pudo obtener el nombre del archivo.",
          icon: "error",
        });
        return;
      }

      // Paso 2: Descargar el archivo exportado
      const downloadResponse = await axios({
        url: `https://api-sivoy.onrender.com/data/download/${fileName}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    } catch (err) {
      MySwal.fire({
        title: "¡Error!",
        text: "Hubo un problema al descargar el archivo.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-full">
      <h2 className="text-2xl font-arialroundedmtbold mt-8 mb-4 text-sivoy-blue">
        Preguntas Frecuentes
      </h2>

      <div className="text-right mb-4">
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Descargar FAQs en Excel
        </button>
      </div>

      <div className="md:text-xl">
        {faqs.slice(0, visibleFAQs).map((faq, index) => (
          <div key={faq.id} className="p-4 border rounded-lg mb-4">
            {editMode === index ? (
              <div>
                <input
                  type="text"
                  value={editedFAQ.question || ""}
                  onChange={(e) =>
                    setEditedFAQ((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  className="custom-button"
                />
                <textarea
                  value={editedFAQ.answer || ""}
                  onChange={(e) =>
                    setEditedFAQ((prev) => ({
                      ...prev,
                      answer: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded mb-2"
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <button onClick={handleSaveEdit} className="guardarInfo ">
                    Guardar
                  </button>
                  <button onClick={handleCancelEdit} className="cancelarBtn ">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-bold">{faq.question}</h3>
                <p>{faq.answer}</p>
                <div className="flex justify-end gap-4 mt-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="editarBtn "
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="px-4 py-2 "
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {visibleFAQs < faqs.length && (
        <button onClick={handleShowMore} className="mt-4 px-4 py-2 ">
          Ver más
        </button>
      )}

      <div className="flex justify-end mt-4">
        <button onClick={handleUpdateFaqs} className="px-4 my-6 py-3 ">
          Actualizar preguntas
        </button>
      </div>
    </div>
  );
};

export default AdminFaqComponent;
