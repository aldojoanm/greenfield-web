import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Lottie from 'lottie-react'
import cameraLottie from '@assets/Lottie/Camera.json'
import './Vision.css'

export default function Vision() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })

  return (
    <motion.section
      className="vision-wrapper"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      ref={ref}
      style={{ position: 'relative' }}
    >
      {/* Estrella decorativa flotante */}
      <div className="vision-decor-star" />

      <div className="vision-container">
        <motion.div
          className="vision-left"
          initial={{ x: -60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {inView && <TypeWriter text="Nuestra VISIÓN" />}
          <motion.div
            className="vision-underline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformOrigin: 'center' }}
          />
          <motion.p
            className="vision-text"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {'\u0009'}Somos el aliado ideal en la difusión de mensajes publicitarios. Aportamos{' '}
            <strong>creatividad</strong>, <strong>efectividad</strong> y <strong>compromiso</strong>{' '}
            para lograr los objetivos de nuestros clientes. Nuestra visión es construir impacto real
            a través de cada mensaje.
          </motion.p>
        </motion.div>

        <motion.div
          className="vision-right"
          initial={{ x: 60, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div
            className="camera-lens-wrapper"
            animate={{
              scale: [1, 1.03, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 8,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          >
            <div className="camera-lens-inner">
              <Lottie animationData={cameraLottie} loop className="lottie-camera" />
            </div>
            <div className="lente-brillo" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function TypeWriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = React.useState('')
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    let currentIndex = 0
    if (done) return

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, currentIndex + 1))
      currentIndex++
      if (currentIndex === text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 70)

    return () => clearInterval(interval)
  }, [text, done])

  const firstSpaceIndex = text.indexOf(' ')
  const firstWordDisplayed = displayed.slice(0, firstSpaceIndex)
  const restDisplayed = displayed.slice(firstSpaceIndex)

  return (
    <h2 className="vision-title">
      <span className="verde">{firstWordDisplayed}</span>
      <span className="gris">{restDisplayed}</span>
      <span className="cursor" style={{ opacity: !done ? 1 : 0 }} />
    </h2>
  )
}
