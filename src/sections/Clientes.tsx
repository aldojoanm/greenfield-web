import { useEffect } from "react";
import "./Clientes.css";

export default function FooterGreenfield() {
  // Parallax: mueve capas suaves al hacer scroll
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--parY",
          String(window.scrollY || 0)
        );
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="gf-footer" aria-labelledby="gf-footer-title">
      {/* Parallax layers */}
      <div className="gf-parallax">
        <div className="plx plx-a" aria-hidden="true" />
        <div className="plx plx-b" aria-hidden="true" />
        <div className="plx plx-c" aria-hidden="true" />
      </div>

      <div className="gf-footer__inner">
        {/* Columna 1: Marca + dirección */}
        <section className="gf-col gf-brand">
          <img
            src="/logos/logo-greenfield-blanco.png"
            alt="Greenfield"
            className="gf-logo"
            loading="lazy"
            decoding="async"
          />
          <address className="gf-address">
            <p>Av. Cristo Redentor 8vo anillo</p>
            <p>Edificio El Remanso</p>
            <p>Santa Cruz de la Sierra, Bolivia</p>
          </address>
          <a
            className="gf-link gf-map"
            href="https://maps.app.goo.gl/dLa3AsajMYtV5Uah9"
            target="_blank"
            rel="noopener"
          >
            Ver en Google Maps
          </a>
          <p className="gf-copy">© {year} Greenfield. Todos los derechos reservados.</p>
        </section>

        {/* Columna 2: Navegación */}
        <nav className="gf-col gf-nav" aria-label="Navegación">
          <h3 id="gf-footer-title" className="gf-h3">Navegación</h3>
          <ul className="gf-list">
            <li><a className="gf-link" href="#inicio">Inicio</a></li>
            <li><a className="gf-link" href="#quienes-somos">Greenfield</a></li>
            <li><a className="gf-link" href="#productos">Productos</a></li>
            <li><a className="gf-link" href="#programas">Programas</a></li>
            <li><a className="gf-link" href="#coe">Center of Excellence</a></li>
            <li><a className="gf-link" href="#eventos">Eventos</a></li>
            <li><a className="gf-link" href="#blog">Blog</a></li>
          </ul>
        </nav>

        {/* Columna 3: Eventos */}
        <section className="gf-col gf-events" aria-label="Nuestros eventos">
          <h3 className="gf-h3">Nuestros Eventos</h3>
          <ul className="gf-list">
            <li><a className="gf-link" href="#expoagro">Expo Agro Exhibition 2025</a></li>
            <li><a className="gf-link" href="#fundacruz">Día de Campo de FUNDACRUZ</a></li>
            <li><a className="gf-link" href="#fexpocruz">Greenfield en Fexpocruz 2024</a></li>
            <li><a className="gf-link" href="#nutrition">Nutrition Day 2025</a></li>
          </ul>
        </section>

        {/* Columna 4: Newsletter + Redes */}
        <section className="gf-col gf-news" aria-label="Boletín y redes sociales">
          <h4 className="gf-h4">Nuestras Redes Sociales</h4>
          <div className="gf-social">
            <a className="gf-sbtn" aria-label="TikTok" href="#" />
            <a className="gf-sbtn gf-ig" aria-label="Instagram" href="#" />
            <a className="gf-sbtn gf-fb" aria-label="Facebook" href="#" />
            <a className="gf-sbtn gf-li" aria-label="LinkedIn" href="#" />
          </div>
        </section>
      </div>
    </footer>
  );
}
