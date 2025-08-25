import React from 'react';
import { Link } from 'react-router-dom';
import './PaginaNoEncontrada.css';

const PaginaNoEncontrada = ({ modoNocturno }) => {
  return (
    <div className={`pagina-no-encontrada ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="error-container">
        <div className="error-icon">🔍</div>
        <h1>¡Ups! Página no encontrada</h1>
        <p>La página que estás buscando no existe o ha sido movida.</p>
        
        <div className="error-actions">
          <Link to="/" className="boton-principal">
            🏠 Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaginaNoEncontrada;
