import React, { useEffect } from 'react';
import useCartContext from '../../hooks/useCartContext';
import useSweetAlert from '../../hooks/useSweetAlert';
import useFormateo from '../../hooks/useFormateo';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import CartEmpty from './CartEmpty';
import './CarritoLateral.css';

const CarritoLateral = ({ isOpen, onClose, modoNocturno }) => {
  const { carrito, total, removeItem, clear, pagar } = useCartContext();
  const { 
    showRemoveFromCart, 
    showClearCart, 
    showClearCartConfirm, 
    showEmptyCart, 
    showPaymentConfirm, 
    showPaymentProcessing, 
    showPaymentSuccess 
  } = useSweetAlert();
  const { formatearPrecio } = useFormateo();

  useEffect(() => {
  }, [isOpen]);

  const handleQuitarItem = (id) => {
    const itemAQuitar = carrito.find(item => item.id === id);
    if (!itemAQuitar) return;
    
    removeItem(id);
    showRemoveFromCart(itemAQuitar.titulo);
  };

  const handleLimpiarCarrito = async () => {
    const result = await showClearCartConfirm();

    if (result.isConfirmed) {
      clear();
      showClearCart();
    }
  };

  const handlePagar = async () => {
    if (carrito.length === 0) {
      showEmptyCart();
      return;
    }

    const result = await showPaymentConfirm(total, carrito);

    if (result.isConfirmed) {
      // Mostrar procesando pago con timer automático
      await showPaymentProcessing();
      
      // Esperar a que se cierre automáticamente y luego mostrar éxito
      setTimeout(async () => {
        await showPaymentSuccess(total);
        pagar(); // Usar pagar() en lugar de clear() para restauración parcial
        onClose();
      }, 100); // Pequeño delay para asegurar que el modal anterior se cerró
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="carrito-overlay" onClick={onClose}></div>
      
      <div className={`carrito-lateral ${modoNocturno ? 'modo-nocturno' : ''}`}>
        <div className="carrito-header">
          <h2>🛒 Mi Carrito</h2>
          <button className="cerrar-carrito" onClick={onClose}>
            ✕
          </button>
        </div>

        {carrito.length === 0 ? (
          <CartEmpty modoNocturno={modoNocturno} />
        ) : (
          <>
            <div className="carrito-items">
              {carrito.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuitar={handleQuitarItem}
                  modoNocturno={modoNocturno}
                />
              ))}
            </div>

            <CartFooter
              total={total}
              onLimpiar={handleLimpiarCarrito}
              onPagar={handlePagar}
              modoNocturno={modoNocturno}
            />
          </>
        )}
      </div>
    </>
  );
};

export default CarritoLateral;