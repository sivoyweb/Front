import Image from "next/image";
import fotoEmpresa from '../../../public/assets/servicioaemmpresas.jpg';
import fotoaccess from '../../../public/assets/turismoAcequible.jpg';
import fotocapacitacion from '../../../public/assets/capTurismo.jpg';

const BusinessServices = () => {

    return (
        <main className="bg-white">

      <section
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/servicios.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <h1 className="text-white text-4xl font-bold">Servicios a Empresas</h1>
        </div>
      </section>

    
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16">
        <div className="order-2 md:order-2 space-y-6">
          <h2 className="text-3xl font-semibold">Asesoramiento en Turismo Accesible</h2>
          <p className="text-lg">
            ¿Tenés una Agencia de viajes o sos Operador Turístico? Te ayudamos a elaborar
            itinerarios o rutas de viajes adaptadas a necesidades específicas individuales o grupales.
          </p>
          <p className="text-lg font-semibold">¿Qué beneficios obtendrás?</p>
          <ul className="list-disc pl-5 text-lg">
            <li>Incrementarás tus ganancias atendiendo a un nuevo segmento.</li>
            <li>Eliminas la estacionalidad del sector.</li>
          </ul>
          <p>
            Ampliá tu oferta a un segmento que conocemos a la perfección,{" "}
            <a href="#contacto" className="text-blue-600 underline">
              consultanos.
            </a>
          </p>
        </div>
        <div className="order-1 md:order-1">
          <Image
            src={fotoEmpresa}
            alt="Servicio 1"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </section>

      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16 bg-sivoy-oranje shadow-gradient">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Consultoría en Diseño Universal</h2>
          <p className="text-lg">
            ¿Tenés un Hotel o una Empresa del sector turístico? Te gustaría contar con instalaciones accesibles
            y atender a múltiples clientes.
          </p>
          <p className="text-lg font-semibold">¿Qué obtendrás?</p>
          <ul className="list-disc pl-5 text-lg">
            <li>Aumentarás el confort de tus instalaciones.</li>
            <li>Te diferenciarás de la competencia.</li>
          </ul>
          <p>
            Comenzá la transformación,{" "}
            <a href="#contacto" className="text-blue-600 underline">
              consultanos.
            </a>
          </p>
        </div>
        <div>
          <Image
            src={fotoaccess}
            alt="Servicio 2"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </section>

      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16">
        <div className="order-2 md:order-2 space-y-6">
          <h2 className="text-3xl font-semibold">Capacitación en Turismo Accesible</h2>
          <p className="text-lg">
            ¿Contás con personal a cargo y querés brindar una atención inclusiva? Formamos a tu equipo sobre la
            importancia del trato adecuado a personas con discapacidad.
          </p>
          <p className="text-lg font-semibold">¿Qué obtendrás?</p>
          <ul className="list-disc pl-5 text-lg">
            <li>Capacitarás a tu personal en turismo accesible.</li>
            <li>Mejorarás la calidad del servicio.</li>
          </ul>
          <p>
            Invertí en formación,{" "}
            <a href="#contacto" className="text-blue-600 underline">
              consultanos.
            </a>
          </p>
        </div>
        <div className="order-1 md:order-1">
          <Image
            src={fotocapacitacion}
            alt="Servicio 3"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </section>
    </main>
    )
};

export default BusinessServices;