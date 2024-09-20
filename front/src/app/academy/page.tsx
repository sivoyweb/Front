import Image from "next/image";
import Link from "next/link";

const Academia = () => {

  const fotoAccesibilidad = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775425/si-voy/jpopgadipfqijrfn7jwu.jpg'
  const fotoSinLimites = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775424/si-voy/e5esfzasxmkjkf9tryff.png';

  return (
    <div className="min-h-screen bg-gray-100  ">
    
    
      <section className="bg-white py-16 ml-7">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="m-7">
  <h2 className="text-4xl font-arialroundedmtbold text-sivoy-blue mb-4">
    Capacitación Profesional en Turismo Accesible
  </h2>
  <p className="text-lg mb-6">
    Ofrecemos una formación de alta calidad que te permitirá diseñar experiencias turísticas inclusivas. Aprende cómodamente desde cualquier lugar y únete a la revolución del turismo accesible.
  </p>
  <Link href="/home"
    
      className="bg-sivoy-orange text-white py-3 px-6 rounded-full hover:scale-105 transition ease-in-out duration-400 inline-block"
  >  
      Inscribite Ahora
    
  </Link>
</div>
          <div>
           
            <Image
              src={fotoAccesibilidad}
              alt="Turismo accesible"
              className="rounded-lg shadow-lg ml-10"
              width={400}
              height={600}
            />
          </div>
        </div>
      </section>

     
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-arialroundedmtbold text-sivoy-blue mb-8">
            Beneficios de formarte con nosotros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-sivoy-green shadow-gradient rounded-lg">
              <h4 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">100% Online</h4>
              <p className="text-lg">
                Accede a nuestras clases desde cualquier lugar y en cualquier momento.
              </p>
            </div>
            <div className="p-6 bg-sivoy-green shadow-gradient rounded-lg">
              <h4 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">Material Exclusivo</h4>
              <p className="text-lg">
                Material de estudio de alta calidad disponible para ti durante el curso.
              </p>
            </div>
            <div className="p-6 bg-sivoy-green shadow-gradient rounded-lg">
              <h4 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">Diploma Certificado</h4>
              <p className="text-lg">
                Al finalizar, recibirás un diploma digitalizado y certificado.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section id="program" className="py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-arialroundedmtbold text-sivoy-blue mb-8">Detalles del Programa</h3>
          <div className="flex justify-center items-center mx-auto max-w-6xl gap-8 py-8">
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <ul className="list-disc list-inside text-lg">
                <li>Material de estudio durante todo el cursado</li>
                <li>Acceso al aula 24/7</li>
                <li>Uso irrestricto de la biblioteca virtual</li>
                <li>Salas de foro y chats</li>
                <li>Diploma y certificado analítico digitalizado</li>
              </ul>
            </div>
            <div>
             
              <Image
                src={fotoSinLimites}
                alt="Detalles del Programa"
                className="rounded-lg shadow-lg ml-10"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      
      
    </div>
  );
};

export default Academia;
