import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Bloquear scroll del body cuando el drawer móvil está abierto
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = open ? "hidden" : "";
    return () => { el.style.overflow = prev; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header aria-label="Cabecera principal">
      {/* Franja superior */}
      <div className="top-strip" role="banner">
        <div className="top-strip__inner">
          <div className="social-icons" aria-label="Redes sociales">
            <a href="https://www.facebook.com/greenfieldsrl" target="_blank" rel="noreferrer" aria-label="Facebook" className="icon">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M13 22v-9h3l1-4h-4V7c0-1.2.3-2 2-2h2V1h-3c-3.1 0-5 2-5 5v3H6v4h3v9h4z" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/greenfieldbolivia/" target="_blank" rel="noreferrer" aria-label="Instagram" className="icon">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@greenfieldsrl" target="_blank" rel="noreferrer" aria-label="TikTok" className="icon">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M12.5 3h2.5c.2 1.4 1.1 2.7 2.4 3.4 1 .6 2.1.9 3.3.9v2.6c-1.7 0-3.3-.5-4.7-1.4v6.8c0 3.4-2.8 6.1-6.2 6.1S3.7 18.7 3.7 15.3c0-3.4 2.8-6.1 6.1-6.1.4 0 .7 0 1 .1v2.8c-.3-.1-.6-.1-1-.1-1.9 0-3.4 1.5-3.4 3.4S7 18.8 9 18.8s3.5-1.5 3.5-3.4V3z" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/greenfield-srl/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0V8zm7 0h4.8v2.2c.7-1.3 2.4-2.6 4.9-2.6 5.3 0 6.3 3.4 6.3 7.7V23H18V16c0-1.7 0-3.8-2.3-3.8s-2.6 1.8-2.6 3.6V23H7V8z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Barra blanca de navegación */}
      <div className="nav-strip">
        <div className="nav-strip__inner">
          <div className="brand-wrap">
            <img
              src="/logos/GREENFIELD-REDONDO.png"
              alt="Greenfield"
              className="brand-logo--round"
              draggable={false}
              width={160}
              height={160}
            />
            <span className="brand-curve" aria-hidden="true"></span>
          </div>

          <nav className="menu menu--desktop" aria-label="Secciones principales">
            <a href="#inicio">Inicio</a>
            <a href="#cultura">Nuestra Cultura</a>
            <a href="#productos">Productos</a>
            <a href="#programas">Programas</a>
            <a href="#testimonios">Testimonios</a>
            <a href="#eventos">Eventos</a>
            <a href="#contacto">Contacto</a>
          </nav>

          {/* HAMBURGUESA: un solo span, animación a X */}
          <button
            className={`menu-toggle ${open ? "is-open" : ""}`}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(v => !v)}
          >
            <span className="hamburger" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Drawer móvil */}
      <div id="mobile-drawer" className={`mobile-drawer ${open ? "is-open" : ""}`} role="dialog" aria-modal="true">
        <div className="mobile-drawer__inner">
          <nav className="menu menu--mobile" onClick={closeMenu}>
            <a href="#inicio">Inicio</a>
            <a href="#cultura">Nuestra Cultura</a>
            <a href="#productos">Productos</a>
            <a href="#programas">Programas</a>
            <a href="#testimonios">Testimonios</a>
            <a href="#eventos">Eventos</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
        <button className="mobile-drawer__backdrop" aria-label="Cerrar menú" onClick={closeMenu}/>
      </div>
    </header>
  );
}
