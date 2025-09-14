import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import './InfiniteScrollTrigger.css';

const InfiniteScrollTrigger = ({ 
  hayMas = false, 
  cargando = false, 
  modoNocturno = false 
}) => {
  if (!hayMas) return null;

  return (
    <div className={`infinite-scroll-trigger ${modoNocturno ? 'modo-nocturno' : ''}`}>
      {cargando ? (
        <LoadingSpinner 
          mensaje="Cargando más emojis..."
          modoNocturno={modoNocturno}
          tamaño="pequeño"
        />
      ) : (
        <div className="scroll-indicator">
          <span className="scroll-icon">⏳</span>
          <p>Desplázate para cargar más</p>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollTrigger;
