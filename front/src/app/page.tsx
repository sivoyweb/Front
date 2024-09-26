import Image from "next/image";
import tudestino from "../assets/tudestino.png"
import vero from "../assets/vero.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWheelchairMove, faMapLocationDot, faGlobe, faFileLines, faCircleInfo, faHandshakeAngle, faLocationDot, faMugHot} from "@fortawesome/free-solid-svg-icons"
import { HomeButton } from "@/components/HomeButton";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import HomeGridComponent from "@/components/HomeDestinationGrid";

const Home:React.FC = () => {

  return (
    <div>
      <header className="mt-4 ml-5 mr-5 relative overflow-hidden before: content-none min-h-[400px] w-[calc(100% - 2rem)] bg-[url(../assets/chalten.jpg)] bg-center bg-cover rounded-3xl z-10 p-8 md:p-16">
        <div className="grid">
          <div className="pt-16 pr-4">
            <div className="relative flex justify-center">
              <Image src={tudestino} alt="tu destino sin límites" className="absolute top-[-50px] w-3/4 h-auto"/>
            </div>
            <h1 className="relative flex justify-center h-auto top-[-60px] font-arialroundedmtbold text-sivoy-blue">
              Información sobre turismo accesible
            </h1>

            <div className="flex align-middle justify-center mt-24">
              <HomeButton />
            </div>
          </div>
        </div>
      </header>

      <section className="text-left mt-10 ml-5">
        <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">Destinos populares</h2>
        <p className="text-lg text-sivoy-blue mt-1">Descubre los destinos accesibles mejor valorados de Argentina.</p>

        <HomeGridComponent />
      </section>

      <section className="flex text-justify mt-10 ml-5">
        <div className="flex flex-col items-center w-1/2">
          <a href="https://www.linkedin.com/in/ver%C3%B3nica-lorena-martinez-78a303a6/" className="flex flex-col items-center"> 
            <Image src={vero} alt="Foto de perfil de Verónica Martínez" className="rounded-full mb-3 w-100 h-auto" />
            <FontAwesomeIcon icon={faLinkedin} style={{color: "#229764", fontSize: "25px"}} />
          </a>
        </div>
  
        <div className="ml-4 mr-16 w-1/2">
          <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue mt-4">¿Quiénes somos?</h2>
          <p className="text-sivoy-blue mt-1 text-lg">Somos una empresa formada por personas con discapacidad, comprometida con la diversidad, la inclusión y el bienestar de todas las personas. Nos dedicamos a generar un puente entre la oferta y la demanda de servicios turísticos adaptados, trabajando dentro del marco de la responsabilidad social empresarial para lograr un impacto positivo en la sociedad.</p>
          <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue mt-4">Nuestra Misión</h2>
          <p className="text-sivoy-blue mt-1 text-lg"><span className="font-arialroundedmtbold">Sí, voy</span> tiene como misión generar experiencias positivas en las personas con movilidad reducida, por medio de la gestión y promoción del turismo accesible y la transformación de entornos inclusivos, para garantizar el disfrute del ocio con autonomía.</p>
          
        </div>
      </section>
      <section>
  <div className="m-4 font-arialroundedmtbold text-sivoy-blue text-base">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-4">
      <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl">
        <FontAwesomeIcon icon={faCircleInfo} style={{color: "#df5430",}} className="text-2xl mb-2"/>
        <h4 className="text-center">Información sobre destinos accesibles</h4>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl">
        <FontAwesomeIcon icon={faMugHot} style={{color: "#df5430",}} className="text-2xl mb-2"/>
        <h4 className="text-center">Tips / Consejos y artículos de interés</h4>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl">
        <FontAwesomeIcon icon={faHandshakeAngle} style={{color: "#df5430",}} className="text-2xl mb-2"/>
        <h4 className="text-center">Colaboración interactiva de viajeros</h4>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl">
        <FontAwesomeIcon icon={faLocationDot} style={{color: "#df5430",}} className="text-2xl mb-2"/>
        <h4 className="text-center">Georeferenciación y localización de destinos y productos turísticos</h4>
      </div>
    </div>
  </div>
</section>


      <section className="text-left mt-4">
        <div className="ml-5">
          <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">Servicios Adicionales</h2>
          <p className="text-lg text-sivoy-blue mt-1">Todos los servicios pueden realizarse de forma presencial o virtual.</p>
        </div>

        <div className="m-4">
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative isolate m-1">
              <div className="top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl">
                <span className="inline-block mb-4 pt-2 pr-2">
                    <FontAwesomeIcon icon={faWheelchairMove} size="2xl" style={{ color: "#229764" }} />
                </span>
                <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Consultoría en Turismo Accesible</h4>
                <p className="text-sivoy-blue">
                    Consultoría a agencias de viajes y operadores turísticos en la organización y diseño de rutas para personas o grupos con movilidad reducida.
                </p>
              </div>
            </div>

            <div className="relative isolate m-1">
              <div className="top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl">
                <span className="inline-block mb-4 pt-2 pr-2">
                    <FontAwesomeIcon icon={faMapLocationDot} size="2xl" style={{ color: "#229764" }} />
                </span>
                <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Itinerarios Accesibles Personalizados</h4>
                <p className="text-sivoy-blue">
                    Diseño de itinerarios adaptados a cada necesidad en particular con énfasis en el trato personalizado con el viajero.
                </p>
              </div>
            </div>

        <div className="relative isolate m-1">
            <div className="top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl">
                <span className="inline-block mb-4 pt-2 pr-2">
                    <FontAwesomeIcon icon={faGlobe} size="2xl" style={{ color: "#229764" }} />
                </span>
                <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Asesoramiento en Diseño Universal</h4>
                <p className="text-sivoy-blue">
                    Consultoría en accesibilidad universal a hoteles, empresas y proveedores de productos turísticos.
                </p>
            </div>
        </div>

        <div className="relative isolate m-1">
            <div className="top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl">
                <span className="inline-block mb-4 pt-2 pr-2">
                    <FontAwesomeIcon icon={faFileLines} size="2xl" style={{ color: "#229764" }} />
                </span>
                <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Capacitaciones</h4>
                <p className="text-sivoy-blue">
                    Capacitaciones en diseño universal y en trato adecuado a personas con movilidad reducida.
                </p>
            </div>
        </div>
    </div>
        </div>

</section>

    </div>
  )
}

export default Home;