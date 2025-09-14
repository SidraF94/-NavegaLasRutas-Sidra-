import React from 'react';
import { Link } from 'react-router-dom';
import './CartEmpty.css';

const CartEmpty = ({ modoNocturno }) => {
  return (
    <div className={`cart-empty ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="emoji-vacio">🛒</div>
      <h2>Tu carrito está vacío</h2>
      <p className="texto-secundario">Agrega algunos emojis para comenzar tu compra</p>
      <Link to="/" className="boton-volver-tienda">
        🛍️ Ir a la Tienda
      </Link>
    </div>
  );
};

export default CartEmpty;
