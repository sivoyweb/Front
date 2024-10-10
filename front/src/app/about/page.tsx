import { ProjectsSection } from "@/components/Projects";
import  TeamSection  from "@/components/Team";

const AboutUsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-justify">
      <section className="mb-8">
        <h1 className="text-3xl font-arialroundedmtbold text-sivoy-blue mb-4">
          Sobre Nosotros
        </h1>
        <p className="text-gray-700 text-lg">
          Somos una empresa formada por personas con discapacidad, comprometida
          con la diversidad, la inclusión y el bienestar de todas las personas.
          Nos dedicamos a generar un puente entre la oferta y la demanda de
          servicios turísticos adaptados, trabajando dentro del marco de la
          responsabilidad social empresarial para lograr un impacto positivo en
          la sociedad.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-2">
          Misión y Visión
        </h2>
        <p className="text-gray-700 text-lg">
          SÍ, VOY tiene como misión generar experiencias positivas en las
          personas con movilidad reducida, por medio de la gestión y promoción
          del turismo accesible y la transformación de entornos en inclusivos,
          para garantizar el disfrute del ocio con autonomía. Nuestra visión es
          convertirnos en la plataforma de referencia para el turismo accesible
          en América Latina, fomentando una cultura inclusiva y facilitando el
          acceso a experiencias turísticas a todos los individuos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-2">
          Historia
        </h2>
        <p className="text-gray-700 text-lg">
          SI VOY nació de la necesidad de crear un espacio inclusivo donde las
          personas con discapacidad pudieran encontrar información confiable y
          útil sobre destinos turísticos accesibles. Desde nuestros inicios,
          hemos trabajado incansablemente para mapear y documentar lugares que
          cumplen con criterios de accesibilidad, colaborando con prestadores de
          servicios y comunidades locales.
        </p>
      </section>

      <div className="flex flex-col md:flex-row justify-between gap-16 mb-8">
        <ProjectsSection />

        <section className="flex-1">
          <h2 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">
            Logros
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li>
              Hemos creado la primera base de datos detallada y colaborativa de
              destinos turísticos accesibles en Argentina.
            </li>
            <li>
              Relevamos y descubrimos miles de prestadores turísticos, logrando
              visibilizar la accesibilidad de sus instalaciones.
            </li>
            <li>
              Realizamos capacitaciones y campañas de concientización en toda
              Latinoamérica, promoviendo el turismo inclusivo.
            </li>
          </ul>
        </section>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-arialroundedmtbold text-sivoy-blue mb-4">
          Equipo
        </h2>

        <p className="text-gray-700 text-lg mt-4">
          Contamos con un equipo dedicado de voluntarios que apoyan en la
          investigación, mapeo de destinos y organización de eventos.
        </p>
        <TeamSection />
      </section>
    </div>
  );
};

export default AboutUsPage;