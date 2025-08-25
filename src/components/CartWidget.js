import React, { useState, useEffect } from "react";
import "./CartWidget.css";

/* Componente para el carrito de compras, consta de un div con un emoji de carrito y un span con el contador de productos */ 

const CartWidget = ({ modoNocturno, onAbrirCarrito }) => {
  const [cantidadTotal, setCantidadTotal] = useState(0);

  // Función para calcular la cantidad total del carrito
  const calcularCantidadTotal = () => {
    const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]');
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    setCantidadTotal(total);
  };

  // Escuchar cambios en el carrito
  useEffect(() => {
    // Calcular cantidad inicial
    calcularCantidadTotal();

    // Escuchar evento personalizado de actualización del carrito
    const handleCarritoActualizado = () => {
      calcularCantidadTotal();
    };

    window.addEventListener('carritoActualizado', handleCarritoActualizado);

    // limpieza
    return () => {
      window.removeEventListener('carritoActualizado', handleCarritoActualizado);
    };
  }, []);

  // Función para abrir la barra lateral del carrito
  const abrirCarrito = () => {
    if (onAbrirCarrito) {
      onAbrirCarrito();
    }
  };

  return (
    <div className="widget-carrito-container">
      <div className="widget-carrito" onClick={abrirCarrito} style={{ cursor: 'pointer' }}>
        <div className="icono-carrito">
          🛒
          <span className="contador-carrito">{cantidadTotal}</span>
        </div>
      </div>
      

    </div>
  );
};

export default CartWidget; 