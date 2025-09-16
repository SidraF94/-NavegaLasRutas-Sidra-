import { useState, useEffect } from 'react';
import useSweetAlert from './useSweetAlert';
import useCartContext from './useCartContext';
import { useStock } from './useStock';

const useItem = (item) => {
  const [addingToCart, setAddingToCart] = useState(false);
  const { showAddToCart } = useSweetAlert();
  const { addItem } = useCartContext();
  const { stock, reduceStock, isAvailable } = useStock(item.id, item.stock || 50);

  const agregarAlCarrito = async () => {
    if (addingToCart || !isAvailable(1)) return;
    
    setAddingToCart(true);
    try {
      const exito = await addItem(item, 1);
      if (exito) {
        showAddToCart(item.titulo, 1);
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  return {
    stockActual: stock,
    agregarAlCarrito,
    addingToCart
  };
};

export default useItem;
