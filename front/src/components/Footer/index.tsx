"use client";

import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-sivoy-blue text-white p-10 -ml-16 -mr-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start space-y-10 md:space-y-0">
        
        <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start bg-sivoy-blue text-white space-y-4 md:space-y-0 md:space-x-8">
            
            <div className="text-center md:text-left">
              <h3 className="font-arialroundedmtbold text-base">Valeria Rodríguez Fontenla</h3>
              <p className="text-sm mb-2">Gerente Comercial</p>
              <p className="text-sivoy-green text-sm">info@sivoy.com.ar</p>
              <p className="text-sivoy-green text-sm">+54 9 11 5047-5104</p>
              <p className="text-sivoy-green text-sm">Buenos Aires</p>
            </div>

            
            <div className="hidden md:block border-l border-sivoy-green h-24"></div>

            
            <div className="text-center md:text-left">
              <h3 className="font-arialroundedmtbold text-base">Verónica Martínez</h3>
              <p className="text-sm mb-2">Directora</p>
              <p className="text-sivoy-green text-sm">info@sivoy.com.ar</p>
              <p className="text-sivoy-green text-sm">+54 9 2954 664807</p>
              <p className="text-sivoy-green text-sm">Interior</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 lg:w-1/3 pl-6 pr-6 bg-sivoy-blue rounded-lg">
          <h4 className="text-base font-arialroundedmtbold mb-2 text-center md:text-left">Información de Contacto</h4>
          <div className="text-center md:text-left text-sm">
            <p className="mb-1">+54 9 2954 66 48 07</p>
            <p className="mb-1">info.sivoy.com.ar</p>
            <p className="mb-1">Argentina</p>
          </div>
        

          
          <div className="mt-4 flex justify-center md:justify-start space-x-6">
            <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} size="1x" />
            </Link>
            <Link href="https://www.facebook.com/sivoy.com.ar/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="1x" />
            </Link>
            <Link href="https://www.linkedin.com/company/si-voy/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="1x" />
            </Link>
            <Link href="https://www.instagram.com/sivoy.accesible/?hl=es-la" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="1x" />
            </Link>
            <Link href="https://www.youtube.com/channel/UCKzAGfo-XL5qUa_NamBRwfw" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} size="1x" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

