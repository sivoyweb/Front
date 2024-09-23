"use client";

import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const fotoFooter = "https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775425/si-voy/akziw4bhnofbehkbrgij.jpg";

  return (
            <footer className="bg-sivoy-blue text-white font-arialroundedmtbold p-10">
              <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start bg-sivoy-blue py-4 space-y-6 md:space-y-0">
                {/* Bloque izquierdo */}
                <div className="w-full md:w-1/2 lg:w-1/3 h-72 bg-sivoy-blue rounded-lg relative">
                  <div className="relative w-full h-full">
                    <Image
                      src={fotoFooter}
                      alt="foto footer"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                {/* Bloque derecho */}
                <div className="w-full md:w-1/2 lg:w-1/3 h-auto bg-sivoy-blue p-6 rounded-lg relative">
                  <div className="relative w-full h-full">
                    <h4 className="text-lg font-bold mb-2 text-right md:text-left">Información de Contacto</h4>
                    <p className="mb-1 text-right md:text-left">+54 9 2954 66 48 07</p>
                    <p className="mb-1 text-right md:text-left">info.sivoy.com.ar</p>
                    <p className="mb-1 text-right md:text-left">Argentina</p>

                    <div className="mt-4 flex justify-end md:justify-start space-x-4">
                      <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                      </Link>
                      <Link href="https://www.facebook.com/sivoy.com.ar/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                      </Link>
                      <Link href="https://www.linkedin.com/company/si-voy/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} size="lg" />
                      </Link>
                      <Link href="https://www.instagram.com/sivoy.accesible/?hl=es-la" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                      </Link>
                      <Link href="https://www.youtube.com/channel/UCKzAGfo-XL5qUa_NamBRwfw" target="_blank" rel="noopener noreferrer">
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
