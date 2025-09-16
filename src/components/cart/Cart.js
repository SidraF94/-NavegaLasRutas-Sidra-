import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartContext from '../../hooks/useCartContext';
import useSweetAlert from '../../hooks/useSweetAlert';
import CartItem from './CartItem';
import CartFooter from './CartFooter';
import CartEmpty from './CartEmpty';
import './Cart.css';

const Cart = ({ modoNocturno }) => {
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
  const navigate = useNavigate();

  const handleQuitarItem = async (id) => {
    const itemAQuitar = carrito.find(item => item.id === id);
    if (!itemAQuitar) return;

    await removeItem(id);
    showRemoveFromCart(itemAQuitar.titulo);
  };

  const handleLimpiarCarrito = async () => {
    const result = await showClearCartConfirm();

    if (result.isConfirmed) {
      await clear();
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
      await showPaymentProcessing();

      try {
        const compraId = await pagar();
        const compraData = {
          id: compraId,
          items: carrito,
          total: total,
          fecha: new Date()
        };
        await showPaymentSuccess(total, compraId, compraData);
        navigate('/');
      } catch (error) {
        console.error('Error al procesar la compra:', error);
      }
    }
  };

  return (
    <div className={`cart-page ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">🛒 Mi Carrito de Compras</h1>
          <Link to="/" className="volver-tienda">
            ← Volver a la Tienda
          </Link>
        </div>

        {carrito.length === 0 ? (
          <CartEmpty modoNocturno={modoNocturno} />
        ) : (
          <>
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2>Productos en tu carrito ({carrito.length})</h2>
                <button 
                  onClick={handleLimpiarCarrito}
                  className="limpiar-carrito-btn"
                >
                  🗑️ Limpiar Carrito
                </button>
              </div>

              <div className="cart-items">
                {carrito.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuitar={handleQuitarItem}
                    modoNocturno={modoNocturno}
                  />
                ))}
              </div>
            </div>

            <CartFooter
              total={total}
              onLimpiar={handleLimpiarCarrito}
              onPagar={handlePagar}
              modoNocturno={modoNocturno}
              showPagar={true}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
