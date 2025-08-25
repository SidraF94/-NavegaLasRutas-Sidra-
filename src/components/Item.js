import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Boton from './Boton';
import './Item.css';

const Item = ({ item, modoNocturno }) => {
  const { id, titulo, descripcion, precio, imagenUrl } = item;
  const navigate = useNavigate();
  const [stockActual, setStockActual] = useState(50);

  // Función para formatear el precio en pesos argentinos
  const formatearPrecio = (precio) => {
    // Intl.NumberFormat es la API de JavaScript para formatear números
    // 'es-AR' = formato estándar de Argentina
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',           // Agrega símbolo $
      currency: 'ARS',             // Peso Argentino
      minimumFractionDigits: 0,    // No mostrar centavos
      maximumFractionDigits: 0     
    }).format(precio);             // Aplica el formato al precio recibido
  };

  const irADetalle = () => {
    navigate(`/item/${id}`);
  };

  // Stock con sessionStorage
  useEffect(() => {
    const stockGuardado = parseInt(sessionStorage.getItem(`stock_${id}`) || '50');
    setStockActual(stockGuardado);
  }, [id]);

  // Escuchar eventos de actualización del carrito para sincronizar stock
  useEffect(() => {
    const handleCarritoActualizado = () => {
      const stockGuardado = parseInt(sessionStorage.getItem(`stock_${id}`) || '50');
      setStockActual(stockGuardado);
    };

    window.addEventListener('carritoActualizado', handleCarritoActualizado);
    return () => {
      window.removeEventListener('carritoActualizado', handleCarritoActualizado);
    };
  }, [id]);

  return (
    <div className="item-card">
      <div className="item-emoji" onClick={irADetalle} style={{ cursor: 'pointer' }}>
        <span className="emoji-display">{imagenUrl}</span>
      </div>
      
      <div className="item-info">
        <h3 className="item-title">{titulo}</h3>
        <p className="item-description">{descripcion}</p>
        <div className="item-price">
          <span className="price-amount">{formatearPrecio(precio)}</span>
        </div>
        
        {/* Indicador de stock */}
        <div className="item-stock">
          <span className="stock-label">Stock:</span>
          <span className="stock-amount">{stockActual}</span>
        </div>
        
        <div className="item-actions">
          <Boton 
            onClick={irADetalle}
            className="boton-ver-detalle"
          >
            Ver Detalle
          </Boton>
          
          <Boton 
            onClick={() => {
              // Obtener carrito actual del sessionStorage
              const carritoActual = JSON.parse(sessionStorage.getItem('carrito') || '[]');
              
              // Buscar si el item ya existe en el carrito
              const itemExistente = carritoActual.find(cartItem => cartItem.id === id);
              
              if (itemExistente) {
                // Si ya existe, incrementar cantidad en 1
                itemExistente.cantidad += 1;
              } else {
                // Si no existe, agregar nuevo item con cantidad 1
                carritoActual.push({
                  id: id,
                  titulo: titulo,
                  precio: precio,
                  imagenUrl: imagenUrl,
                  cantidad: 1
                });
              }
              
              // Guardar en sessionStorage
              sessionStorage.setItem('carrito', JSON.stringify(carritoActual));
              
              // Actualizar stock local y en sessionStorage
              const nuevoStock = Math.max(0, stockActual - 1);
              setStockActual(nuevoStock);
              sessionStorage.setItem(`stock_${id}`, nuevoStock.toString());
              
              // Disparar evento personalizado para actualizar el CartWidget
              window.dispatchEvent(new CustomEvent('carritoActualizado', { 
                detail: { carrito: carritoActual } 
              }));
              
              // Mostrar confirmación con SweetAlert2
              Swal.fire({
                title: '¡Agregado al carrito!',
                text: `Se agregó 1 unidad de ${titulo}`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
              });
            }}
            disabled={stockActual === 0}
            className="boton-agregar-carrito"
          >
            {stockActual === 0 ? '❌ Sin Stock' : '🛒 Agregar'}
          </Boton>
        </div>
      </div>
    </div>
  );
};

export default Item;
