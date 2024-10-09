"use client";

import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

function Footer() {

  const notify = () => toast('Enlace copiado al portapapeles');

  return (
    <footer className="bg-sivoy-blue text-white py-10 w-screen">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-10 md:space-y-0">
        
        {/* Información de contacto a la izquierda */}
        <div className="w-full md:w-1/3 lg:w-1/3 py-4 bg-sivoy-blue rounded-lg flex flex-col md:flex-row">
  {/* Columna izquierda: Información de Contacto */}
  <div className="md:w-1/2">
    <h1 className="text-base font-arialroundedmtbold mb-2 text-center md:text-left">
      Información de Contacto
    </h1>
    <div className="text-center md:text-left text-sm">
      <p className="mb-1">+54 9 2954 66 48 07</p>
      <p className="mb-1">info.sivoy.com.ar</p>
      <p className="mb-1">Argentina</p>
    </div>
  </div>

  {/* Columna derecha: Iconos y textos de redes sociales */}
  <div className="mt-4 md:mt-0 md:w-1/2 flex flex-col justify-center space-y-2">
    <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faWhatsapp} size="1x" />
      <p className="text-xs">Whatsapp</p>
    </Link>
    <Link href="https://www.facebook.com/sivoy.com.ar/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faFacebook} size="1x" />
      <p className="text-xs">Facebook</p>
    </Link>
    <Link href="https://www.linkedin.com/company/si-voy/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faLinkedin} size="1x" />
      <p className="text-xs">LinkedIn</p>
    </Link>
    <Link href="https://www.instagram.com/sivoy.accesible/?hl=es-la" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faInstagram} size="1x" />
      <p className="text-xs">Instagram</p>
    </Link>
    <Link href="https://www.youtube.com/channel/UCKzAGfo-XL5qUa_NamBRwfw" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faYoutube} size="1x" />
      <p className="text-xs">YouTube</p>
    </Link>
  </div>
</div>

        {/* Información de la directora y gerente */}
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start bg-sivoy-blue text-white space-y-4 md:space-y-0 md:space-x-8">
            
            <div className="text-center md:text-left">
              <h1 className="font-arialroundedmtbold text-base">Valeria Rodríguez Fontenla</h1>
              <p className="text-sm mb-2">Gerente Comercial</p>
              <p className="text-white text-sm">info@sivoy.com.ar</p>
              <p className="text-white text-sm">+54 9 11 5047-5104</p>
              <p className="text-white text-sm">Buenos Aires</p>
            </div>
            
            <div className="hidden md:block border-l border-sivoy-green h-24"></div>

            <div className="text-center md:text-left">
              <h1 className="font-arialroundedmtbold text-base">Verónica Martínez</h1>
              <p className="text-sm mb-2">Directora</p>
              <p className="text-sivoy-white text-sm">info@sivoy.com.ar</p>
              <p className="text-sivoy-white text-sm">+54 9 2954 664807</p>
              <p className="text-sivoy-white text-sm">Interior</p>
            </div>
          </div>
        </div>

        {/* Nueva columna - Centro de Ayuda */}
        <section className="w-full md:w-1/3 lg:w-1/3 p-4 bg-sivoy-blue">
          <h1 className="text-base font-arialroundedmtbold mb-2 text-start md:text-right">Centro de Ayuda</h1>
          <div className="flex flex-col text-center md:text-right text-sm leading-relaxed space-y-1">
            <a className="hover:underline" href="/about">Sobre Nosotros</a>
            <a className="hover:underline" href="/faq">Preguntas frecuentes</a>
            <a className="hover:underline" href="/contact-us">Contáctanos</a>
            <button 
              className="hover:underline focus:outline-none text-right text-sm leading-relaxed"
              style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                padding: 0, 
                cursor: 'pointer', 
                boxShadow: 'none',
                width: 'auto',
                outline: 'none' // Agregar esto para eliminar el contorno
              }}
              onClick={() => {
                navigator.clipboard.writeText('https://front-eta-teal.vercel.app/')
                  .then(() => {
                    notify(); // Llama a notify() aquí
                  })
              }}
            >
              Comparte esta Iniciativa
            </button>
          </div>
        </section>

      </div>
      <Toaster position="top-center" /> {/* Asegúrate de incluir el Toaster aquí */}
    </footer>
  );
}

export default Footer;
