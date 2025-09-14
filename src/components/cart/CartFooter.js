import React from 'react';
import Boton from '../ui/Boton';
import { formatearPrecio } from '../../utils/formatters';
import './CartFooter.css';

const CartFooter = ({ 
  total, 
  onLimpiar, 
  onPagar, 
  modoNocturno,
  showPagar = true
}) => {
  return (
    <div className={`cart-footer ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="cart-total">
        <span>Total:</span>
        <span className="total-precio">{formatearPrecio(total)}</span>
      </div>
      
      <div className="cart-acciones">
        <Boton 
          onClick={onLimpiar}
          className="boton-limpiar"
        >
          🗑️ Limpiar
        </Boton>
        
        {showPagar && (
          <Boton 
            onClick={onPagar}
            className="boton-pagar"
          >
            💳 Pagar
          </Boton>
        )}
      </div>
    </div>
  );
};

export default CartFooter;
