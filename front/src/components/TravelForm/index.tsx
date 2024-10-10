"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

enum AccessibilitySealName {
  BRONZE = "Bronze",
  PLATA = "Plata",
  ORO = "Oro",
  PLATINO = "Platino",
}

interface IImage {
  url: string;
  publicId: string;
  alt: string;
}

interface IServiceFormValues {
  name: string;
  country: string;
  city: string;
  date?: string;
  description: string;
  serviceType: string;
  accessibilitySealName?: AccessibilitySealName;
  accesibilitySeal: IImage[];
  images: IImage[];
  website: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
}

const TravelForm: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<IImage[]>([]);
  const [uploadedAccesibilitySeal, setUploadedAccesibilitySeal] = useState<
    IImage[]
  >([]);

  const token = localStorage.getItem("token");
  const formik = useFormik<IServiceFormValues>({
    initialValues: {
      name: "",
      country: "",
      city: "",
      date: "",
      description: "",
      serviceType: "",
      accessibilitySealName: undefined,
      accesibilitySeal: [],
      images: [],
      website: "",
      phone: "",
      email: "",
      address: "",
      openingHours: "",
    },
    validationSchema: Yup.object({
      // ... tus validaciones ...
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(token);
      try {
        const formData = {
          ...values,
          images: uploadedImages,
          accesibilitySeal: uploadedAccesibilitySeal,
        };
        console.log(formData);
        await axios.post("https://api-sivoy.onrender.com/travels", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          icon: "success",
          text: "Servicio creado exitosamente!",
        });
        resetForm();
        setUploadedImages([]);
        setUploadedAccesibilitySeal([]);
      } catch (error) {}
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

        {/* Insignia de Accesibilidad */}
        <div className="mb-4">
          <label
            htmlFor="accessibilitySealName"
            className="block text-xl font-medium text-gray-700"
          >
            Insignia de Accesibilidad
          </label>
          <select
            id="accessibilitySealName"
            name="accessibilitySealName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.accessibilitySealName}
            className={`mt-1 p-2 block w-full shadow-sm border ${
              formik.touched.accessibilitySealName &&
              formik.errors.accessibilitySealName
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          >
            <option value="" label="Seleccione una insignia" />
            <option value={AccessibilitySealName.BRONZE} label="Bronce" />
            <option value={AccessibilitySealName.PLATA} label="Plata" />
            <option value={AccessibilitySealName.ORO} label="Oro" />
            <option value={AccessibilitySealName.PLATINO} label="Platino" />
          </select>
          {formik.touched.accessibilitySealName &&
            formik.errors.accessibilitySealName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.accessibilitySealName}
              </p>
            )}
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Insignias
          </label>
          <CldUploadWidget
            uploadPreset="siVoyPreset"
            onSuccess={(result) => {
              const uploadedImage = result?.info as CloudinaryUploadWidgetInfo;
              if (uploadedImage) {
                setUploadedAccesibilitySeal((prevImages) => [
                  ...prevImages,
                  {
                    url: uploadedImage.secure_url,
                    publicId: uploadedImage.public_id,
                    alt: uploadedImage.original_filename,
                  },
                ]);
                Swal.fire({
                  title: "¡Imagen subida con éxito!",
                  text: `URL: ${uploadedImage.secure_url}`,
                  icon: "success",
                });
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                className="focus text-ls px-3 py-2 text-white bg-blue-500 rounded-md ml-2"
                onClick={() => open()}
              >
                Subir imagen
              </button>
            )}
          </CldUploadWidget>
          <div className="mt-2">
            {uploadedAccesibilitySeal.map((image, index) => (
              <div key={index} className="mt-2">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={300}
                  height={150}
                  className="w-full"
                />
              </div>
            ))}
          </div>
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

        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Imagen
          </label>
          <CldUploadWidget
            uploadPreset="siVoyPreset"
            onSuccess={(result) => {
              const uploadedImage = result?.info as CloudinaryUploadWidgetInfo;
              if (uploadedImage) {
                setUploadedImages((prevImages) => [
                  ...prevImages,
                  {
                    url: uploadedImage.secure_url,
                    publicId: uploadedImage.public_id,
                    alt: uploadedImage.original_filename,
                  },
                ]);
                Swal.fire({
                  title: "¡Imagen subida con éxito!",
                  text: `URL: ${uploadedImage.secure_url}`,
                  icon: "success",
                });
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                className="focus text-ls px-3 py-2 text-white bg-blue-500 rounded-md ml-2"
                onClick={() => open()}
              >
                Subir imagen
              </button>
            )}
          </CldUploadWidget>
          <div className="mt-2">
            {uploadedImages.map((image, index) => (
              <div key={index} className="mt-2">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={300}
                  height={150}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Crear Servicio
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelForm;
