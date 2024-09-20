import Image from "next/image";
import tudestino from "../assets/tudestino.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWheelchairMove, faMapLocationDot, faGlobe, faFileLines} from "@fortawesome/free-solid-svg-icons"

const Home:React.FC = () => {
  return (
    <div>
      <header className="mt-4 ml-5 mr-5 relative overflow-hidden before: content-none min-h-[400px] w-[calc(100% - 2rem)] bg-[url(../assets/chalten.jpg)] bg-center bg-cover rounded-3xl z-10 p-8 md:p-16">
        <div className="grid">
          <div className="pt-16 pr-4">
            <div className="relative flex justify-center">
              <Image src={tudestino} alt="tu destino sin límites" className="absolute top-[-50px] w-3/4 h-auto"/>
            </div>
            <h1 className="relative flex justify-center h-auto  top-[-60px] font-arialroundedmtbold">
              Información sobre turismo accesible
            </h1>

            <a href="/destinations" className="flex align-middle justify-center mt-24">
              <button className="rounded-3xl bg-sivoy-orange py-2 px-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-700 focus:shadow-none active:bg-orange-700 hover:bg-orange-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                Explorar Destinos
              </button>
            </a>
          </div>
        </div>
      </header>

      <section className="text-left mt-10 ml-5">
        <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">Destinos populares</h2>
        <p className="text-lg text-gray-600 mt-1">Descubre los destinos accesibles mejor valorados de Argentina.</p>

        {/* <div className="mt-5">
          <div>
            <p>Acá va el grid de tarjetas</p>
          </div>
        </div> */}
      </section>

      <section className="text-left mt-10 ml-5">
        <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">¿Quiénes somos?</h2>
      </section>

      <section className="text-left mt-10 ml-5">
        <h2 className="font-arialroundedmtbold text-2xl text-sivoy-blue">Servicios Adicionales</h2>
        <p className="text-lg text-gray-600 mt-1">Todos los servicios pueden realizarse de forma presencial o virtual.</p>
        

        <div className='-ml-4 mb-8 grid grid-cols-[repeat(2,_1fr)]'>
            
            <div className='relative isolate m-4'>
                <div className='top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl'>
                    <span className='inline-block mb-4 pt-2 pr-2'><FontAwesomeIcon icon={faWheelchairMove} size="2xl" style={{color: "#229764",}} /></span>
                    <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Consultoría en Turismo Accesible</h4>
                    <p className='text-sivoy-blue'>Consultoría a agencias de viajes y operadores turísticos en la organización y diseño de rutas para personas o grupos con movilidad reducida.</p>
                </div>
            </div>

            <div className='relative isolate m-4'>
                <div className='top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl'>
                    <span className='inline-block mb-4 pt-2 pr-2'><FontAwesomeIcon icon={faMapLocationDot} size="2xl" style={{color: "#229764",}} /></span>
                    <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Itinerarios Accesibles Personalizados</h4>
                    <p className='text-sivoy-blue'>Diseño de itinerarios adaptados a cada necesidad en particular con énfasis en el trato personalizado con el viajero.</p>
                </div>
            </div>

            <div className='relative isolate m-4'>
                <div className='top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl'>
                    <span className='inline-block mb-4 pt-2 pr-2'><FontAwesomeIcon icon={faGlobe} size="2xl" style={{color: "#229764",}} /></span>
                    <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Asesoramiento en Diseño Universal</h4>
                    <p className='text-sivoy-blue'>Consultoría en accesibilidad universal a hoteles, empresas y proveedores de productos turísticos.</p>
                </div>
            </div>

            <div className='relative isolate m-4'>
                <div className='top-full left-0 w-full h-full p-8 bg-gray-100 rounded-2xl'>
                    <span className='inline-block mb-4 pt-2 pr-2'><FontAwesomeIcon icon={faFileLines} size="2xl" style={{color: "#229764",}} /></span>
                    <h4 className="mb-4 text-lg font-arialroundedmtbold text-sivoy-blue">Capacitaciones</h4>
                    <p className='text-sivoy-blue'>Capacitaciones en diseño universal y en trato adecuado a personas con movilidad reducida.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Home;