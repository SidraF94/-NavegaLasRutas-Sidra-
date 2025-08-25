import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import BotonModoNocturno from "./BotonModoNocturno";
import CarritoLateral from "./CarritoLateral";
import "./NavBar.css";

const NavBar = ({ modoNocturno, cambiarModoNocturno }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className={`navbar ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="navbar-container">
        {/* Logo de la tienda - Hace navegación al inicio */}
        <div className="navbar-logo">
          <Link to="/" onClick={cerrarMenu}>
            <img 
              src="/logo-tiendaemoji.png" 
              alt="TiendaEmoji Logo" 
              className="logo-imagen"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
        
        {/* Botón hamburguesa para móviles */}
        <button 
          className={`hamburger ${menuAbierto ? 'activo' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Menú de navegación principal */}
        <ul className={`navbar-menu ${menuAbierto ? 'activo' : ''}`}>
          <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
          <li><Link to="/" onClick={cerrarMenu}>Productos</Link></li>
          <li><Link to="/sobre-nosotros" onClick={cerrarMenu}>Sobre Nosotros</Link></li>
          <li><Link to="/contacto" onClick={cerrarMenu}>Contacto</Link></li>
        </ul>
        
        {/* Contenedor de widgets (carrito + modo nocturno) */}
        <div className="navbar-widgets">
          <CartWidget 
            modoNocturno={modoNocturno}
            onAbrirCarrito={() => setCarritoAbierto(true)}
          />
          
          <BotonModoNocturno 
            modoNocturno={modoNocturno}
            cambiarModo={cambiarModoNocturno} 
          />
        </div>
      </div>
      
      {/* Barra lateral del carrito */}
      <CarritoLateral 
        isOpen={carritoAbierto}
        onClose={() => setCarritoAbierto(false)}
        modoNocturno={modoNocturno}
      />
    </nav>
  );
};

export default NavBar; 