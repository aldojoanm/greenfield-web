import { useEffect, useRef, useState } from 'react';
import './IntroVideo.css';

type IntroVideoProps = {
  targetId?: string; 
};

export default function IntroVideo({ targetId = 'hero' }: IntroVideoProps) {
  void targetId; // evita TS6133 (noUnusedParameters) sin cambiar la lógica

  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflowX;
    const prevOverflowY = document.body.style.overflowY;
    if (!hidden) {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'hidden';
    }
    return () => {
      document.body.style.overflowX = prevOverflow;
      document.body.style.overflowY = prevOverflowY;
    };
  }, [hidden]);

  const handleEnter = () => {
    setClosing(true);
    setTimeout(() => {
      setHidden(true);
    }, 360);
  };

  useEffect(() => {
    const n = wrapRef.current;
    if (!n) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter();
    };
    n.addEventListener('keydown', onKey);
    return () => n.removeEventListener('keydown', onKey);
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={wrapRef}
      className={`intro-wrap ${closing ? 'intro-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Intro de bienvenida"
    >
      <video className="intro-video" autoPlay muted loop playsInline preload="auto">
        <source src="/video/Intro-Web.mp4" type="video/mp4" />
      </video>

      <div className="intro-overlay" />

      <div className="intro-center">
        <img
          src="/logos/logo-guiados.png"
          alt="Greenfield — Guiados por el conocimiento"
          className="intro-logo"
        />
        <button className="intro-btn" onClick={handleEnter} aria-label="Ir a inicio">
          Inicio
        </button>
      </div>
    </div>
  );
}
