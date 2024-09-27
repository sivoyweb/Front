import Image from "next/image";
import tudestino from "../assets/tudestino.png"
import vero from "../assets/vero.png"
import linkedin from "@/assets/linkedin.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faHandshakeAngle, faLocationDot, faMugHot } from "@fortawesome/free-solid-svg-icons"
import { HomeButton } from "@/components/Buttons";
import HomeGridComponent from "@/components/HomeDestinationGrid";
import { HomeServicesGrid } from "@/components/HomeServicesGrid";
import { AlliancesGrid } from "@/components/AlliancesGrid";

const Home: React.FC = () => {
  return (
    <div className="">
      <header className="mt-4 ml-5 mr-5 relative overflow-hidden before:content-none min-h-[400px] w-[calc(100% - 2rem)] bg-[url(../assets/chalten.jpg)] bg-center bg-cover rounded-3xl z-10 p-8 md:p-16 4k:min-h-[800px] 4k:p-24">
        <div className="grid">
          <div className="pt-16 pr-4">
            <div className="relative flex justify-center">
              <Image src={tudestino} alt="tu destino sin límites" className="absolute top-[-50px] w-3/4 h-auto max-sm:top-[-20px] 4k:top-[-70px] 4k:w-1/2" />
            </div>
            <h1 className="relative flex justify-center h-auto top-[-60px] font-arialroundedmtbold text-sivoy-blue max-sm:text-sm 4k:top-[-110px] 4k:text-4xl">
              Información sobre turismo accesible
            </h1>

            <div className="flex align-middle justify-center mt-24 4k:mt-48">
              <HomeButton />
            </div>
          </div>
        </div>
      </header>

      <section className="text-left mt-10 ml-5 4k:ml-20">
        <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue 4k:text-5xl">Destinos populares</h2>
        <p className="text-lg text-sivoy-blue mt-1 4k:text-3xl">
          Descubre los destinos accesibles mejor valorados de Argentina.
        </p>
        <HomeGridComponent />
      </section>

      <section className="flex flex-col lg:flex-row text-justify mt-2 ml-5 mr-5 lg:mr-0 4k:ml-20 4k:mr-20 4k:mt-8">
        <div className="flex flex-col items-center lg:ml-36 2xl:ml-56 4k:ml-40">
          <a href="https://www.linkedin.com/in/ver%C3%B3nica-lorena-martinez-78a303a6/" className="flex flex-col items-center border shadow-md rounded-3xl mt-6 hover:scale-105 duration-300 transition-transform w-72 4k:w-[400px]">
            <Image src={vero} alt="Foto de perfil de Verónica Martínez" className="rounded-full w-52 h-auto 4k:w-72" />
            <p className="font-arialroundedmtbold text-sivoy-blue text-center mt-2 4k:text-3xl">Verónica Martínez</p>
            <p className="text-sivoy-blue text-center 4k:text-2xl">Directora</p>
            <Image src={linkedin} alt="logo linkedin" className="w-28 4k:w-40" />
          </a>
        </div>

        <div className="mt-6 lg:ml-32 w-full lg:w-1/2 2xl:ml-80 4k:w-3/5">
          <h2 className="font-arialroundedmtbold text-xl md:text-2xl text-sivoy-blue 4k:text-4xl">¿Quiénes somos?</h2>
          <p className="text-sivoy-blue mt-2 text-base md:text-lg 4k:text-2xl">
            Somos una empresa formada por personas con discapacidad, comprometida con la diversidad, la inclusión y el bienestar de todas las personas. Nos dedicamos a generar un puente entre la oferta y la demanda de servicios turísticos adaptados, trabajando dentro del marco de la responsabilidad social empresarial para lograr un impacto positivo en la sociedad.
          </p>

          <h2 className="font-arialroundedmtbold text-xl md:text-2xl text-sivoy-blue mt-10 4k:text-4xl">Nuestra Misión</h2>
          <p className="text-sivoy-blue mt-2 text-base md:text-lg 4k:text-2xl">
            <span className="font-arialroundedmtbold">Sí, voy</span> tiene como misión generar experiencias positivas en las personas con movilidad reducida, por medio de la gestión y promoción del turismo accesible y la transformación de entornos inclusivos, para garantizar el disfrute del ocio con autonomía.
          </p>
        </div>
      </section>

      <section>
        <div className="m-4 font-arialroundedmtbold text-sivoy-blue text-sm 4k:m-8 4k:text-3xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl 4k:p-12">
              <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#df5430" }} className="text-2xl mb-2 4k:text-5xl" />
              <h4 className="text-center">Información sobre destinos accesibles</h4>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl 4k:p-12">
              <FontAwesomeIcon icon={faMugHot} style={{ color: "#df5430" }} className="text-2xl mb-2 4k:text-5xl" />
              <h4 className="text-center">Tips / Consejos y artículos de interés</h4>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl 4k:p-12">
              <FontAwesomeIcon icon={faHandshakeAngle} style={{ color: "#df5430" }} className="text-2xl mb-2 4k:text-5xl" />
              <h4 className="text-center">Colaboración interactiva de viajeros</h4>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl 4k:p-12">
              <FontAwesomeIcon icon={faLocationDot} style={{ color: "#df5430" }} className="text-2xl mb-2 4k:text-5xl" />
              <h4 className="text-center">Georeferenciación y localización de destinos y productos turísticos</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="text-left mt-4 4k:mt-8">
        <HomeServicesGrid />
      </section>

      <section>
        <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue ml-4 mb-4 4k:text-5xl 4k:ml-8">Nuestras alianzas</h2>
        <AlliancesGrid />
      </section>
    </div>
  );
};


export default Home;