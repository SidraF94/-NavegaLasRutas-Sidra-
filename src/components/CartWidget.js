import React from "react";
import "./CartWidget.css";

/* Componente para el carrito de compras, consta de un div con un emoji de carrito y un span con el contador de productos */ 

const CartWidget = () => {
  return (
    <div className="widget-carrito">
      <div className="icono-carrito">
        🛒
        <span className="contador-carrito">0</span>
      </div>
    </div>
  );
};

export default CartWidget; 