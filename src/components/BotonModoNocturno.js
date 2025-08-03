import React from 'react';
import './BotonModoNocturno.css';

/*
  modoNocturno: booleano (true = nocturno). 
  Se pasa como prop desde App.js a todos los componentes
  Cada componente usa operador ternario para aplicar estilos
*/

const BotonModoNocturno = ({ modoNocturno, cambiarModo }) => {
  return (
    <button 
      // Agrega clase 'activo' si modoNocturno es true
      className={`boton-modo-nocturno ${modoNocturno ? 'activo' : ''}`}
      
      // Ejecuta función que cambia el estado
      onClick={cambiarModo}
      
      // Título dinámico
      title={modoNocturno ? 'Cambiar a modo claro' : 'Cambiar a modo nocturno'}
    >
      {/* Emoji dinámico */}
      {modoNocturno ? '☀️' : '🌙'}
    </button>
  );
};

export default BotonModoNocturno; 