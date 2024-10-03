import Image from "next/image";
import tudestino from "../assets/tudestino.png"
import vero from "../assets/vero.png"
import linkedin from "@/assets/linkedin.png"
import { DonationButton, HomeButton } from "@/components/Buttons";
import HomeGridComponent from "@/components/HomeDestinationGrid";
import { HomeServicesGrid } from "@/components/HomeServicesGrid";
import { AlliancesGrid } from "@/components/AlliancesGrid";

const Home: React.FC = () => {
  return (
    <div className="">
      <header className="mt-4 ml-5 mr-5 relative before:content-none min-h-[400px] w-[calc(100% - 2rem)] bg-[url(../assets/chalten.jpg)] bg-center bg-cover bg-opacity-50 rounded-3xl z-10 p-8 md:p-16 4k:min-h-[800px] 4k:p-24">
        <div className="grid">
          <div className="pt-16 pr-4">
            <div className="relative flex justify-center">
              <Image src={tudestino} alt="tu destino sin límites" className="absolute top-[-90px] w-3/4 h-auto max-sm:top-[-20px] 4k:top-[-70px] 4k:w-1/2"/>
            </div>
            <h1 className="relative flex justify-center h-auto top-[-90px] font-arialroundedmtbold text-sivoy-blue max-sm:text-sm 4k:top-[-100px] 4k:text-4xl">
              Información sobre turismo accesible
            </h1>

            <div className="flex align-middle justify-center mt-24 4k:mt-48">
              <HomeButton />
              <DonationButton />
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

      <section className="flex flex-col md:flex-row text-justify -mt-6 mr-9 md:mr-8 lg:mt-2 4k:ml-20 4k:mr-20 4k:mt-8">
        <div className="flex flex-col items-center ml-6 mt-4">
          <a href="https://www.linkedin.com/in/ver%C3%B3nica-lorena-martinez-78a303a6/" className="flex flex-col items-center border shadow-md rounded-3xl mt-6 hover:scale-105 duration-300 transition-transform w-72 4k:w-[400px]">
            <Image src={vero} alt="Foto de perfil de Verónica Martínez" className="rounded-full w-52 h-auto 4k:w-72" />
            <p className="font-arialroundedmtbold text-sivoy-blue text-center mt-2 4k:text-3xl">Verónica Martínez</p>
            <p className="text-sivoy-blue text-center 4k:text-2xl">Directora</p>
            <Image src={linkedin} alt="logo linkedin" className="w-28 4k:w-40" />
          </a>
        </div>

        <div className="mt-6 ml-4 md:ml-16 w-full xl:w1/2 4k:w-3/5">
  <h2 className="font-arialroundedmtbold text-xl md:text-2xl text-sivoy-blue 4k:text-4xl">¿Quiénes somos?</h2>
  <p className="text-sivoy-blue mt-2 text-base md:text-lg 4k:text-2xl">
    Somos una empresa formada por personas con discapacidad, comprometida con la diversidad, la inclusión y el bienestar de todas las personas. Nos dedicamos a generar un puente entre la oferta y la demanda de servicios turísticos adaptados, trabajando dentro del marco de la responsabilidad social empresarial para lograr un impacto positivo en la sociedad.
  </p>

  <h2 className="font-arialroundedmtbold text-xl md:text-2xl text-sivoy-blue mt-10 4k:text-4xl">Misión y Visión</h2>
  <p className="text-sivoy-blue mt-2 text-base md:text-lg 4k:text-2xl">
    <span className="font-arialroundedmtbold">Sí, voy</span> tiene como misión generar experiencias positivas en las personas con movilidad reducida, por medio de la gestión y promoción del turismo accesible y la transformación de entornos inclusivos, para garantizar el disfrute del ocio con autonomía. Nuestra visión es convertirnos en la plataforma líder en turismo accesible en América Latina, promoviendo una cultura inclusiva y garantizando que todos tengan acceso a experiencias turísticas enriquecedoras.
    </p>
</div>

      </section>

      <section>
        <div className="mb-4 mt-4 font-arialroundedmtbold text-sivoy-blue text-sm 4k:m-8 4k:text-3xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl 4k:p-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="41" height="41" viewBox="0 0 24 24" stroke-width="1.5" stroke="#df5430" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
  <path d="M12 9h.01" />
  <path d="M11 12h1v4h1" />
</svg>
              <h4 className="text-center">Información sobre destinos accesibles</h4>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl 4k:p-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-coffee" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#df5430" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
            <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
            <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
            <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
            <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
            </svg>
              <h4 className="text-center">Tips / Consejos y artículos de interés</h4>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl 4k:p-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-handshake" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#df5430" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25" />
  <path d="M12.5 15.5l2 2" />
  <path d="M15 13l2 2" />
</svg>
              <h4 className="text-center">Colaboración interactiva de viajeros</h4>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 lg:p-8 rounded-2xl 4k:p-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#df5430" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7" />
  <path d="M9 4v13" />
  <path d="M15 7v5" />
  <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
  <path d="M19 18v.01" />
</svg>
              <h4 className="text-center">Georeferenciación y localización de destinos y productos turísticos</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="text-left mt-4 4k:mt-8">
        <HomeServicesGrid />
      </section>

      <section>
        <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue ml-4 mb-4 4k:text-5xl 4k:ml-8 xl:ml-5">Nuestras alianzas</h2>
        <AlliancesGrid />
      </section>
    </div>
  );
};


export default Home;