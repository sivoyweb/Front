import Image from "next/image";


const fotoInfo = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775425/si-voy/fkergitm9nvxuanmblks.jpg';
const fotoAccess = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775425/si-voy/oc8beborc0vk6stxoz6x.jpg';
const fotoTurism = 'https://res.cloudinary.com/dvxh2vynm/image/upload/v1726775424/si-voy/zfqujtcnaupyb4e29cck.jpg';

const BusinessServices = () => {

    return (
        <main className="bg-white">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16 text-justify">
                <div className="order-2 md:order-2 space-y-6 mt-16">
                    <h2 className="font-arialroundedmtbold text-3xl text-sivoy-blue">Consultoría en Turismo Accesible</h2>
                    <p className="text-lg text-sivoy-blue mr-11">
                        ¿Tienes una Agencia de viajes o eres Operador Turístico? Te ayudamos a elaborar
                        itinerarios o rutas de viajes adaptadas a necesidades específicas individuales o grupales.
                    </p>
                    <p className="text-2xl font-arialroundedmtbold text-sivoy-blue">¿Qué beneficios obtendrás?</p>
                    <ul className="list-disc pl-5 text-lg text-sivoy-blue">
                        <li>Atenderás un segmento que representa el 40% de la población, por lo tanto se incrementarán tus ganancias.</li>
                        <li>Eliminas la estacionalidad del sector.</li>
                    </ul>
                    <p className="text-sivoy-blue text-lg mr-14"> 
                        
                         amplía tu oferta a un segmento que conocemos a la perfección.
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


            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16 text-justify text-sivoy-blue shadow-gradient">
                <div className="order-2 md:order-2 space-y-6 mt-10">
                    <h2 className="font-arialroundedmtbold text-3xl text-sivoy-blue">Consultoría en Diseño Universal</h2>
                    <p className="text-lg">
                    ¿Tenés un Hotel o una Empresa del sector turístico?
                    ¿Te gustaría contar con instalaciones accesibles y atender a múltiples clientes?
                    </p>
                    <p className="text-2xl font-arialroundedmtbold text-sivoy-blue">¿Qué obtendrás?</p>
                    <ul className="list-disc pl-5 text-lg">
                        <li>Aumentarás el confort de tus instalaciones, atrayendo un mayor número de clientes, y por ende, los ingresos.</li>
                        <li> Te diferenciaras de la competencia, mejorará tu imagen corporativa e invertirás en Responsabilidad Social.</li>
                    </ul>                       
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

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-8 md:px-16 text-justify">
                <div className="space-y-6">
                    <h2 className="font-arialroundedmtbold text-3xl text-sivoy-blue">Capacitaciones</h2>
                    <p className="text-lg text-sivoy-blue mr-28">
                    ¿Tu personal se siente “incómodo o no sabe dirigirse ante una persona con discapacidad?
                    </p>
                    <p className="text-2xl font-arialroundedmtbold text-sivoy-blue">¿Qué obtendrás?</p>
                    <ul className="list-disc pl-5 text-lg text-sivoy-blue">
                        <li>Pautas para garantizar una correcta atención a “todos” los clientes.</li>
                        <li>A interactuar adecuadamente con las personas en situación de discapacidad o necesidades especiales.</li>
                    </ul>
                    <p>
                    Algunas de nuestras capacitaciones es el Trato adecuado hacia las personas con discapacidad y otras necesidades <strong>Modalidad In Company/Virtual.</strong>

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
        </main>
    )
};

export default BusinessServices;
