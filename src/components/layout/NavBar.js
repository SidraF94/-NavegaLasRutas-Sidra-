import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "../cart/CartWidget";
import BotonModoNocturno from "./BotonModoNocturno";
import CarritoLateral from "../cart/CarritoLateral";
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
        <div className="navbar-logo">
          <Link to="/" onClick={cerrarMenu}>
            <img 
              src={process.env.PUBLIC_URL + "/logo-tiendaemoji.png"} 
              alt="TiendaEmoji Logo" 
              className="logo-imagen"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
        
        <button 
          className={`hamburger ${menuAbierto ? 'activo' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú de navegación"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`navbar-menu ${menuAbierto ? 'activo' : ''}`}>
          <li>
            <NavLink 
              to="/" 
              onClick={cerrarMenu}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/sobre-nosotros" 
              onClick={cerrarMenu}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Sobre Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contacto" 
              onClick={cerrarMenu}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Contacto
            </NavLink>
          </li>
        </ul>
        
        <div className="navbar-widgets">
          <Link to="/cart" className="cart-widget-link">
            <CartWidget modoNocturno={modoNocturno} />
          </Link>
          
          <BotonModoNocturno 
            modoNocturno={modoNocturno}
            cambiarModo={cambiarModoNocturno} 
          />
        </div>
      </div>
      
      <CarritoLateral 
        isOpen={carritoAbierto}
        onClose={() => setCarritoAbierto(false)}
        modoNocturno={modoNocturno}
      />
    </nav>
  );
};

export default NavBar;