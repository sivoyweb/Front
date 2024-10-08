import Image from "next/image";
import Link from "next/link";

const Academia = () => {
  const fotoAccesibilidad =
    "https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775425/si-voy/jpopgadipfqijrfn7jwu.jpg";

  return (
    <div className="min-h-screen">
      <section className="bg-white py-16 px-4 lg:px-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-arialroundedmtbold text-sivoy-blue">
              Capacitación Profesional en Turismo Accesible
            </h2>
            <p className="text-lg text-justify mr-16 text-sivoy-blue">
              Ofrecemos una formación de alta calidad que te permitirá diseñar
              experiencias turísticas inclusivas. Aprende cómodamente desde
              cualquier lugar y únete a la revolución del turismo accesible.
            </p>
            <Link
              href="/contact-us"
              className="bg-sivoy-orange text-white py-3 px-6 rounded-full hover:scale-105 transition ease-in-out duration-400 inline-block"
            >
              Consulta aquí
            </Link>
          </div>
          <div className="w-full lg:w-auto">
            <Image
              src={fotoAccesibilidad}
              alt="Turismo accesible"
              className="rounded-lg shadow-lg"
              width={400}
              height={600}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* Sección 2 */}
      <section className="bg-gray-100 rounded-lg pb-16 pt-8 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-arialroundedmtbold text-sivoy-blue mb-8">
            Beneficios de formarte con nosotros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-sivoy-green shadow-gradient rounded-lg">
              <h4 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">
                100% Online
              </h4>
              <p className="text-lg text-sivoy-blue">
                Accede a nuestras clases desde cualquier lugar y en cualquier
                momento.
              </p>
            </div>
            <div className="p-6 bg-sivoy-green shadow-gradient rounded-lg">
              <h4 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">
                Material Exclusivo
              </h4>
              <p className="text-lg text-sivoy-blue">
                Material de estudio de alta calidad disponible para ti durante
                el curso.
              </p>
            </div>
            <div className="p-6 bg-sivoy-green shadow-gradient rounded-lg">
              <h4 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">
                Diploma Certificado
              </h4>
              <p className="text-lg text-sivoy-blue">
                Al finalizar, recibirás un diploma digitalizado y certificado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3 */}
      <section id="program" className="py-8 px-4 lg:px-8">
        <div className="container mx-auto">
          <h3 className="text-3xl font-arialroundedmtbold text-sivoy-blue">
            Detalles del Programa
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mx-auto max-w-6xl">
            <div className="bg-white p-8 rounded-lg">
              <ul className="list-disc list-inside text-lg space-y-2 text-justify text-sivoy-blue">
                <li>Material de estudio durante todo el cursado</li>
                <li>Acceso al aula 24/7</li>
                <li>Uso irrestricto de la biblioteca virtual</li>
                <li>Salas de foro y chats</li>
                <li>Diploma y certificado analítico digitalizado</li>
              </ul>
            </div>
            <div className="w-full lg:w-auto">
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academia;
