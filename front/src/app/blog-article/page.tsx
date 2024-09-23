import Image from "next/image"

const BlogArticle = () => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Image
          src="http://admin.sivoy.com.ar/Images/Noticias/3095/cabecera/3095517202441849PM.png"
          alt="Imagen del artículo"
          width={800}
          height={400}
          className="rounded-lg shadow-md"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 font-arialroundedmtbold">
        En busca de dinosaurios en territorios cuyanos
      </h1>
      <div className="prose prose-lg">
        <p>Por la zona oeste del territorio argentino, conocida el Cuyo, se encuentran emplazados dos parques naturales icónicos del país: Parque Provincial Ischigualasto y Parque Nacional Talampaya. El primero está emplazado en la provincia de San Juan, mientras que el segundo está ubicado en La Rioja. Aunque están separados por los límites geográficos, ambos parques en conjunto son uno de los patrimonios de la humanidad, gracias a su riqueza arqueológica y a la conservación y estudio de restos fósiles. Visitar ambos parques es una experiencia única que vale la pena realizar.</p>
        
        <p className="mt-6">Es fundamental estar informado sobre la accesibilidad de ambos parques para disfrutar plenamente de la experiencia. Comenzaremos con el Parque Provincial Ischigualasto. Al ingresar al parque, encontrarás un estacionamiento con espacios designados para estacionar de manera cómoda. Además, cuenta con rampas de acceso tanto en la entrada como en el interior del recinto, así como con baños accesibles. Dentro del parque, hay una variedad de actividades para realizar, una confitería y un centro de artesanías. Sin embargo, el punto destacado es el Centro de Interpretación de la Universidad Nacional de San Juan, donde se puede aprender sobre el valor científico de Ischigualasto y observar la línea de tiempo desde la era triásica hasta la actualidad. La exposición incluye códigos QR para acceder a más información y vídeos subtitulados en español sobre los dinosaurios encontrados en la zona.</p>
        
        <p className="mt-6">La verdadera experiencia de explorar el parque comienza cuando te unes a uno de los guías oficiales para realizar el recorrido en caravana de autos. Esto te permite viajar cómodamente en tu propio vehículo y disfrutar de diversas paradas para apreciar los paisajes únicos que ofrece el parque. Cada parada cuenta con miradores panorámicos, y en algunos casos, también con caminos accesibles. Es importante tener en cuenta que para acceder a estos miradores y caminos, puede ser necesario sortear terrenos irregulares, por lo que se recomienda contar con la asistencia de un acompañante o tener en cuenta esta condición. Durante el recorrido, se visita el Museo de Sitio William Sill, dedicado al primer investigador paleontólogo que fue fundamental en la creación del Parque Provincial Ischigualasto y en su reconocimiento como Patrimonio Mundial de la Humanidad. Aquí, los visitantes pueden observar fósiles reales y ver de cerca cómo se trabaja con ellos.</p>
        
        <p className="mt-6">Existe un recorrido especial que se realiza durante las noches de luna llena, con cupos limitados y disponible solo 4 veces al mes. Se recomienda verificar la disponibilidad con anticipación antes de planificar la visita. </p>
        
        <p className="mt-6">Al día siguiente, se visita al segundo parque, el Talampaya con su imponente paisaje rojizo. El predio cuenta con módulos de estacionamiento para personas con discapacidad, rampas y baños accesibles. A su vez hay un sendero del triásico que invita a todos los visitantes a descubrir los dinosaurios que han vivido por la zona. Se aclara que este circuito está emplazado en camino de tierra, por lo que se recomiendo tener un acompañante durante su recorrido. Luego la experiencia principal es llevada a cabo por la empresa Volterra que ofrece tres tipos de excursiones. La más básica te permite conocer los principales puntos del parque nacional donde cada uno posee su mirador panorámico, entre ellos algunos poseen un camino de madera para facilitar la visitar. Sin embargo, se vuelve a recomendar el acompañamiento para evitar complicaciones durante la visita.</p>
        
        <p className="mt-6">Argentina es un mundo en sí mismo que invita a turistas nacionales e internacionales a descubrir cada uno de los paisajes, y estos patrimonios de la humanidad no son la excepción. Merecen ser visitados al menos una vez en la vida. Por lo tanto, la próxima vez que viajes por esta zona, no te pierdas la oportunidad de realizar alguna de estas actividades. Podes visitar la sección de destinos de SÍ, VOY y ver los podcasts de Turismo Accesible en Argentina Accesible en Youtube para descubrir todos los prestadores que ofrecen accesibilidad en cada uno de los destinos del territorio argentino. ¡Son una verdadera guía de viaje!</p>
      </div>
    </article>
  )
}

export default BlogArticle;