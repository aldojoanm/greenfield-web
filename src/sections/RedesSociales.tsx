import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";

import redesSocialesJson from "../assets/Lottie/RedesSociales.json";
import targetJson from "../assets/Lottie/Target.json";
import cuadrosVariosJson from "../assets/Lottie/CuadrosVarios.json";
import laptopJson from "../assets/Lottie/Laptop.json";
import calendarioJson from "../assets/Lottie/Calendario.json";
import communityJson from "../assets/Lottie/Communitty.json";
import timeScheduleJson from "../assets/Lottie/TimeSchedule.json";

import "./RedesSociales.css";


function TypingText({
  children,
  delay = 0,
  color = "#ffffff",
  onComplete,
}: {
  children: React.ReactNode;
  delay?: number;
  color?: string;
  onComplete?: () => void;
}) {
  const [displayedCount, setDisplayedCount] = React.useState(0);

  function extractText(node: React.ReactNode): string {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) {
    const element = node as React.ReactElement<any, any>;
    return extractText(element.props.children);
  }

    return "";
  }


  const fullText = extractText(children);

  React.useEffect(() => {
    let i = 0;
    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayedCount(i + 1);
        i++;
        if (i >= fullText.length) {
          clearInterval(intervalId);
          if (onComplete) onComplete();
        }
      }, 80);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [fullText, delay, onComplete]);

  return (
    <span style={{ color }}>
      {fullText.substring(0, displayedCount)}
      {displayedCount < fullText.length && <span className="cursor">|</span>}
    </span>
  );
}



// Componente SVG animado scroll-based integrado dentro del archivo
const SvgConnectionLine = ({
  inView,
  pathD,
  height = 400,
  strokeColor = "#a2ce39",
  startPoint = { cx: 40, cy: 0 },
  endPoint = { cx: 360, cy: 380 },
  delay = 0,
  parallaxDistance = 40,
  animationDuration = 0.8,
  strokeDasharray = "0",
  drawUntil = 0.3,
}: {
  inView: boolean;
  pathD: string;
  height?: number;
  strokeColor?: string;
  startPoint?: { cx: number; cy: number };
  endPoint?: { cx: number; cy: number };
  delay?: number;
  parallaxDistance?: number;
  animationDuration?: number;
  strokeDasharray?: string;
  drawUntil?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -parallaxDistance]);
  const rawPathLength = useTransform(scrollYProgress, [0, drawUntil], [0, 1]);
  const pathLength = useSpring(rawPathLength, { stiffness: 100, damping: 30 });
  const showEndPoint = useTransform(pathLength, (value) => (value > 0.95 ? 1 : 0));

  return (
  <div
    ref={containerRef}
    style={{
      position: "relative",
      zIndex: 1,
      marginTop: "4rem",   
      marginBottom: "0rem", 
      height,
      overflow: "visible",
    }}
  >

      <motion.svg
        width="100%"
        height={height}
        viewBox={`0 0 400 ${height}`}
        preserveAspectRatio="xMidYMin meet"
        style={{ display: "block", margin: "0 auto", y }}
      >
        {/* Punto inicial fijo */}
        <circle cx={startPoint.cx} cy={startPoint.cy} r={8} fill={strokeColor} />

        {/* Línea animada */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset="1"
          style={{ pathLength }}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: animationDuration, ease: "easeInOut", delay }}
        />

        {/* Punto final que aparece cuando la línea casi termina */}
        <motion.circle
          cx={endPoint.cx}
          cy={endPoint.cy}
          r={8}
          fill={strokeColor}
          initial={{ opacity: 0, scale: 0 }}
          style={{ opacity: showEndPoint, scale: showEndPoint }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.svg>
    </div>
  );
};


