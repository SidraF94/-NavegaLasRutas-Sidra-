import React from "react";
import useCartContext from "../../hooks/useCartContext";
import "./CartWidget.css";

const CartWidget = ({ modoNocturno }) => {
  const { getTotalItems } = useCartContext();
  const totalItems = getTotalItems();

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="widget-carrito-container">
      <div className="widget-carrito">
        <div className="icono-carrito">
          🛒
          <span className="contador-carrito">{totalItems}</span>
        </div>
      </div>
    </div>
  );
};

export default CartWidget;