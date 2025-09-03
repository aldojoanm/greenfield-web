import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMicrophoneAlt, FaUsers, FaBullhorn, FaCalendarAlt,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import './Eventos.css';

const eventosData = [
  {
    icono: <FaMicrophoneAlt size={48} color="#a2ce39" />,
    titulo: 'Conferencias',
    descripcion: 'Organizamos conferencias profesionales para potenciar el conocimiento y networking.',
    media: 'https://drive.google.com/file/d/1YRAucRgM1YXdSs1lMt-TFzr4RjWz_wj/preview',
  },
  {
    icono: <FaUsers size={48} color="#a2ce39" />,
    titulo: 'Seminarios y Simposios',
    descripcion: 'Eventos académicos y profesionales con expertos y líderes de la industria.',
    media: 'https://drive.google.com/file/d/1YRAucRgM1YXdSs1lMt-TFzr4RjWz_wj/preview',
  },
  {
    icono: <FaBullhorn size={48} color="#a2ce39" />,
    titulo: 'Ferias',
    descripcion: 'Exhibiciones comerciales para presentar productos y servicios a gran escala.',
    media: 'https://drive.google.com/file/d/1YRAucRgM1YXdSs1lMt-TFzr4RjWz_wj/preview',
  },
  {
    icono: <FaCalendarAlt size={48} color="#a2ce39" />,
    titulo: 'Presentaciones de Productos',
    descripcion: 'Lanzamientos impactantes y profesionales para nuevas propuestas de mercado.',
    media: 'https://drive.google.com/file/d/1YRAucRgM1YXdSs1lMt-TFzr4RjWz_wj/preview',
  },
];

// Easing para animación
const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: easeInOut },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.4, ease: easeInOut },
  }),
};

export default function Eventos() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const eventCount = eventosData.length;

  const paginate = (newDirection: number) => {
    setPage(([currentPage]) => {
      let newPage = currentPage + newDirection;
      if (newPage < 0) newPage = 0;
      if (newPage >= eventCount) newPage = eventCount - 1;
      return [newPage, newDirection];
    });
  };

  const goToPage = (pageNumber: number) => {
    setPage(([currentPage]) => {
      if (pageNumber === currentPage) return [currentPage, 0];
      return [pageNumber, pageNumber > currentPage ? 1 : -1];
    });
  };

  // Auto paginación cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setPage(([currentPage]) => {
        const nextPage = currentPage + 1 >= eventCount ? 0 : currentPage + 1;
        return [nextPage, 1];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [eventCount]);

  // Función para abrir media en nueva pestaña
  const abrirLink = (url: string) => {
    window.open(url.replace('/preview', ''), '_blank');
  };

  return (
    <section id="eventos" className="eventos-container">
      <div className="eventos-content">
        <div className="eventos-texto">
          <h2 className="eventos-title">Transformamos tus ideas en experiencias</h2>
          <p className="eventos-subtitulo">
            {'\u0009'}Somos expertos en crear momentos memorables para tu marca. Desde lanzamientos hasta
            conferencias, organizamos <strong>eventos profesionales</strong><br /> que inspiran e impactan.
          </p>
        </div>

        <div className="carousel-wrapper">
          <button
            className="carousel-btn left"
            onClick={() => paginate(-1)}
            aria-label="Mover izquierda"
            disabled={page === 0}
          >
            <FaChevronLeft size={28} />
          </button>

          <div className="carousel-inner">
            <div className="eventos-lista" style={{ position: 'relative', width: 420, height: 520 }}>
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bloque-evento"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
                >
                  <div className="icono-evento">{eventosData[page].icono}</div>
                  <div className="contenido-evento">
                    <h3>{eventosData[page].titulo}</h3>
                    <p>{eventosData[page].descripcion}</p>
                  </div>
                  <div
                    className="media-container"
                    onClick={() => abrirLink(eventosData[page].media)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') abrirLink(eventosData[page].media);
                    }}
                    aria-label={`Abrir media de ${eventosData[page].titulo}`}
                    title="Abrir enlace"
                  >
                    {/* Mostrar iframe embebido de Drive como preview */}
                    <iframe
                      src={eventosData[page].media}
                      width="380"
                      height="200"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={`Media ${eventosData[page].titulo}`}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pagination-dots">
              {eventosData.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === page ? 'active' : ''}`}
                  onClick={() => goToPage(i)}
                  aria-label={`Ir a la página ${i + 1}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') goToPage(i);
                  }}
                />
              ))}
            </div>
          </div>

          <button
            className="carousel-btn right"
            onClick={() => paginate(1)}
            aria-label="Mover derecha"
            disabled={page === eventCount - 1}
          >
            <FaChevronRight size={28} />
          </button>
        </div>
      </div>
    </section>
  );
}
