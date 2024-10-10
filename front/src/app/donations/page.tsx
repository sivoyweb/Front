import DonationsForm from "@/components/DonationsForm";
import OtherDonationsForm from "@/components/OtherDonationsForm";

export default function Donations() {
  return (
    <div className="min-h-screen text-sivoy-blue flex flex-col items-center px-4 md:px-8">
      <div className="w-full max-w-6xl py-10">
        <h1 className="font-arialroundedmtbold text-4xl text-left mb-8 text-sivoy-blue">
          Ayúdanos a Crecer
        </h1>
        <p className="text-xl leading-relaxed text-justify">
          En{" "}
          <span className="font-arialroundedmtbold text-sivoy-blue">
            Sí, Voy
          </span>
          , te invitamos a sumarte a nuestra misión de hacer que los viajes
          sean accesibles para todos. Puedes colaborar de distintas maneras: a
          través de donaciones seguras en línea a través de MercadoPago, o
          explorando diversas formas de apoyar, como donaciones recurrentes, en
          especie, corporativas, o brindando tu tiempo y habilidades
          profesionales. Juntos, haremos posible que más personas con
          discapacidad vivan experiencias inolvidables.
        </p>
      </div>

      <section className="flex flex-col md-lg:flex-row lg:justify-between mb-16 w-full max-w-6exl">
        {/* Sección de Hacer una Donación */}
        <section className="w-full max-w-lg bg-white mt-4 p-8 border border-gray-300 rounded-3xl shadow-lg mx-auto">
          <h2 className="text-2xl font-arialroundedmtbold text-center mb-6 text-sivoy-blue">
            Hacer una Donación
          </h2>
          <p className="text-lg leading-6 text-sivoy-blue text-center mb-6">
            Tu contribución nos ayuda a seguir adelante con nuestra misión.
            ¡Gracias por hacer la diferencia!
          </p>
          <DonationsForm />
        </section>

        {/* Sección de Otras Colaboraciones */}
        <section className="w-full max-w-lg bg-white mt-4 p-8 border border-gray-300 rounded-3xl shadow-lg mx-auto">
          <h2 className="text-2xl font-arialroundedmtbold text-center mb-6 text-sivoy-blue">
            Otras Colaboraciones
          </h2>
          <p className="text-lg leading-6 text-sivoy-blue text-center mb-6">
            ¿Tienes pensado otro tipo de ayuda para ofrecer a Sí, Voy?
            ¡Contáctanos a través de este formulario!
          </p>
          <OtherDonationsForm />
        </section>
      </section>
    </div>
  );
}