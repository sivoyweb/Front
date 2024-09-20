"use client"

import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';


function Footer() {
    

  const fotoFooter = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775425/si-voy/akziw4bhnofbehkbrgij.jpg';
   
    return (
        <footer className="bg-sivoy-blue text-white p-10">
            
            <div className="container mx-auto px-4 flex justify-center items-start bg-sivoy-blue py-4">
  {/* Bloque izquierdo */}
  <div className="w-3/4 max-w-lg h-64 bg-sivoy-blue p-4 rounded-lg relative">
  <div className="relative w-full h-full">
    <Image
      src={fotoFooter}
      alt="foto footer"
      fill
      style={{ objectFit: 'cover' }}   
      className="rounded-lg"
    />
  </div>
</div>

  {/* Bloque derecho */}
  <div className="w-3/4 max-w-lg h-64 bg-sivoy-blue p-6 rounded-lg relative mt-5">

  <div className='relative w-full h-full'>
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
</div>


            
        </footer>
    );
}

export default Footer;
