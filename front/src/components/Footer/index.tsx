"use client"


import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

function Footer() {
   
    return (
        <footer className="bg-black text-white p-10">
            
            <div className="container mx-auto px-4 flex justify-center items-start bg-black py-4">
  {/* Bloque izquierdo */}
  <div className="w-1/2 max-w-xs h-64 bg-gray-600 p-4 rounded-lg flex items-center justify-center">
    <h3 className="text-xl font-bold text-center">Tu destino sin límites</h3>
  </div>

  {/* Bloque derecho */}
  <div className="w-1/2 max-w-xs h-64 bg-gray-600 p-4 rounded-lg ml-4 flex flex-col items-end">
    <h4 className="text-lg font-bold mb-2 text-right">Información de Contacto</h4>
    <p className="mb-1 text-right">+54 9 2954 66 48 07</p>
    <p className="mb-1 text-right">info.sivoy.com.ar</p>
    <p className="mb-1 text-right">Argentina</p>

    <div className="mt-4 flex justify-end space-x-4">
      <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
      </Link>
      <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} size="lg" />
      </Link>
      <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </Link>
      <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="lg" />
      </Link>
      <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faYoutube} size="lg" />
      </Link>
    </div>
  </div>
</div>


            
        </footer>
    );
}

export default Footer;
