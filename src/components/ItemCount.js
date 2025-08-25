import React, { useState } from 'react';
import Boton from './Boton';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [cantidad, setCantidad] = useState(initial);

  // Incrementar cantidad (máximo hasta el stock disponible)
  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  // Decrementar cantidad (mínimo 1)
  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  // Agregar al carrito con la cantidad seleccionada
  const agregarAlCarrito = () => {
    onAdd(cantidad);
  };

  return (
    <div className="item-count-container">
      {/* Controles de cantidad */}
      <div className="controles-cantidad">
        <Boton 
          onClick={decrementar}
          disabled={cantidad <= 1}
          className="boton-cantidad"
        >
          -
        </Boton>
        
        <span className="cantidad-display">{cantidad}</span>
        
        <Boton 
          onClick={incrementar}
          disabled={cantidad >= stock}
          className="boton-cantidad"
        >
          +
        </Boton>
      </div>

      {/* Stock disponible */}
      <p className="stock-disponible">
        Stock disponible: <strong>{stock}</strong>
      </p>

      {/* Botón agregar al carrito */}
      <Boton 
        onClick={agregarAlCarrito}
        disabled={stock === 0}
        className="boton-agregar-carrito"
      >
        🛒 Agregar al Carrito ({cantidad})
      </Boton>

      {/* Mensaje si no hay stock */}
      {stock === 0 && (
        <p className="sin-stock">❌ Sin stock disponible</p>
      )}
    </div>
  );
};

export default ItemCount;