export default function RedesSociales() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Intersection observers para cada sección
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refIntro, inViewIntro] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refTarget, inViewTarget] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refClient, inViewClient] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refContent, inViewContent] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refDevelopment, inViewDevelopment] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refStep1, inViewStep1] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refStep2, inViewStep2] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [refStep3, inViewStep3] = useInView({ triggerOnce: true, threshold: 0.3 });

  const [titleComplete, setTitleComplete] = useState(false);

  return (
    <div ref={containerRef} className="redes-sociales-wrapper">
      {/* Fondo con parallax */}
      <div className="parallax-bg">
        <motion.div className="bg-element bg-1" style={{ y: y1 }} />
        <motion.div className="bg-element bg-2" style={{ y: y2 }} />
        <motion.div className="bg-element bg-3" style={{ y: y3 }} />
      </div>

{/* Título */}
<section ref={refTitle} className="title-section">
  <motion.h1
    className="main-title"
    initial={{ opacity: 0, y: 50 }}
    animate={inViewTitle ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8 }}
  >
    <TypingText delay={500} onComplete={() => setTitleComplete(true)}>
      Redes {" "}
    </TypingText>
    {titleComplete && <TypingText delay={200} color="#a2ce39">SOCIALES</TypingText>}
  </motion.h1>
</section>

{/* Sección combinada texto + animación */}
<motion.section
  ref={refIntro}
  className="intro-section"
  initial={{ opacity: 0, y: 30 }}
  animate={inViewIntro ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.5, duration: 0.8 }}
>
  <div className="intro-text-container">
    <p className="intro-text">
      En PUBLICOM transformamos tu presencia digital con estrategias innovadoras
      y contenido que conecta. Nuestro enfoque integral garantiza resultados
      medibles y un crecimiento sostenible en todas tus plataformas sociales.
    </p>
  </div>

  <div className="intro-animation-container">
    <Lottie animationData={redesSocialesJson} loop />
  </div>
</motion.section>


      {/* Línea conexión 1 */}
<SvgConnectionLine
  inView={inViewIntro}
  pathD="M-150 12 L300 120 L50 160 L-150 392"
  startPoint={{ cx: -150, cy: 10 }}
  endPoint={{ cx: -150, cy: 392 }}
  height={400}
  parallaxDistance={50}
  animationDuration={1}
  strokeDasharray="0" // sólido
