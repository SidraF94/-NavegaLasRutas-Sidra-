import React from 'react';
import './BotonModoNocturno.css';

const BotonModoNocturno = ({ modoNocturno, cambiarModo }) => {
  return (
    <button 
      className={`boton-modo-nocturno ${modoNocturno ? 'activo' : ''}`}
      onClick={cambiarModo}
      title={modoNocturno ? 'Cambiar a modo claro' : 'Cambiar a modo nocturno'}
    >
      {modoNocturno ? '☀️' : '🌙'}
    </button>
  );
};

export default BotonModoNocturno; 