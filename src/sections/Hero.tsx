import { useEffect, useMemo, useRef, useState } from "react";
import "./Hero.css";

type CopyPos = "lt" | "lm" | "lb" | "rt" | "rm" | "rb" | "ct";

type Slide = {
  bg: string;
  fg?: string | null;
  headline?: string;
  subline?: string;
  copyPos?: CopyPos;
  fgScale?: number;     // escala del bidón (1 = base)
  fgYOffset?: string;   // offset vertical (p.ej. "-4vh" o "20px")
};

const SLIDES: Slide[] = [
  {
    bg: "/images/fondo5.png",
    fg: "/images/bidon-voxy.png",
    headline: "Protección inteligente,",
    subline: "eficacia garantizada",
    copyPos: "rt",
    fgScale: 0.9,
    fgYOffset: "2vh",
  },
  {
    bg: "/images/fondo2.png",
    fg: "/images/bidon-raykat.png",
    headline: "Vigor desde la raíz,",
    subline: "rendimiento en la cosecha",
    copyPos: "lb",
    fgScale: 0.8,
    fgYOffset: "0vh",
  },
  {
    bg: "/images/fondo1.png",
    fg: "/images/bidon-microcat.png",
    headline: "Nutrición avanzada,",
    subline: "hojas fuertes y productivas",
    copyPos: "lt",
    fgScale: 0.7,
    fgYOffset: "0vh",
  },
];

const AUTOPLAY_MS = 7000;

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  // Preload
  useEffect(() => {
    SLIDES.flatMap(s => [s.bg, s.fg].filter(Boolean) as string[])
      .forEach((u) => { const img = new Image(); img.src = u; });
  }, []);

  // Velo de entrada
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // ⬇️ Ajuste de alto EXACTO: viewport px – header px (sin redondeos de vh/svh)
  useEffect(() => {
    const sizeHero = () => {
      const target = heroRef.current;
      if (!target) return;

      // Detecta header por data/id comunes o primer <header>
      const header =
        (document.querySelector<HTMLElement>("[data-header]") ||
         document.querySelector<HTMLElement>("#site-header") ||
         document.querySelector<HTMLElement>("#header") ||
         document.querySelector<HTMLElement>("header")) ?? null;

      const headerH = header?.offsetHeight ?? 0;
      // -1 para evitar arrastre por redondeo/subpixel
      const h = Math.max(0, Math.round(window.innerHeight - headerH - 1));
      target.style.height = `${h}px`;
      target.style.minHeight = `${h}px`;
    };

    sizeHero();
    window.addEventListener("resize", sizeHero);
    window.addEventListener("orientationchange", sizeHero);
    // En caso de headers que cambian de alto al cargar fuentes
    window.addEventListener("load", sizeHero);

    return () => {
      window.removeEventListener("resize", sizeHero);
      window.removeEventListener("orientationchange", sizeHero);
      window.removeEventListener("load", sizeHero);
    };
  }, []);

  const next = () => setIdx(i => (i + 1) % SLIDES.length);
  const prev = () => setIdx(i => (i - 1 + SLIDES.length) % SLIDES.length);

  // Autoplay
  useEffect(() => {
    const start = () => { stop(); timerRef.current = window.setInterval(next, AUTOPLAY_MS) as unknown as number; };
    const stop = () => { if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; } };
    start(); return stop;
  }, []);

  const liveText = useMemo(() => {
    const s = SLIDES[idx];
    return [s.headline, s.subline].filter(Boolean).join(" — ");
  }, [idx]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`heroX ${mounted ? "is-mounted" : ""}`}
      aria-label="Hero"
    >
      <div
        className="heroX__stage"
        role="group"
        aria-roledescription="slider"
        aria-live="polite"
        aria-label={liveText}
      >
        {/* Fondos */}
        <div className="bg-stack" aria-hidden="true">
          {SLIDES.map((s, i) => (
            <div
              key={`bg-${i}`}
              className={`bg-layer ${i === idx ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${s.bg})` }}
            >
              <div className="bg-overlay" />
            </div>
          ))}
        </div>

        {/* Bidones */}
        <div className="fg-stack" aria-hidden="true">
          {SLIDES.map((s, i) => (
            <div
              key={`fg-${i}`}
              className={`fg-layer ${i === idx ? "is-active" : ""}`}
              style={
                {
                  // @ts-ignore CSS custom properties
                  "--fgScale": s.fgScale ?? 1,
                  "--fgOffsetY": s.fgYOffset ?? "0vh",
                } as React.CSSProperties
              }
            >
              {s.fg ? <img className="fg-bidon" src={s.fg} alt="" draggable={false} /> : null}
              <div className="fg-shadow" />
            </div>
          ))}
        </div>

        {/* Texto */}
        <div className="copy-stack">
          {SLIDES.map((s, i) => (
            <div
              key={`copy-${i}`}
              className={[
                "copy-layer",
                s.copyPos ? `copy--${s.copyPos}` : "copy--ct",
                i === idx ? "is-active" : "",
              ].join(" ")}
            >
              {s.headline && <h2 className="hero-title">{s.headline}</h2>}
              {s.subline && <p className="hero-sub">{s.subline}</p>}
            </div>
          ))}
        </div>

        {/* Controles */}
        <button className="nav-arrow nav-arrow--left" aria-label="Anterior" onClick={prev}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 4.5L8 12l7.5 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="nav-arrow nav-arrow--right" aria-label="Siguiente" onClick={next}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.5 4.5L16 12l-7.5 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots */}
        <div className="dots" role="tablist" aria-label="Páginas del hero">
          {SLIDES.map((_, i) => (
            <button
              key={`dot-${i}`}
              role="tab"
              aria-selected={i === idx}
              className={`dot ${i === idx ? "is-active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Ir a la página ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