/>

      {/* Sección Objetivos */}
      <section ref={refTarget} className="content-section">
        <motion.div
          className="section-content"
          initial={{ opacity: 0, x: -50 }}
          animate={inViewTarget ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-content">
            <h2 className="section-title">¿Cómo garantizamos tus RESULTADOS?</h2>
            <h3 className="section-subtitle">DETERMINAMOS LOS OBJETIVOS</h3>
            <p className="section-description">
              Cada estrategia comienza con metas claras y medibles. Analizamos tu marca,
              competencia y audiencia para definir objetivos específicos que impulsen
              tu crecimiento digital de manera efectiva.
            </p>
          </div>
          <div className="animation-content">
            <Lottie animationData={targetJson} loop />
          </div>
        </motion.div>
      </section>

      {/* Línea conexión 2 */}
<SvgConnectionLine
  inView={inViewTarget}
  pathD="M-50 12 L150 120 L200 300 L500 392"
  startPoint={{ cx: -50, cy: 10 }}
  endPoint={{ cx: 500, cy: 392 }}
  height={400}
  parallaxDistance={40}
  animationDuration={0.8}
  strokeDasharray="6 4" // línea punteada
  strokeColor="#a2ce39"
/>

      {/* Sección Cliente Ideal */}
      <section ref={refClient} className="content-section reverse">
        <motion.div
          className="section-content"
          initial={{ opacity: 0, x: 50 }}
          animate={inViewClient ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="animation-content">
            <Lottie animationData={cuadrosVariosJson} loop/>
          </div>
          <div className="text-content">
            <h3 className="section-subtitle">CREAMOS TU BUYER PERSONA IDEAL</h3>
            <p className="section-description">
              Desarrollamos perfiles detallados de tu cliente perfecto. Investigamos
              comportamientos, preferencias y necesidades para crear contenido que
              resuene profundamente con tu audiencia objetivo.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Línea conexión 3 */}
<SvgConnectionLine
  inView={inViewClient}
  pathD="M500 9 L370 70 L150 50 L20 150 L100 300 L-160 392"
  startPoint={{ cx: 500, cy: 8 }}
  endPoint={{ cx: -160, cy: 392 }}
  height={400}
  parallaxDistance={60}
  animationDuration={0.9}
  strokeDasharray="0"
  strokeColor="#8bc34a"
/>

      {/* Sección Ejes de contenido */}
      <section ref={refContent} className="content-section">
        <motion.div
          className="section-content"
          initial={{ opacity: 0, x: -50 }}
          animate={inViewContent ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-content">
            <h3 className="section-subtitle">DISEÑAMOS EJES DE CONTENIDO ESTRATÉGICOS</h3>
            <p className="section-description">
              Estructuramos pilares de contenido que equilibran entretenimiento,
              educación y promoción. Cada publicación tiene un propósito específico
              dentro de tu estrategia integral de comunicación digital.
            </p>
          </div>
          <div className="animation-content">
            <Lottie animationData={laptopJson} loop/>
          </div>
        </motion.div>
      </section>

      {/* Línea conexión 4 */}
<SvgConnectionLine
  inView={inViewContent}
  pathD="M10 9 L130 90 L150 160 L100 200 L170 392"
  startPoint={{ cx: 10, cy: 8 }}
  endPoint={{ cx: 170, cy: 392 }}
  height={400}
  parallaxDistance={45}
  animationDuration={0.7}
  strokeDasharray="4 2"
  strokeColor="#7dbf2e"
/>

      {/* Sección Desarrollo */}
      <section ref={refDevelopment} className="development-section">
        <motion.h2
          className="development-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inViewDevelopment ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <TypingText delay={0} color="#a2ce39">
            ¿Cómo desarrollamos tu contenido?
          </TypingText>
        </motion.h2>
      </section>

{/* Paso 1 */}
<motion.section
  ref={refStep1}
  className="step-section"
  initial={{ opacity: 0, x: -100, y: 50 }}
  animate={inViewStep1 ? { opacity: 1, x: 0, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  <div className="step-content">
    <div className="step-number">01</div>
    <div className="step-info">
      <Lottie animationData={calendarioJson} loop style={{width: 800, height: 250}} />
      <div className="step-text">
        <h3>Creamos tu calendario mensual</h3>
        <p>
          Planificación estratégica de contenido con fechas clave, eventos especiales y momentos óptimos para maximizar el engagement.
        </p>
      </div>
    </div>
  </div>
</motion.section>

{/* Línea conexión 5 */}
<SvgConnectionLine
  inView={inViewStep1}
  pathD="M200 8 L350 80 L310 160 L20 250 L200 392"
  startPoint={{ cx: 200, cy: 8 }}
  endPoint={{ cx: 200, cy: 392 }}
  height={400}
  parallaxDistance={55}
  animationDuration={0.85}
  strokeDasharray="0"
  strokeColor="#a2ce39"
/>

{/* Paso 2 */}
<motion.section
  ref={refStep2}
  className="step-section reverse"
  initial={{ opacity: 0, x: 100, y: 100 }}
  animate={inViewStep2 ? { opacity: 1, x: 0, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  <div className="step-content">
    <div className="step-number">02</div>
    <div className="step-info">
      <div className="step-text">
        <h3>Definimos horarios y tiempos de publicación</h3>
        <p>
          Análisis de datos para identificar los momentos de mayor actividad de tu audiencia y optimizar el alcance orgánico.
        </p>
      </div>
      <Lottie animationData={timeScheduleJson} loop style={{width: 800, height: 250}}/>
    </div>
  </div>
</motion.section>

{/* Línea conexión 6 */}
<SvgConnectionLine
  inView={inViewStep2}
  pathD="M200 8 L40 90 L80 170 L250 320 L200 392"
  startPoint={{ cx: 200, cy: 8 }}
  endPoint={{ cx: 200, cy: 392 }}
  height={400}
  parallaxDistance={50}
  animationDuration={0.9}
  strokeDasharray="8 6"
  strokeColor="#9ccc65"
/>

{/* Paso 3 */}
<motion.section
  ref={refStep3}
  className="step-section"
  initial={{ opacity: 0, x: -50, y: 150 }}
  animate={inViewStep3 ? { opacity: 1, x: 0, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  <div className="step-content">
    <div className="step-number">03</div>
    <div className="step-info">
      <Lottie animationData={communityJson} loop style={{ width: 800, height: 250 }} />
      <div className="step-text">
        <h3>Community Manager ejecuta la estrategia</h3>
        <p>
          Nuestro equipo especializado gestiona publicaciones, interactúa con tu comunidad y monitorea métricas para optimización continua.
        </p>
      </div>
    </div>
  </div>
</motion.section>

    </div>
  );
}
