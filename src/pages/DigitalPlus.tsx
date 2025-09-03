import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import cameraLottie from '@assets/Lottie/Web.json'
import './DigitalPlus.css'

const projects = [
  {
    url: 'https://www.auswandern.es/',
    preview: 'https://api.microlink.io/?url=https://www.auswandern.es/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'Auswandern',
    description: 'Sitio web de emigración con recursos y guías.'
  },
  {
    url: 'https://arsbolivia.com/',
    preview: 'https://api.microlink.io/?url=https://arsbolivia.com/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'ARS Bolivia',
    description: 'Compañía de servicios ambientales en Bolivia.'
  },
  {
    url: 'https://interagro.com.bo/',
    preview: 'https://api.microlink.io/?url=https://interagro.com.bo/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'Interagro',
    description: 'Empresa agroindustrial boliviana con soluciones innovadoras.'
  },
  {
    url: 'https://vidafamiliarbolivia.com/',
    preview: 'https://api.microlink.io/?url=https://vidafamiliarbolivia.com/&screenshot=true&meta=false&embed=screenshot.url',
    title: 'Vida Familiar Bolivia',
    description: 'Plataforma de apoyo y recursos para familias.'
  }
]

export default function DigitalPlus() {
  return (
    <div className="digitalplus-container">
      <section className="hero">
        <div className="hero-text">
          <motion.h1
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glow-title"
          >
            {'DIGITAL PLUS'.split('').map((char, i) => (
              <span key={i} className={`glow-letter${char === ' ' ? ' glow-space' : ''}`}>
                {char}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hover-glow"
          >
            Creamos experiencias digitales únicas para impulsar tu marca, combinando tecnología, diseño y creatividad.
          </motion.p>
        </div>

        <motion.div
          className="hero-lottie"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Lottie animationData={cameraLottie} loop={true} style={{ width: '50rem', height: '50rem' }} />
        </motion.div>
      </section>

      <section className="projects">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="projects-title"
        >
          <span className="projects-underline">Proy</span>ectos
        </motion.h2>

        {projects.map(({ url, preview, title, description }, i) => (
          <motion.a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
          >
            <div className="project-preview">
              <img src={preview} alt={title} onError={(e) => (e.currentTarget.src = '/fallback.png')} />
            </div>
            <div className="project-description">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </motion.a>
        ))}
      </section>
    </div>
  )
}
