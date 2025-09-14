import React from 'react';
import { formatearPrecio } from '../../utils/formatters';
import './CartItem.css';

const CartItem = ({ item, onQuitar, modoNocturno }) => {
  const { id, titulo, precio, imagenUrl, cantidad } = item;

  return (
    <div className={`cart-item ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="item-header">
        <div className="item-emoji">
          <span>{imagenUrl}</span>
        </div>
        
        <div className="item-info">
          <h4>{titulo}</h4>
          <p className="item-precio">Precio unitario: {formatearPrecio(precio)}</p>
        </div>
        
        <button 
          onClick={() => onQuitar(id)}
          className="btn-quitar"
          title="Quitar del carrito"
        >
          ❌
        </button>
      </div>
      
      <div className="item-footer">
        <div className="item-cantidad">
          <span className="cantidad-label">Cantidad:</span>
          <span className="cantidad-badge">{cantidad}</span>
        </div>
        
        <div className="item-subtotal">
          <span className="subtotal-label">Subtotal:</span>
          <span className="subtotal-precio">{formatearPrecio(precio * cantidad)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
