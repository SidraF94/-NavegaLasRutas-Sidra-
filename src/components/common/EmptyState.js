import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyState.css';

const EmptyState = ({ 
  titulo = "No hay elementos",
  mensaje = "No se encontraron elementos para mostrar",
  botonTexto = "Volver al inicio",
  botonRuta = "/",
  icono = "😔",
  modoNocturno = false 
}) => {
  return (
    <div className={`empty-state-container ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="empty-icon">{icono}</div>
      <h2 className="empty-titulo">{titulo}</h2>
      <p className="empty-mensaje">{mensaje}</p>
      {botonTexto && botonRuta && (
        <Link to={botonRuta} className="empty-boton">
          🏠 {botonTexto}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
