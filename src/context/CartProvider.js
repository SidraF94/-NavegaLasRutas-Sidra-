import React, { useState, useEffect } from 'react';
import CartContext from './CartContext';
import useSessionStorage from '../hooks/useSessionStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { updateEmojiStock, getEmojiById } from '../firebase/emojisService';

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useSessionStorage(STORAGE_KEYS.CARRITO, []);
  const [total, setTotal] = useState(0);

  const calcularTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  useEffect(() => {
    setTotal(calcularTotal(carrito));
  }, [carrito]);

  const addItem = async (item, quantity = 1) => {
    try {
      const emojiData = await getEmojiById(item.id);
      if (!emojiData || emojiData.stock < quantity) {
        return false;
      }

      const nuevoStock = emojiData.stock - quantity;
      await updateEmojiStock(item.id, nuevoStock);

      setCarrito(prevCarrito => {
        const existe = prevCarrito.find(cartItem => cartItem.id === item.id);
        
        if (existe) {
          const nuevoCarrito = prevCarrito.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, cantidad: cartItem.cantidad + quantity }
              : cartItem
          );
          
          window.dispatchEvent(new CustomEvent('stockActualizado', { 
            detail: { itemId: item.id, nuevoStock } 
          }));
          
          return nuevoCarrito;
        } else {
          const nuevoCarrito = [...prevCarrito, {
            id: item.id,
            titulo: item.titulo,
            precio: item.precio,
            imagenUrl: item.imagenUrl,
            cantidad: quantity
          }];
          
          window.dispatchEvent(new CustomEvent('stockActualizado', { 
            detail: { itemId: item.id, nuevoStock } 
          }));
          
          return nuevoCarrito;
        }
      });
      return true;
    } catch (error) {
      console.error('Error al agregar item al carrito:', error);
      return false;
    }
  };

  const removeItem = async (itemId) => {
    const itemAQuitar = carrito.find(item => item.id === itemId);
    if (!itemAQuitar) return;
    
    try {
      const emojiData = await getEmojiById(itemId);
      if (emojiData) {
        const nuevoStock = emojiData.stock + itemAQuitar.cantidad;
        await updateEmojiStock(itemId, nuevoStock);
        
        window.dispatchEvent(new CustomEvent('stockActualizado', { 
          detail: { itemId, nuevoStock } 
        }));
      }
    } catch (error) {
      console.error('Error al restaurar stock:', error);
    }
    
    setCarrito(prevCarrito => {
      const nuevoCarrito = prevCarrito.filter(item => item.id !== itemId);
      return nuevoCarrito;
    });
  };

    const clear = async () => {
    for (const item of carrito) {
      try {
        const emojiData = await getEmojiById(item.id);
        if (emojiData) {
          const nuevoStock = emojiData.stock + item.cantidad;
          await updateEmojiStock(item.id, nuevoStock);
          
          window.dispatchEvent(new CustomEvent('stockActualizado', { 
            detail: { itemId: item.id, nuevoStock } 
          }));
        }
      } catch (error) {
        console.error('Error al restaurar stock:', error);
      }
    }

    setCarrito([]);
  };

  const pagar = async () => {
    try {
      const { crearCompra } = await import('../firebase/comprasService');
      
      const compraData = {
        items: carrito,
        total: total,
        cantidadItems: carrito.reduce((sum, item) => sum + item.cantidad, 0),
        fecha: new Date()
      };
      
      const compra = await crearCompra(compraData);
      
      setCarrito([]);
      
      return compra.id;
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      throw error;
    }
  };

  const isInCart = (id) => {
    return carrito.some(item => item.id === id);
  };

  const getItemQuantity = (id) => {
    const item = carrito.find(item => item.id === id);
    return item ? item.cantidad : 0;
  };

  const getTotalItems = () => {
    return carrito.reduce((sum, item) => sum + item.cantidad, 0);
  };

  const value = {
    carrito,
    total,
    addItem,
    removeItem,
    clear,
    pagar,
    isInCart,
    getItemQuantity,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
