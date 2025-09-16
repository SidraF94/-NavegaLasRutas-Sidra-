import React from 'react';
import Boton from '../ui/Boton';
import './ItemActions.css';

const ItemActions = ({ 
  onVerDetalle, 
  onAgregarCarrito, 
  stockActual, 
  modoNocturno,
  disabled = false
}) => {
  return (
    <div className={`item-actions ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <Boton 
        onClick={onVerDetalle}
        className="boton-ver-detalle"
      >
        Ver Detalle
      </Boton>
      
      <Boton 
        onClick={onAgregarCarrito}
        disabled={disabled || stockActual === 0}
        className="boton-agregar-carrito"
      >
        {disabled ? '⏳ Agregando...' : stockActual === 0 ? '❌ Sin Stock' : '🛒 Agregar'}
      </Boton>
    </div>
  );
};

export default ItemActions;
