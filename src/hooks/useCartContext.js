import { useContext } from 'react';
import CartContext from '../context/CartContext';

const useCartContext = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCartContext debe ser usado dentro de CartProvider');
  }
  
  return context;
};

export default useCartContext;
