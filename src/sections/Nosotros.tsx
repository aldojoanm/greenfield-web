import { motion } from 'framer-motion'
import '../styles/Nosotros.css'

export default function Nosotros() {
  return (
    <section id="nosotros" className="nosotros">
      <motion.div
        className="nosotros-block white-bg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Visión</h2>
        <p>
          Ser el <strong>ALIADO IDEAL</strong> en la difusión de los mensajes publicitarios de nuestros clientes, apoyando el logro de sus objetivos de comunicación con creatividad, efectividad y compromiso.
        </p>
      </motion.div>

      <motion.div
        className="nosotros-block green-bg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="section-title">Misión</h2>
        <p>
          Ayudar a empresas e instituciones a comunicar sus valores, servicios y productos de manera efectiva a través de soluciones integrales de publicidad, diseño y tecnología.
        </p>
      </motion.div>
    </section>
  )
}
