// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Layout / UI
import Header from "./components/Header";

// Secciones (home)
import Hero from "./sections/Hero";
import QuienesSomos from "./sections/QuienesSomos";
{/*import Vision from "./sections/Vision";
import Productos from "./sections/Productos";
import Servicios from "./sections/Servicios";
import RedesSociales from "./sections/RedesSociales";
import Eventos from "./sections/Eventos";
import Clientes from "./sections/Clientes";
import Contacto from "./sections/Contacto";*/}

// Páginas
import EcoRural from "./pages/EcoRural";
import DigitalPlus from "./pages/DigitalPlus";
import MegaPrint from "./pages/MegaPrint";

// Intro
import IntroVideo from "./components/IntroVideo";

// Estilos globales
import "./index.css";

function Home() {
  const [showIntro] = useState(true);
  const IntroVideoAny = IntroVideo as any;

  return (
    <>
      <Header />

      {showIntro && (
        <IntroVideoAny
          targetId="hero"  
        />
      )}

      <main>
        <Hero />

        <QuienesSomos />
        {/*<Vision />
        <Productos />
        <Servicios />
        <RedesSociales />
        <Eventos />
        <Clientes />*/}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Páginas internas */}
        <Route path="/ecorural" element={<EcoRural />} />
        <Route path="/digitalplus" element={<DigitalPlus />} />
        <Route path="/megaprint" element={<MegaPrint />} />

        {/* Contacto (si quieres con header compartido puedes envolverlo en un layout) 
        <Route path="/contacto" element={<Contacto />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
