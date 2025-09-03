import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import './Productos.css'

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

  const firstSpaceIndex = text.indexOf(' ')
  const firstWordDisplayed = displayed.slice(0, firstSpaceIndex)
  const restDisplayed = displayed.slice(firstSpaceIndex)

  return (
    <h2 className="productos-title" id="productos-title">
      <span className="verde">{firstWordDisplayed}</span>
      <span className="blanco">{restDisplayed}</span>
      <span
        className="cursor"
        style={{ opacity: inView && displayed.length < text.length ? 1 : 0 }}
      />
    </h2>
  )
}

export default function Productos() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
    rootMargin: '0px 0px -10% 0px',
  })

  const navigate = useNavigate()

  const cardVariants = {
    initial: { opacity: 0, y: 60, scale: 1 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.05, rotate: -0.3, transition: { duration: 0.3 } },
    tap: { scale: 0.97, transition: { duration: 0.1 } },
  }

  return (
    <section className="productos-container" id="productos">
      {/* Parallax Fondo SVG */}
      <div className="productos-parallax-bg" />

      {/* Decorativos SVG flotantes */}
      <div className="productos-decorativo-1" />
      <div className="productos-decorativo-2" />

      <div ref={ref} className="productos-header">
        <TypeWriter text="Nuestros PRODUCTOS" inView={inView} />
        <motion.p
          className="productos-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Conoce las soluciones creativas y efectivas que ofrecemos.
        </motion.p>
      </div>

      <motion.div
        className="productos-cards"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <AnimatePresence>
          {inView && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.article
                  key={i}
                  className="producto-card"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ delay: 0.4 + i * 0.4 }}
                >
                  <div className="producto-imagen">
                    <img src={`/images/${['Tractor', 'app', 'Imprenta'][i]}.jpg`} alt="Producto" />
                  </div>
                  <h3>{['EcoRural Multimedia', 'Digital Plus', 'MegaPrint'][i]}</h3>
                  <p>{
                    [
                      'Revista y programa informativo para el sector agropecuario en formato impreso y digital.',
                      'Creación de aplicaciones, páginas web y contenido audiovisual especial para redes sociales.',
                      'Elaboración de material publicitario en todo tipo de soporte: stands, vallas, revistas, folletos y más.'
                    ][i]
                  }</p>
                  <button
                    className="producto-button"
                    onClick={() => navigate(['ecorural', 'digitalplus', 'megaprint'][i])}
                  >
                    Ver más
                  </button>
                </motion.article>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
