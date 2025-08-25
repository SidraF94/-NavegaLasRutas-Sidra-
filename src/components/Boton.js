import React from 'react';
import './Boton.css';

//Asignacion en destructuracion
const Boton = ({ children, onClick, className = '', type = 'button' }) => {
  const botonClasses = `boton boton-medio ${className}`.trim();

  return (
    <button
      className={botonClasses}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Boton;
