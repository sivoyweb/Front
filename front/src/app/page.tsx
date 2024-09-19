import Image from "next/image";
import tudestino from "../assets/tudestino.png"

const Home:React.FC = () => {
  return (
    <div>
      <header className="mt-56 mr-10 relative overflow-hidden before: content-none min-h-[400px] w-[calc(100% - 2rem)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[url(../assets/chalten.jpg)] bg-center bg-cover rounded-3xl z-10 p-8 md:p-16">
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

      <section>
        <h2>Destinos populares</h2>
        <p>Descubre los destinos accesibles mejor valorados de Argentina</p>

        <div>
          <div>
            <p>Acá van las tarjetas de cada destino</p>
          </div>
        </div>
      </section>

      <section>
        <h2>¿Quienes somos?</h2>
      </section>

      <section>
        <h2>Servicios</h2>
      </section>


    </div>
  )
}

export default Home;