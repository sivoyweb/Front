"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from "next/image";

interface IImage {
  url: string;
  alt: string;
}

interface IServiceFormValues {
  name: string;
  country: string;
  city: string;
  date?: string;
  description: string;
  serviceType: string;
  accesibilitySeal: string;
  images: IImage[];
  insignias: IImage[];
  website: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
}

const TravelForm: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<IImage[]>([]);
  const [uploadedInsignias, setUploadedInsignias] = useState<IImage[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleImageUpload = () => {
    const newImage: IImage = {
      url: "https://ejemplo.com/imagen.jpg", // URL de ejemplo
      alt: "Descripción de la imagen",
    };
    setUploadedImages([...uploadedImages, newImage]);
  };

  const handleInsigniaUpload = () => {
    const newInsignia: IImage = {
      url: "https://ejemplo.com/insignia.jpg", // URL de ejemplo
      alt: "Descripción de la insignia",
    };
    setUploadedInsignias([...uploadedInsignias, newInsignia]);
  };

  const formik = useFormik<IServiceFormValues>({
    initialValues: {
      name: "",
      country: "",
      city: "",
      date: "",
      description: "",
      serviceType: "",
      accesibilitySeal: "",
      images: [],
      insignias: [],
      website: "",
      phone: "",
      email: "",
      address: "",
      openingHours: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio."),
      country: Yup.string().required("El país es obligatorio."),
      city: Yup.string().required("La ciudad es obligatoria."),
      description: Yup.string().required("La descripción es obligatoria."),
      serviceType: Yup.string().required("El tipo de servicio es obligatorio."),
      accesibilitySeal: Yup.string().required(
        "El sello de accesibilidad es obligatorio."
      ),
      website: Yup.string()
        .url("Ingrese una URL válida")
        .required("El sitio web es obligatorio."),
      phone: Yup.string().required("El teléfono es obligatorio."),
      email: Yup.string()
        .email("Ingrese un email válido")
        .required("El correo electrónico es obligatorio."),
      address: Yup.string().required("La dirección es obligatoria."),
      openingHours: Yup.string().required(
        "El horario de apertura es obligatorio."
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = {
          ...values,
          images: uploadedImages,
          insignias: uploadedInsignias,
        };
        await axios.post("/api/services", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("¡Servicio creado exitosamente!");
        resetForm();
        setUploadedImages([]);
        setUploadedInsignias([]);
      } catch (error) {
        console.error("Error al crear el servicio:", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Crear Servicio</h2>

        {/* Nombre */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-xl font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-xl font-medium text-gray-700"
          >
            País
          </label>
          <input
            id="country"
            name="country"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.country && formik.errors.country
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-xl font-medium text-gray-700"
          >
            Ciudad
          </label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.city && formik.errors.city
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
          )}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-xl font-medium text-gray-700"
          >
            Fecha
          </label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-xl font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Service Type */}
        <div className="mb-4">
          <label
            htmlFor="serviceType"
            className="block text-xl font-medium text-gray-700"
          >
            Tipo de Servicio
          </label>
          <select
            id="serviceType"
            name="serviceType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceType}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.serviceType && formik.errors.serviceType
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          >
            <option value="" label="Seleccione un tipo de servicio" />
            <option value="Balneario" label="Balneario" />
            <option value="Gastronomía" label="Gastronomía" />
            <option value="Alojamiento" label="Alojamiento" />
            <option value="Ocio y recreación" label="Ocio y recreación" />
            <option
              value="Actividades culturales"
              label="Actividades culturales"
            />
            <option value="Medios de transporte" label="Medios de transporte" />
            <option value="Experiencias" label="Experiencias" />
            <option value="Servicios personales" label="Servicios personales" />
            <option value="Otro" label="Otro" />
          </select>
          {formik.touched.serviceType && formik.errors.serviceType && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.serviceType}
            </p>
          )}
        </div>

        {/* Accesibility Seal */}
        <div className="mb-4">
          <label
            htmlFor="accesibilitySeal"
            className="block text-xl font-medium text-gray-700"
          >
            Sello de Accesibilidad
          </label>
          <input
            id="accesibilitySeal"
            name="accesibilitySeal"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accesibilitySeal}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.accesibilitySeal && formik.errors.accesibilitySeal
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.accesibilitySeal &&
            formik.errors.accesibilitySeal && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.accesibilitySeal}
              </p>
            )}
        </div>

        {/* Website */}
        <div className="mb-4">
          <label
            htmlFor="website"
            className="block text-xl font-medium text-gray-700"
          >
            Sitio Web
          </label>
          <input
            id="website"
            name="website"
            type="url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.website}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.website && formik.errors.website
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.website && formik.errors.website && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.website}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-xl font-medium text-gray-700"
          >
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-xl font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-xl font-medium text-gray-700"
          >
            Dirección
          </label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* Opening Hours */}
        <div className="mb-4">
          <label
            htmlFor="openingHours"
            className="block text-xl font-medium text-gray-700"
          >
            Horario de Apertura
          </label>
          <input
            id="openingHours"
            name="openingHours"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.openingHours}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.openingHours && formik.errors.openingHours
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {formik.touched.openingHours && formik.errors.openingHours && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.openingHours}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Imágenes
          </label>
          <button
            type="button"
            onClick={handleImageUpload}
            className="mt-2 mb-2 p-2 w-full"
          >
            Subir Imagen
          </button>
          <div className="flex flex-wrap gap-2">
            {uploadedImages.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={image.alt}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>

        {/* Insignia Upload */}
        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Insignias
          </label>
          <button
            type="button"
            onClick={handleInsigniaUpload}
            className="mt-2 mb-2 p-2 w-full"
          >
            Subir Insignia
          </button>
          <div className="flex flex-wrap gap-2">
            {uploadedInsignias.map((insignia, index) => (
              <Image
                key={index}
                src={insignia.url}
                alt={insignia.alt}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="w-full">
            Crear Servicio
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelForm;
