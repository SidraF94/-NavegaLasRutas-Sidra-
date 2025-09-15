import { useState, useEffect } from 'react';
import useSessionStorage from './useSessionStorage';
import { STORAGE_KEYS, STOCK_INICIAL } from '../utils/constants';

const useCart = () => {
  const [carrito, setCarrito] = useSessionStorage(STORAGE_KEYS.CARRITO, []);
  const [total, setTotal] = useState(0);

  const calcularTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const cargarCarrito = () => {
    setTotal(calcularTotal(carrito));
  };

  const agregarItem = (item, cantidad = 1) => {
    const carritoActual = [...carrito];
    const itemExistente = carritoActual.find(cartItem => cartItem.id === item.id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      carritoActual.push({
        id: item.id,
        titulo: item.titulo,
        precio: item.precio,
        imagenUrl: item.imagenUrl,
        cantidad: cantidad
      });
    }
    
    setCarrito(carritoActual);
    
    window.dispatchEvent(new CustomEvent('carritoActualizado', { 
      detail: { carrito: carritoActual } 
    }));
    
    return carritoActual;
  };

  const quitarItem = (id) => {
    const carritoActualizado = carrito.filter(item => item.id !== id);
    setCarrito(carritoActualizado);
    
    window.dispatchEvent(new CustomEvent('carritoActualizado'));
    
    return carritoActualizado;
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    setTotal(0);
    
    window.dispatchEvent(new CustomEvent('carritoActualizado'));
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  useEffect(() => {
    const handleCarritoActualizado = () => {
      cargarCarrito();
    };

    window.addEventListener('carritoActualizado', handleCarritoActualizado);

    return () => {
      window.removeEventListener('carritoActualizado', handleCarritoActualizado);
    };
  }, []);

  return {
    carrito,
    total,
    agregarItem,
    quitarItem,
    limpiarCarrito,
    cargarCarrito
  };
};

export default useCart;