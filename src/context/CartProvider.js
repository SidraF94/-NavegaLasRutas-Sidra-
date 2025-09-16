import React, { useState, useEffect } from 'react';
import CartContext from './CartContext';
import useSessionStorage from '../hooks/useSessionStorage';
import { STORAGE_KEYS } from '../utils/constants';
import useStockOperations from '../hooks/useStockOperations';
import { 
  createCartItem, 
  calculateTotalItems, 
  calculateTotalPrice, 
  findCartItem, 
  updateItemQuantity 
} from '../utils/cartHelpers';

const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useSessionStorage(STORAGE_KEYS.CARRITO, []);
  const [total, setTotal] = useState(0);
  const { reduceStock, restoreStock } = useStockOperations();

  useEffect(() => {
    setTotal(calculateTotalPrice(carrito));
  }, [carrito]);

  const addItem = async (item, quantity = 1) => {
    try {
      const stockReduced = await reduceStock(item.id, quantity);
      if (!stockReduced) {
        return false;
      }

      setCarrito(prevCarrito => {
        const existe = findCartItem(prevCarrito, item.id);
        
        if (existe) {
          return updateItemQuantity(prevCarrito, item.id, quantity);
        } else {
          return [...prevCarrito, createCartItem(item, quantity)];
        }
      });
      return true;
    } catch (error) {
      console.error('Error al agregar item al carrito:', error);
      return false;
    }
  };

  const removeItem = async (itemId) => {
    const itemAQuitar = findCartItem(carrito, itemId);
    if (!itemAQuitar) return;
    
    await restoreStock(itemId, itemAQuitar.cantidad);
    setCarrito(prevCarrito => 
      prevCarrito.filter(item => item.id !== itemId)
    );
  };

  const clear = async () => {
    await Promise.all(
      carrito.map(item => restoreStock(item.id, item.cantidad))
    );

    setCarrito([]);
  };

  const pagar = async () => {
    try {
      const { crearCompra } = await import('../firebase/comprasService');
      
      const compraData = {
        items: carrito,
        total: total,
        cantidadItems: calculateTotalItems(carrito),
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
    return findCartItem(carrito, id) !== undefined;
  };

  const getItemQuantity = (id) => {
    const item = findCartItem(carrito, id);
    return item ? item.cantidad : 0;
  };

  const getTotalItems = () => {
    return calculateTotalItems(carrito);
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
