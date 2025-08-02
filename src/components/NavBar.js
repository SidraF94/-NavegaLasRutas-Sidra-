import React from "react";
import CartWidget from "./CartWidget";
import BotonModoNocturno from "./BotonModoNocturno";
import "./NavBar.css";

const NavBar = ({ modoNocturno, cambiarModoNocturno }) => {
  // Función para navegar a secciones de la página
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      {/* behavior: "smooth" hace que la navegación sea suave */}
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="navbar-container">
        {/* Logo de la tienda - Hace scroll al inicio al hacer clic */}
        <div className="navbar-logo">
          <img 
            src="/logo-tiendaemoji.png" 
            alt="TiendaEmoji Logo" 
            className="logo-imagen"
            onClick={() => scrollToSection("inicio")}
            style={{ cursor: "pointer" }}
          />
        </div>
        
        {/* Menú de navegación principal */}
        <ul className="navbar-menu">
          {/* Enlace al inicio de la página */}
          <li><a onClick={() => scrollToSection("inicio")} style={{ cursor: "pointer" }}>Inicio</a></li>
          
          {/* Enlace a la sección de productos */}
          <li><a onClick={() => scrollToSection("productos")} style={{ cursor: "pointer" }}>Productos</a></li>
          
          {/* Enlace a la sección sobre nosotros */}
          <li><a onClick={() => scrollToSection("sobre-nosotros")} style={{ cursor: "pointer" }}>Sobre Nosotros</a></li>
          
          {/* Enlace a la sección de contacto */}
          <li><a onClick={() => scrollToSection("contacto")} style={{ cursor: "pointer" }}>Contacto</a></li>
        </ul>
        
        {/* Contenedor de widgets (carrito + modo nocturno) */}
        <div className="navbar-widgets">
          {/* Widget del carrito de compras */}
          <CartWidget />
          
          {/* Botón de modo nocturno */}
          <BotonModoNocturno 
            modoNocturno={modoNocturno} 
            cambiarModo={cambiarModoNocturno} 
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 