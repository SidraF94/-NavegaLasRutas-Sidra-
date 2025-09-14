import React from 'react';
import './Boton.css';

const Boton = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  const botonClasses = `boton boton-medio ${className} ${disabled ? 'disabled' : ''}`.trim();

  return (
    <button
      className={botonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Boton;
