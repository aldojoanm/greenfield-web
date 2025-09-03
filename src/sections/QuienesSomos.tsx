import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import "./QuienesSomos.css";

type Value = { key: string; img: string; title: string; text: string };

const VALUES: Value[] = [
  { key: "innovacion",   img: "/logos/innovacion.png",   title: "Innovación",
    text: "Adoptamos la creatividad y la innovación en todo lo que hacemos, persiguiendo nuevas ideas audaces y adaptándonos a un mundo en constante evolución." },
  { key: "integridad",   img: "/logos/intefridad.png",   title: "Integridad",
    text: "Actuamos con honestidad y ética en todas nuestras interacciones, manteniendo altos estándares de integridad y construyendo confianza duradera." },
  { key: "pasion",       img: "/logos/pasion.png",       title: "Pasión",
    text: "Abrazamos cada tarea con pasión, entregándonos por completo a nuestro propósito y desafiando límites para lograr resultados excepcionales." },
  { key: "conocimiento", img: "/logos/conocimiento.png", title: "Conocimiento",
    text: "Valoramos el aprendizaje continuo y compartimos conocimientos, fomentando un entorno donde cada colaborador se empodera para crecer y contribuir al máximo." },
  { key: "ambicion",     img: "/logos/ambicion.png",     title: "Ambición",
    text: "Buscamos constantemente superar expectativas y trascender barreras, impulsados por una gran ambición de lograr resultados excepcionales." },
];

export default function QuienesSomos() {
  /** ====== Timeline (CSS loop) ====== */
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Deben corresponder aproximadamente a las variables CSS --dotSize y --gap
  const ICON_SIZE = 120;
  const GAP = 110;

  const [baseCount, setBaseCount] = useState(VALUES.length);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const unit = ICON_SIZE + GAP;
    const vpW = vp.clientWidth || 0;
    const needed = Math.max(VALUES.length, Math.ceil((vpW * 1.8) / unit) + 6);
    setBaseCount(needed);
  }, []);

  // bloque base
  const baseItems = useMemo(() => {
    const arr: Value[] = [];
    for (let i = 0; i < baseCount; i++) arr.push(VALUES[i % VALUES.length]);
    return arr;
  }, [baseCount]);

  // pista = dos copias del bloque base; el globo se muestra en AMBAS copias
  const handleToggleBubble = (i: number) =>
    setOpenIdx((cur) => (cur === i ? null : i));

  /* ------------------ REVEAL (bidireccional) ------------------ */
  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );

    // Agrega .is-in al entrar y la quita al salir (arriba/abajo)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
          } else {
            e.target.classList.remove("is-in");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  /* ------------------------------------------------------------ */

  return (
    <section id="quienes-somos" className="qs">
      <div className="qs__inner">
        {/* IZQUIERDA */}
        <article className="qs__left--plain reveal reveal-up">
          <h2 className="qs__title reveal reveal-up">Nuestra Historia</h2>

          <div className="qs__copy reveal reveal-up stagger">
            <p>
              En el año 2013, iniciamos nuestro viaje como Greenfield, un sueño audaz y financieramente
              arriesgado, que consolidamos juntos. Nuestro enfoque inicial fue en nutrición vegetal para incrementar
              los rendimientos de los cultivos en Bolivia.
            </p>
            <p>
              Hoy demostramos al mundo que Bolivia es un generador de alimentos para la agricultura a nivel mundial.
            </p>
          </div>

          <div className="qs-video reveal reveal-right">
            <a
              className="qs-video__btn"
              href="https://youtu.be/7k-LscfWhF4"
              target="_blank"
              rel="noopener"
            >
              <span className="qs-video__btnIcon" aria-hidden="true"></span>
              “Nuestra Historia”
            </a>
          </div>

          <div className="qs-valuesLabel reveal reveal-up">
            <img src="/logos/valores.png" alt="" />
            <span>Nuestros Valores</span>
          </div>
        </article>

        {/* DERECHA (Tarjetas) */}
        <div className="qs__right">
          <article className="qs-card qs-card--std qs-card--hover reveal reveal-left">
            <header className="qs-card__head">
              <span className="qs-card__icon" aria-hidden="true">
                <img src="/logos/mision.png" alt="" />
              </span>
              <h3 className="qs-card__title">Misión</h3>
            </header>
            <p className="qs-card__text">
              Incrementar los rendimientos de los cultivos en Bolivia con soluciones innovadoras,
              conectando la tecnología con el agricultor y la tierra.
            </p>
          </article>

          <article className="qs-card qs-card--std qs-card--hover reveal reveal-left">
            <header className="qs-card__head">
              <span className="qs-card__icon" aria-hidden="true">
                <img src="/logos/vision.png" alt="" />
              </span>
              <h3 className="qs-card__title">Visión</h3>
            </header>
            <p className="qs-card__text">
              Mostrar al mundo el potencial agrícola de Bolivia mediante productos innovadores que
              generen un modelo de negocio más rentable para todos.
            </p>
          </article>
        </div>

        {/* TIMELINE: fila propia que ocupa todo el ancho, no mueve las tarjetas */}
        <div className="qs-timeline reveal reveal-up">
          <div className="qs-timeline__viewport" ref={viewportRef}>
            {/* Copia A (con globos) */}
            <ul className="qs-timeline__track" style={{ animationDelay: "-14s" }}>
              {baseItems.map((v, i) => (
                <li key={`a-${i}-${v.key}`} className="qs-timeline__item">
                  <button
                    className="qs-timeline__dot"
                    onClick={() => handleToggleBubble(i)}
                    aria-label={v.title}
                    title={v.title}
                  >
                    <img src={v.img} alt="" />
                  </button>

                  <span className="qs-timeline__caption" aria-hidden="true">{v.title}</span>
                  <div
                    className={"qs-bubble " + (openIdx === i ? "is-open" : "")}
                    role="dialog"
                    aria-modal="false"
                  >
                    <h5 className="qs-bubble__title">{v.title}</h5>
                    <p className="qs-bubble__text">{v.text}</p>
                  </div>
                  <div
                    className={"qs-bubble " + (openIdx === i ? "is-open" : "")}
                    role="dialog"
                    aria-modal="false"
                  >
                    <h5 className="qs-bubble__title">{v.title}</h5>
                    <p className="qs-bubble__text">{v.text}</p>
                  </div>
                </li>
              ))}

              {/* Copia B (también con globos para que los últimos SÍ abran) */}
              {baseItems.map((v, i) => (
                <li key={`b-${i}-${v.key}`} className="qs-timeline__item">
                  <button
                    className="qs-timeline__dot"
                    onClick={() => handleToggleBubble(i + baseItems.length)}
                    aria-label={v.title}
                    title={v.title}
                  >
                    <img src={v.img} alt="" />
                  </button>
                    <span className="qs-timeline__caption" aria-hidden="true">{v.title}</span>
                    <div
                      className={
                        "qs-bubble " + (openIdx === i + baseItems.length ? "is-open" : "")
                      }
                      role="dialog"
                      aria-modal="false"
                    >
                      <h5 className="qs-bubble__title">{v.title}</h5>
                      <p className="qs-bubble__text">{v.text}</p>
                    </div>
                  <div
                    className={
                      "qs-bubble " + (openIdx === i + baseItems.length ? "is-open" : "")
                    }
                    role="dialog"
                    aria-modal="false"
                  >
                    <h5 className="qs-bubble__title">{v.title}</h5>
                    <p className="qs-bubble__text">{v.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* /TIMELINE */}
      </div>
    </section>
  );
}
