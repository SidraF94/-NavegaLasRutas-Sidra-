import React from 'react';
import { formatearPrecio } from '../../utils/formatters';
import './ItemInfo.css';

const ItemInfo = ({ 
  titulo, 
  descripcion, 
  precio, 
  stockActual, 
  modoNocturno 
}) => {
  return (
    <div className={`item-info ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <h3 className="item-title">{titulo}</h3>
      <p className="item-description">{descripcion}</p>
      <div className="item-price">
        <span className="price-amount">{formatearPrecio(precio)}</span>
      </div>
      
      <div className="item-stock">
        <span className="stock-label">Stock:</span>
        <span className="stock-amount">{stockActual}</span>
      </div>
    </div>
  );
};

export default ItemInfo;
