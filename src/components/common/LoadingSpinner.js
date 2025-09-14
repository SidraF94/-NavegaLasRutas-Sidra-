import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  mensaje = "Cargando...", 
  modoNocturno = false, 
  tamaño = "normal" 
}) => {
  return (
    <div className={`loading-spinner-container ${modoNocturno ? 'modo-nocturno' : ''} ${tamaño}`}>
      <div className="loading-spinner">⏳</div>
      <p className="loading-mensaje">{mensaje}</p>
    </div>
  );
};

export default LoadingSpinner;
