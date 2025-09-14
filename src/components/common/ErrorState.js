import React from 'react';
import Boton from '../ui/Boton';
import './ErrorState.css';

const ErrorState = ({ 
  mensaje = "¡Ups! Algo salió mal", 
  error = "Error desconocido",
  onReintentar = null,
  modoNocturno = false 
}) => {
  return (
    <div className={`error-state-container ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="error-icon">❌</div>
      <h2 className="error-titulo">{mensaje}</h2>
      <p className="error-mensaje">{error}</p>
      {onReintentar && (
        <Boton 
          onClick={onReintentar}
          className="boton-reintentar"
        >
          🔄 Reintentar
        </Boton>
      )}
    </div>
  );
};

export default ErrorState;
