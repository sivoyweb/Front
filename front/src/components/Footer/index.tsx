"use client"

import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {

  const notify = () => toast('Enlace copiado al portapapeles');

  return (
<footer className="bg-sivoy-blue text-white py-8 px-4 md:px-10 lg:px-28 mt-auto">
  <div className="max-w-8xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-10 items-start"> {/* Añadí items-start para alinear */}
    {/* Contact Information and Social Media Links */}
    <div className="space-y-5 text-center md:text-left">
      <h3 className="md-lg:text-lg font-arialroundedmtbold">Información de Contacto</h3>
      <div className="space-y-2">
        <p className="text-sm">+54 9 2954 66 48 07</p>
        <p className="text-sm">info.sivoy.com.ar</p>
        <p className="text-sm">Argentina</p>
      </div>
      <div className="grid max-md:grid-cols-1 grid-cols-3 gap-2"> {/* Cambiado a 3 columnas */}
        <Link href="https://web.facebook.com/sivoy.com.ar" className="flex justify-center md:justify-start space-x-1 text-xs hover:text-gray-300 transition-colors col-span-1">
          <Facebook size={16} />
          <span>Facebook</span>
        </Link>
        <Link href="https://www.instagram.com/sivoy.accesible/?hl=es-la" className="flex justify-center md:justify-start space-x-1 text-xs hover:text-gray-300 transition-colors col-span-2">
          <Instagram size={16} />
          <span>Instagram</span>
        </Link>
        <Link href="https://www.linkedin.com/company/si-voy/" className="flex justify-center md:justify-start space-x-1 text-xs hover:text-gray-300 transition-colors col-span-1">
          <Linkedin size={16} />
          <span>LinkedIn</span>
        </Link>
        <Link href="https://www.youtube.com/channel/UCKzAGfo-XL5qUa_NamBRwfw" className="flex justify-center md:justify-start space-x-1 text-xs hover:text-gray-300 transition-colors col-span-2">
          <Youtube size={16} />
          <span>YouTube</span>
        </Link>
      </div>
    </div>

    {/* Team Members - Aligned side by side */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
      <div className="flex-1 space-y-2 text-center md:text-left">
        <h4 className="text-sm md-lg:text-base font-arialroundedmtbold">Valeria Rodríguez</h4>
        <p className="text-xs md-lg:text-sm text-gray-400">Gerente Comercial</p>
        <p className="text-sm">info@sivoy.com.ar</p>
        <p className="text-sm">+54 9 11 5047-5104</p>
        <p className="text-sm">Buenos Aires</p>
      </div>
      <div className="w-0.5 bg-sivoy-green self-stretch hidden md:block"></div>
      <div className="flex-1 space-y-2 text-center md:text-left">
        <h4 className="font-arialroundedmtbold text-sm md-lg:text-base">Verónica Martínez</h4>
        <p className="text-xs md-lg:text-sm text-gray-400">Directora</p>
        <p className="text-sm">info@sivoy.com.ar</p>
        <p className="text-sm">+54 9 2954 664807</p>
        <p className="text-sm">Interior</p>
      </div>
    </div>

    {/* Help Center */}
    <div className="space-y-4 md:text-right md:ml-auto"> {/* Eliminé md:self-end */}
      <h3 className="md-lg:text-lg font-arialroundedmtbold text-center md:text-right">Centro de Ayuda</h3>
      <ul className="space-y-2 text-center md:text-right">
        <li>
          <Link href="/about" className="text-sm hover:text-gray-300 transition-colors">
            Sobre Nosotros
          </Link>
        </li>
        <li>
          <Link href="/faq" className="text-sm hover:text-gray-300 transition-colors">
            Preguntas frecuentes
          </Link>
        </li>
        <li>
          <Link href="/contact-us" className="text-sm hover:text-gray-300 transition-colors">
            Contáctanos
          </Link>
        </li>
        <li>
          <button 
            className="hover:text-gray-300 transition-colors focus:outline-none text-sm"
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              padding: 0, 
              cursor: 'pointer',
              outline: 'none'
            }}
            onClick={() => {
              navigator.clipboard.writeText('https://front-eta-teal.vercel.app/')
                .then(() => {
                  notify();
                });
            }}
          >
            Comparte esta Iniciativa
          </button>
          <Toaster position="top-center" />
        </li>
      </ul>
    </div>
  </div>
</footer>
  )
}