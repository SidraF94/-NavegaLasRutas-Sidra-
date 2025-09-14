import React, { useState } from 'react';
import Boton from '../ui/Boton';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [cantidad, setCantidad] = useState(initial);

  React.useEffect(() => {
    if (cantidad > stock && stock > 0) {
      setCantidad(stock);
    } else if (stock === 0) {
      setCantidad(0);
    }
  }, [stock, cantidad]);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (stock > 0 && cantidad > 0) {
      onAdd(cantidad);
    }
  };

  return (
    <div className="item-count-container">
      <div className="controles-cantidad">
        <Boton 
          onClick={decrementar}
          disabled={cantidad <= 1 || stock === 0}
          className="boton-cantidad"
        >
          -
        </Boton>
        
        <span className="cantidad-display">{cantidad}</span>
        
        <Boton 
          onClick={incrementar}
          disabled={cantidad >= stock || stock === 0}
          className="boton-cantidad"
        >
          +
        </Boton>
      </div>

      <p className="stock-disponible">
        Stock disponible: <strong>{stock}</strong>
      </p>

      <Boton 
        onClick={agregarAlCarrito}
        disabled={stock === 0 || cantidad === 0}
        className="boton-agregar-carrito"
      >
        {stock === 0 ? '❌ Sin Stock' : `🛒 Agregar al Carrito (${cantidad})`}
      </Boton>

      {stock === 0 && (
        <p className="sin-stock">❌ Sin stock disponible</p>
      )}
    </div>
  );
};

export default ItemCount;