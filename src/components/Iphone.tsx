import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Iphone() {
  const width = 170
  const height = 300
  const borderRadius = 24
  const strokeWidth = 2
  const [hovered, setHovered] = useState(false)

  const screenX = 8
  const screenY = 8
  const screenWidth = width - screenX * 2
  const screenHeight = height - screenY * 2
  const contentOffsetY = screenY + 18 // espacio para no invadir el notch

  return (
    <div style={{ marginTop: '0.7rem', display: 'inline-block' }}>
      <motion.svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        style={{
          maxWidth: '170px',
          display: 'block',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Clip para pantalla */}
        <defs>
          <clipPath id="screenClip">
            <rect
              x={screenX}
              y={screenY}
              width={screenWidth}
              height={screenHeight}
              rx={20}
              ry={20}
            />
          </clipPath>
        </defs>

        {/* Marco exterior */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={borderRadius}
          ry={borderRadius}
          fill="#000"
          stroke="#222"
          strokeWidth={strokeWidth}
        />

        {/* Botones laterales */}
        <rect x={0} y={60} width={2.2} height={40} rx={1.1} fill="#333" />
        <rect x={0} y={110} width={2.2} height={40} rx={1.1} fill="#333" />
        <rect x={width - 2.2} y={80} width={2.2} height={60} rx={1.1} fill="#333" />

        {/* Pantalla */}
        <motion.rect
          x={screenX}
          y={screenY}
          width={screenWidth}
          height={screenHeight}
          rx={20}
          ry={20}
          fill={hovered ? '#ffffff' : '#111'}
          stroke="#222"
          strokeWidth="0.7"
          initial={false}
          animate={{ fill: hovered ? '#ffffff' : '#111' }}
          transition={{ duration: 0.5 }}
        />

        {/* Notch visible SIEMPRE */}
        <g>
          <rect x={width / 2 - 22} y={14} width={44} height={6} rx={3} fill="#222" />
          <circle cx={width / 2 + 42} cy={17} r={5} fill="#222" />
        </g>

        {/* Animación Gmail */}
        <AnimatePresence>
          {hovered && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              clipPath="url(#screenClip)"
              style={{ pointerEvents: 'none' }}
            >
              {/* Barra roja Gmail */}
              <rect
                x={screenX}
                y={contentOffsetY}
                width={screenWidth}
                height={20}
                rx={4}
                fill="#d93025"
              />
              <text
                x={width / 2}
                y={contentOffsetY + 14}
                textAnchor="middle"
                fontSize="8"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                fill="#fff"
              >
                Redactar
              </text>

              {/* Campo Para */}
              <rect
                x={screenX + 4}
                y={contentOffsetY + 26}
                width={screenWidth - 8}
                height={12}
                rx={3}
                fill="#f1f3f4"
              />
              <circle cx={screenX + 12} cy={contentOffsetY + 32} r={3} fill="#bbb" />
              <text
                x={screenX + 20}
                y={contentOffsetY + 34}
                fontSize="6"
                fill="#5f6368"
              >
                publicidadecorural@gmail.com
              </text>

              {/* Campo Asunto */}
              <rect
                x={screenX + 4}
                y={contentOffsetY + 42}
                width={screenWidth - 8}
                height={12}
                rx={3}
                fill="#f1f3f4"
              />
              <text
                x={screenX + 8}
                y={contentOffsetY + 50}
                fontSize="6"
                fill="#5f6368"
              >
                Asunto del correo: EVENTO
              </text>

              {/* Cuerpo del mensaje */}
              <rect
                x={screenX + 4}
                y={contentOffsetY + 58}
                width={screenWidth - 8}
                height={60}
                rx={4}
                fill="#fff"
                stroke="#ddd"
                strokeWidth="0.5"
              />
              <text
                x={screenX + 8}
                y={contentOffsetY + 68}
                fontSize="6"
                fill="#777"
              >
                Me gustaria obtener una cotizacion para mi evento
              </text>
              <line
                x1={screenX + 8}
                y1={contentOffsetY + 75}
                x2={screenX + screenWidth - 16}
                y2={contentOffsetY + 75}
                stroke="#eee"
                strokeWidth="0.3"
              />
              <line
                x1={screenX + 8}
                y1={contentOffsetY + 82}
                x2={screenX + screenWidth - 40}
                y2={contentOffsetY + 82}
                stroke="#eee"
                strokeWidth="0.3"
              />

              {/* Botón Enviar */}
              <motion.rect
                x={screenX + 4}
                y={contentOffsetY + 122}
                width={screenWidth - 8}
                height={16}
                rx={8}
                fill="#1a73e8"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <text
                x={width / 2}
                y={contentOffsetY + 134}
                textAnchor="middle"
                fontSize="7"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                fill="#fff"
              >
                Enviar
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </motion.svg>
    </div>
  )
}

export default Iphone
