import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Iphone from '../components/Iphone'
import { useNavigate } from 'react-router-dom'
import './Contacto.css'

type FormData = {
  nombre: string
  apellido: string
  email: string
  mensaje: string
}

type FormErrors = {
  nombre?: string
  apellido?: string
  email?: string
  mensaje?: string
}

export default function Contacto() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    email: '',
    mensaje: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  const { scrollY } = useScroll()
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const iphoneOriginalHeight = 320
  const maxScale = windowHeight / iphoneOriginalHeight

  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const logoScale = useTransform(scrollY, [0, 300], [1.5, 0.7])
  const logoY = useTransform(scrollY, [0, 300], ['0%', '-100%'])

  const iphoneOpacity = useTransform(scrollY, [0, 300], [0, 1])
  const iphoneScale = useTransform(scrollY, [300, 1000], [0.3, maxScale])
  const iphoneX = useTransform(scrollY, [0, 1000, 1500], ['100%', '-150%', '-550%'])
  const iphoneY = useTransform(scrollY, [0, 1000], ['0%', '0%'])

  const formOpacity = useTransform(scrollY, [1000, 1600], [0, 1])
  const formY = useTransform(scrollY, [1000, 1600], [50, 0])
  const formX = useTransform(scrollY, [1000, 1600], [200, 0])
  const formScale = useTransform(scrollY, [1100, 1600], [0.8, 1])

  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validar = () => {
    const newErrors: FormErrors = {}
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio'
    if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio'
    else if (!validarEmail(formData.email)) newErrors.email = 'Correo inválido'
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje no puede estar vacío'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validar()) return
    setLoading(true)
    setErrors({})
    setEnviado(false)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setEnviado(true)
    setFormData({ nombre: '', apellido: '', email: '', mensaje: '' })
  }

  const scrollToHero = () => {
  navigate('/', { state: { scrollToHero: true } })
}


  return (
    <div className="contacto-container">
      {/* LOGO ANIMADO AL CENTRO */}
      <motion.img
        src="/logos/p-logo.png"
        alt="Publicom Logo"
        className="logo-inicial"
        style={{
          opacity: logoOpacity,
          scale: logoScale,
          y: logoY,
        }}
      />

      {/* IPHONE PARALLAX */}
      <motion.div
        className="iphone-wrapper"
        style={{
          opacity: iphoneOpacity,
          scale: iphoneScale,
          x: iphoneX,
          y: iphoneY,
          originX: 1,
          originY: 0,
          transformOrigin: 'top right',
          zIndex: 10,
          position: 'fixed',
          top: 0,
          right: 0,
        }}
      >
        <Iphone />
      </motion.div>

      {/* FORMULARIO */}
      <motion.div
        className="form-wrapper"
        style={{
          opacity: formOpacity,
          y: formY,
          x: formX,
          scale: formScale,
          originX: 1,
          originY: 0,
          transformOrigin: 'top right',
          zIndex: 5,
          position: 'fixed',
          top: '3%',
          right: '10%',
          transform: 'translateY(-50%)',
          maxWidth: '700px',
          width: '90vw',
          backgroundColor: 'rgba(28,28,30,0.9)',
          borderRadius: '15px',
          padding: '1rem 3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        <div className="form-box">
          <h2 className="titulo-principal" style={{color: '#25d366', fontWeight: '800', fontSize: '2.5rem', textAlign: 'center', marginBottom: '2rem'}}>
            ENVIANOS UN MENSAJE
          </h2>

          <form onSubmit={handleSubmit} className="contact-form" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="fila-nombres" style={{display: 'flex', gap: '1.5rem', marginBottom: '1.5rem'}}>
              <div className="input-group" style={{flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                <label htmlFor="nombre" style={{marginBottom: '0.5rem', fontWeight: '600'}}>Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.nombre ? 'error' : ''}
                  style={{
                    backgroundColor: '#222',
                    border: errors.nombre ? '1px solid #ff3b30' : '1px solid #444',
                    borderRadius: '10px',
                    padding: '0.8rem 1rem',
                    color: '#eee',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                />
                {errors.nombre && <span className="error-msg" style={{color:'#ff3b30'}}>{errors.nombre}</span>}
              </div>

              <div className="input-group" style={{flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1rem'}}>
                <label htmlFor="apellido" style={{marginBottom: '0.5rem', fontWeight: '600'}}>Apellido</label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  disabled={loading}
                  className={errors.apellido ? 'error' : ''}
                  style={{
                    backgroundColor: '#222',
                    border: errors.apellido ? '1px solid #ff3b30' : '1px solid #444',
                    borderRadius: '10px',
                    padding: '0.8rem 1rem',
                    color: '#eee',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                />
                {errors.apellido && <span className="error-msg" style={{color:'#ff3b30'}}>{errors.apellido}</span>}
              </div>
            </div>

            <div className="input-group" style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
              <label htmlFor="email" style={{marginBottom: '0.5rem', fontWeight: '600'}}>Correo Electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className={errors.email ? 'error' : ''}
                style={{
                  backgroundColor: '#222',
                  border: errors.email ? '1px solid #ff3b30' : '1px solid #444',
                  borderRadius: '10px',
                  padding: '0.8rem 1rem',
                  color: '#eee',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
              />
              {errors.email && <span className="error-msg" style={{color:'#ff3b30'}}>{errors.email}</span>}
            </div>

            <div className="input-group" style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
              <label htmlFor="mensaje" style={{marginBottom: '0.5rem', fontWeight: '600'}}>Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                value={formData.mensaje}
                onChange={handleChange}
                disabled={loading}
                className={errors.mensaje ? 'error' : ''}
                style={{
                  backgroundColor: '#222',
                  border: errors.mensaje ? '1px solid #ff3b30' : '1px solid #444',
                  borderRadius: '10px',
                  padding: '0.8rem 1rem',
                  color: '#eee',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  resize: 'vertical',
                }}
              />
              {errors.mensaje && <span className="error-msg" style={{color:'#ff3b30'}}>{errors.mensaje}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
              style={{
                marginTop: '1rem',
                backgroundColor: loading ? '#555' : '#25d366',
                color: loading ? '#ccc' : '#000',
                padding: '1rem',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {enviado && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="success-msg"
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#34c759',
                  color: '#000',
                  padding: '0.8rem 1rem',
                  borderRadius: '10px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                ¡Mensaje enviado correctamente!
              </motion.div>
            )}
          </form>
        </div>

        {/* CONTENEDORES INFERIORES */}
        <div
          className="info-adicional-container"
          style={{
            marginTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="mini-contenedor"
            style={{
              flex: '1 1 48%',
              background: 'rgba(28, 28, 30, 0.85)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              color: '#ddd',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <a
              href="https://wa.me/59170845204?text=Hola,%20me%20gustaria%20adquirir%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#25d366', fontWeight: '700', textDecoration: 'none', fontSize: '1rem' }}
            >
              WhatsApp - 70845204
            </a>
          </div>

          <div
            className="mini-contenedor"
            style={{
              flex: '1 1 48%',
              background: 'rgba(28, 28, 30, 0.85)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              color: '#ddd',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <a
              href="https://wa.me/59163475684?text=Hola,%20me%20gustaria%20adquirir%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#25d366', fontWeight: '700', textDecoration: 'none', fontSize: '1rem' }}
            >
              WhatsApp - 63475684
            </a>
          </div>

          <div
            className="mini-contenedor"
            style={{
              flex: '1 1 48%',
              background: 'rgba(28, 28, 30, 0.85)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              color: '#58a6ff',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <a href="mailto:publicidadecorural@gmail.com" style={{ color: '#58a6ff', textDecoration: 'none', fontSize: '1rem' }}>
              Correo: publicidadecorural@gmail.com
            </a>
          </div>

          <div
            className="mini-contenedor"
            style={{
              flex: '1 1 48%',
              background: 'rgba(28, 28, 30, 0.85)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              color: '#bbb',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <a
              href="https://maps.app.goo.gl/ZPTQM9ddo64LTkg69"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#bbb', textDecoration: 'underline', fontSize: '1rem' }}
            >
              Ubicación: Av. Virgen de Cotoca
            </a>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={scrollToHero}
        className="back-to-top-fixed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Volver al inicio"
      >
        Inicio
      </motion.button>

      {/* INDICADOR DE SCROLL */}
      <div className="scroll-indicator">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          ↓ Desplázate
        </motion.div>
      </div>
    </div>
  )
}
