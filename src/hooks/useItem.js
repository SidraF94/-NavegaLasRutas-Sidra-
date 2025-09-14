import { useState, useEffect } from 'react';
import useSweetAlert from './useSweetAlert';
import useCartContext from './useCartContext';
import { getStockDisponible } from '../utils/stockManager';

const useItem = (item) => {
  const [stockActual, setStockActual] = useState(0);
  const { showAddToCart } = useSweetAlert();
  const { addItem } = useCartContext();

  useEffect(() => {
    const stock = getStockDisponible(item.id);
    setStockActual(stock);
  }, [item.id]);

  useEffect(() => {
    const handleStockActualizado = (event) => {
      if (event.detail.itemId === item.id) {
        setStockActual(event.detail.nuevoStock);
      }
    };

    window.addEventListener('stockActualizado', handleStockActualizado);
    return () => {
      window.removeEventListener('stockActualizado', handleStockActualizado);
    };
  }, [item.id]);

  const agregarAlCarrito = () => {
    const exito = addItem(item, 1);
    if (exito) {
      showAddToCart(item.titulo, 1);
    }
  };

  return {
    stockActual,
    agregarAlCarrito
  };
};

export default useItem;
