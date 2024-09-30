import Image from "next/image";
import Link from "next/link";

const fotoInfo = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775425/si-voy/fkergitm9nvxuanmblks.jpg';
const fotoAccess = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775425/si-voy/oc8beborc0vk6stxoz6x.jpg';
const fotoTurism = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775424/si-voy/zfqujtcnaupyb4e29cck.jpg';

const BusinessServices = () => {

    return (
        <main className="bg-white">
    
            {/* Sección 1 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16">
                <div className="order-2 md:order-2 space-y-6 mt-16">
                    <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">Asesoramiento en Turismo Accesible</h2>
                    <p className="text-lg">
                        ¿Tienes una Agencia de viajes o eres Operador Turístico? Te ayudamos a elaborar
                        itinerarios o rutas de viajes adaptadas a necesidades específicas individuales o grupales.
                    </p>
                    <p className="text-lg font-arialroundedmtbold text-sivoy-blue">¿Qué beneficios obtendrás?</p>
                    <ul className="list-disc pl-5 text-lg">
                        <li>Incrementarás tus ganancias atendiendo a un nuevo segmento.</li>
                        <li>Eliminas la estacionalidad del sector.</li>
                    </ul>
                    <p>
                        Amplía tu oferta a un segmento que conocemos a la perfección,{" "}
                        <Link href="#contacto" className="text-blue-600 underline">
                            consúltanos.
                        </Link>
                    </p>
                </div>
                <div className="order-1 md:order-1 mb-10 mt-5 md:mt-0">
                    <Image
                        src={fotoInfo}
                        alt="Servicio 1"
                        width={600}
                        height={400}
                        className="rounded-lg w-full"
                    />
                </div>
            </section>

            {/* Sección 2 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16 bg-sivoy-oranje shadow-gradient">
                <div className="space-y-6">
                    <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">Consultoría en Diseño Universal</h2>
                    <p className="text-lg">
                        ¿Tienes un Hotel o una Empresa del sector turístico? Te gustaría contar con instalaciones accesibles
                        y atender a múltiples clientes.
                    </p>
                    <p className="text-lg font-arialroundedmtbold text-sivoy-blue">¿Qué obtendrás?</p>
                    <ul className="list-disc pl-5 text-lg">
                        <li>Aumentarás el confort de tus instalaciones.</li>
                        <li>Te diferenciarás de la competencia.</li>
                    </ul>
                    <p>
                        Comienza la transformación,{" "}
                        <a href="#contacto" className="text-blue-600 underline">
                            consúltanos.
                        </a>
                    </p>
                </div>
                <div>
                    <Image
                        src={fotoAccess}
                        alt="Servicio 2"
                        width={600}
                        height={400}
                        className="rounded-lg w-full"
                    />
                </div>
            </section>

            {/* Sección 3 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16">
                <div className="order-2 md:order-2 space-y-6 mt-10">
                    <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">Capacitación en Turismo Accesible</h2>
                    <p className="text-lg">
                        ¿Cuentas con personal a cargo y quieres brindar una atención inclusiva? Formamos a tu equipo sobre la
                        importancia del trato adecuado a personas con discapacidad.
                    </p>
                    <p className="text-lg font-arialroundedmtbold text-sivoy-blue">¿Qué obtendrás?</p>
                    <ul className="list-disc pl-5 text-lg">
                        <li>Capacitarás a tu personal en turismo accesible.</li>
                        <li>Mejorarás la calidad del servicio.</li>
                    </ul>
                    <p>
                        Invierte en formación,{" "}
                        <a href="#contacto" className="text-blue-600 underline">
                            consúltanos.
                        </a>
                    </p>
                </div>
                <div className="order-1 md:order-1 mb-10 mt-5 md:mt-0">
                    <Image
                        src={fotoTurism}
                        alt="Servicio 3"
                        width={600}
                        height={400}
                        className="rounded-lg w-full"
                    />
                </div>
            </section>
        </main>
    )
};

export default BusinessServices;
