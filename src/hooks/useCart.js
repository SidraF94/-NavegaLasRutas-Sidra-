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
    
    const stockId = item.idOriginal || item.id;
    const stockActual = parseInt(sessionStorage.getItem(`stock_${stockId}`) || STOCK_INICIAL.toString());
    const nuevoStock = Math.max(0, stockActual - cantidad);
    sessionStorage.setItem(`stock_${stockId}`, nuevoStock.toString());
    
    window.dispatchEvent(new CustomEvent('carritoActualizado', { 
      detail: { carrito: carritoActual } 
    }));
    
    return carritoActual;
  };

  const quitarItem = (id) => {
    const itemAQuitar = carrito.find(item => item.id === id);
    if (!itemAQuitar) return;

    const stockId = itemAQuitar.idOriginal || id;
    const stockActual = parseInt(sessionStorage.getItem(`stock_${stockId}`) || '0');
    const stockRestaurado = stockActual + itemAQuitar.cantidad;
    sessionStorage.setItem(`stock_${stockId}`, stockRestaurado.toString());
    
    const carritoActualizado = carrito.filter(item => item.id !== id);
    setCarrito(carritoActualizado);
    
    window.dispatchEvent(new CustomEvent('carritoActualizado'));
    
    return carritoActualizado;
  };

  const limpiarCarrito = () => {
    carrito.forEach(item => {
      const stockId = item.idOriginal || item.id;
      const stockActual = parseInt(sessionStorage.getItem(`stock_${stockId}`) || '0');
      const stockRestaurado = stockActual + item.cantidad;
      sessionStorage.setItem(`stock_${stockId}`, stockRestaurado.toString());
    });

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