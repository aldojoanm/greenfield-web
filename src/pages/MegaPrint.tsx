import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'fullpage.js/dist/fullpage.min.css';
import './Merchandising.css';
import fullpage from 'fullpage.js';

export default function Merchandising() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const materialItems = [
    {
      title: 'Diseño de Stands',
      description: 'Estructuras personalizadas para exhibiciones memorables.',
      image: '/megaprint/stand.png',
    },
    {
      title: 'Vallas Publicitarias',
      description: 'Publicidad exterior con gran impacto visual.',
      image: '/megaprint/valla.png',
    },
    {
      title: 'Catálogos Empresariales',
      description: 'Muestras elegantes y organizadas de tus productos o servicios.',
      image: '/megaprint/catalogo.png',
    },
    {
      title: 'Revistas y Folletos',
      description: 'Material editorial atractivo y profesional.',
      image: '/megaprint/revista.png',
    },
  ];

  const merchItems = [
    {
      main: { src: '/megaprint/polera.png', alt: 'Polera' },
      examples: [
        { src: '/megaprint/polera.png', alt: 'Polera ejemplo 1' },
        { src: '/megaprint/polera.png', alt: 'Polera ejemplo 2' },
      ],
    },
    {
      main: { src: '/megaprint/gorra.png', alt: 'Gorra' },
      examples: [
        { src: '/megaprint/gorra.png', alt: 'Gorra ejemplo 1' },
        { src: '/megaprint/gorra.png', alt: 'Gorra ejemplo 2' },
      ],
    },
    {
      main: { src: '/megaprint/llavero.png', alt: 'Llavero' },
      examples: [
        { src: '/megaprint/llavero.png', alt: 'Llavero ejemplo 1' },
        { src: '/megaprint/llavero.png', alt: 'Llavero ejemplo 2' },
      ],
    },
    {
      main: { src: '/megaprint/lapicero.png', alt: 'Lapicero' },
      examples: [
        { src: '/megaprint/lapicero.png', alt: 'Lapicero ejemplo 1' },
        { src: '/megaprint/lapicero.png', alt: 'Lapicero ejemplo 2' },
      ],
    },
  ];

  // ✅ Inicializar fullpage.js y destruirlo al desmontar
  useEffect(() => {
    const instance = new fullpage('#fullpage', {
      autoScrolling: true,
      navigation: true,
      anchors: ['material', 'merchandising', 'adhesivos'],
      navigationTooltips: ['Material Publicitario', 'Merchandising', 'Rotulados'],
      showActiveTooltip: true,
      scrollingSpeed: 1000,
      licenseKey: 'gplv3-license',
      afterRender: () => {
        document.querySelectorAll('.section').forEach((el) => {
          (el as HTMLElement).style.height = '100vh';
        });
      },
    });

    return () => {
      instance.destroy('all'); // ✅ Muy importante para no romper otras páginas
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % materialItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [materialItems.length]);

  return (
    <div id="fullpage">
      {/* MATERIAL PUBLICITARIO */}
      <section className="section section-material">
        <div className="material-content">
          <div className="material-text">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              MATERIAL PUBLICITARIO
            </motion.h2>
            <motion.p
              className="section-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Creamos piezas visuales estratégicas y memorables que refuerzan la identidad y visibilidad de tu marca a través de distintos formatos impresos de alta calidad.
            </motion.p>
          </div>

          <div className="material-carousel">
            {materialItems.map((item, i) => (
              <motion.div
                key={i}
                className={`carousel-item ${i === carouselIndex ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: i === carouselIndex ? 1 : 0, scale: i === carouselIndex ? 1 : 0.95 }}
                transition={{ duration: 0.6 }}
              >
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MERCHANDISING */}
      <section className="section section-merch">
        <motion.h2
          className="section-title dark"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          MERCHANDISING
        </motion.h2>
        <motion.p
          className="section-text dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Objetos que comunican y permanecen en la mente de tus clientes. Cada pieza es una oportunidad para reforzar tu marca.
        </motion.p>

        <div className="merch-grid">
          {merchItems.map((item, i) => (
            <div
              key={i}
              className={`merch-item-wrapper ${openedIndex === i ? 'opened' : ''}`}
              onMouseEnter={() => setOpenedIndex(i)}
              onMouseLeave={() => setOpenedIndex(null)}
            >
              <motion.img
                src={item.main.src}
                alt={item.main.alt}
                className="item main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                draggable={false}
              />
              {openedIndex === i &&
                item.examples.map((ex, exIdx) => (
                  <motion.img
                    key={exIdx}
                    src={ex.src}
                    alt={ex.alt}
                    className={`item example example-${exIdx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 * exIdx }}
                    draggable={false}
                  />
                ))}
            </div>
          ))}
        </div>
      </section>

      {/* ROTULADOS VEHICULARES */}
      <section className="section section-vehicular">
        <div className="vehicular-wrapper">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            ROTULADOS VEHICULARES
          </motion.h2>
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Convertimos tus vehículos en publicidad móvil de alto impacto, con diseños únicos y personalizados para cada ángulo.
          </motion.p>

          <motion.img
            src="/megaprint/lateral.png"
            alt="Lateral Camioneta"
            className="vehiculo lateral-central"
            initial={{ opacity: 0, scale: 0.7, x: 200 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            draggable={false}
          />

          <motion.img
            src="/megaprint/frontal.png"
            alt="Frontal"
            className="vehiculo frontal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            draggable={false}
          />

          <motion.img
            src="/megaprint/trasera.png"
            alt="Trasera"
            className="vehiculo trasera"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            draggable={false}
          />
        </div>
      </section>
    </div>
  );
}
