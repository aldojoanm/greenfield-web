import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  FaVideo,
  FaMicrophoneAlt,
  FaPodcast,
  FaBullhorn,
  FaLightbulb,
} from 'react-icons/fa'
import './Servicios.css'

const serviciosDetallados = [
  {
    icono: <FaVideo size={48} />,
    titulo: 'Videos Corporativos',
    descripcion: 'Creamos videos institucionales que transmiten los valores de tu empresa.',
    media: 'https://drive.google.com/file/d/1YRAucRgM1YXdSs1lMt-TFzr4RjWz_wj/preview',
  },
  {
    icono: <FaMicrophoneAlt size={48} />,
    titulo: 'Reportajes Audiovisuales',
    descripcion: 'Historias contadas visualmente para conectar con tu audiencia.',
    media: 'https://drive.google.com/file/d/1REPOR_AUDIO/preview',
  },
  {
    icono: <FaBullhorn size={48} />,
    titulo: 'Jingles de Radio',
    descripcion: 'Composiciones sonoras que posicionan tu marca en segundos.',
    media: 'https://drive.google.com/file/d/1JINGLE_RADIO/preview',
  },
  {
    icono: <FaPodcast size={48} />,
    titulo: 'Producción de Podcast',
    descripcion: 'Dale voz a tu marca con contenido auténtico y profesional.',
    media: 'https://drive.google.com/file/d/1PODCAST_AUDIO/preview',
  },
  {
    icono: <FaVideo size={48} />,
    titulo: 'Videos Publicitarios',
    descripcion: 'Creamos contenido dinámico para captar la atención en redes.',
    media: 'https://drive.google.com/file/d/1VIDEO_PUBLICITARIO/preview',
  },
  {
    icono: <FaLightbulb size={48} />,
    titulo: 'Diseño Gráfico',
    descripcion: 'Diseños visuales impactantes para redes y medios impresos.',
    media: 'https://drive.google.com/file/d/1DISENO_GRAFICO/preview',
  },
]

function TypeWriter({ text, inView }: { text: string; inView: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView || done) {
      if (!inView) {
        setDisplayed('')
        setDone(false)
      }
      return
    }

    let currentIndex = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, currentIndex + 1))
      currentIndex++
      if (currentIndex === text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 75)

    return () => clearInterval(interval)
  }, [inView, text, done])

  const firstSpaceIndex = displayed.indexOf(' ')
  const firstWordDisplayed = firstSpaceIndex === -1 ? displayed : displayed.slice(0, firstSpaceIndex)
  const restDisplayed = firstSpaceIndex === -1 ? '' : displayed.slice(firstSpaceIndex)

  return (
    <h2 className="servicios-title">
      <span className="verde">{firstWordDisplayed}</span>
      <span className="blanco">{restDisplayed}</span>
      <span className="cursor" style={{ opacity: inView && displayed.length < text.length ? 1 : 0 }} />
    </h2>
  )
}

export default function Servicios() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.9 })
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({ 
    target: scrollRef,
    offset: ["start start", "end end"]
  })

  const totalWidth = serviciosDetallados.length * 520
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const maxTranslate = Math.max(0, totalWidth - containerWidth + 100)

  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]),
    { stiffness: 100, damping: 30 }
  )

  return (
    <div className="servicios-wrapper">
      <section className="servicios-titulo">
        <div ref={ref}>
          <TypeWriter text="Nuestros SERVICIOS" inView={inView} />
        </div>
      </section>

      <section className="scroll-section" ref={scrollRef}>
        <div className="scroll-content">
          <motion.div className="grid-servicios" style={{ x }}>
            {serviciosDetallados.map((servicio, index) => (
              <BloqueAnimado key={index} {...servicio} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function BloqueAnimado({ icono, titulo, descripcion, media }: any) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  return (
    <motion.div
      ref={ref}
      className="bloque-servicio"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="icono-servicio"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1, rotate: 360 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {icono}
      </motion.div>
      <motion.div
        className="contenido-servicio"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </motion.div>
      <motion.div
        className="media-servicio"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
      >
        <iframe
          src={media}
          allow="autoplay"
          loading="lazy"
          frameBorder="0"
          allowFullScreen
          title={titulo}
        />
      </motion.div>
    </motion.div>
  )
}
