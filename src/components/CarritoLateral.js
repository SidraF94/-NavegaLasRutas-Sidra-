import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Boton from './Boton';
import './CarritoLateral.css';

const CarritoLateral = ({ isOpen, onClose, modoNocturno }) => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Función para formatear el precio en pesos argentinos
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(precio);
  };

  // Función para calcular el total del carrito
  const calcularTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  // Función para cargar el carrito desde sessionStorage
  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(sessionStorage.getItem('carrito') || '[]');
    setCarrito(carritoGuardado);
    setTotal(calcularTotal(carritoGuardado));
  };

  // Función para quitar un item del carrito
  const quitarItem = (id) => {
    const itemAQuitar = carrito.find(item => item.id === id);
    if (!itemAQuitar) return;
    
    // Restaurar stock
    const stockActual = parseInt(sessionStorage.getItem(`stock_${id}`) || '0');
    const stockRestaurado = stockActual + itemAQuitar.cantidad;
    sessionStorage.setItem(`stock_${id}`, stockRestaurado.toString());
    
    // Quitar item del carrito
    const carritoActualizado = carrito.filter(item => item.id !== id);
    setCarrito(carritoActualizado);
    sessionStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    
    // Disparar evento para actualizar CartWidget
    window.dispatchEvent(new CustomEvent('carritoActualizado'));
    
    // Mostrar confirmación
    Swal.fire({
      title: '¡Item removido!',
      text: `${itemAQuitar.titulo} ha sido removido del carrito`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  // Función para limpiar carrito
  const limpiarCarrito = async () => {
    const result = await Swal.fire({
      title: '¿Limpiar carrito?',
      text: '¿Estás seguro de que quieres vaciar todo el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, limpiar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      // Restaurar todo el stock
      carrito.forEach(item => {
        const stockActual = parseInt(sessionStorage.getItem(`stock_${item.id}`) || '0');
        const stockRestaurado = stockActual + item.cantidad;
        sessionStorage.setItem(`stock_${item.id}`, stockRestaurado.toString());
      });

      // Limpiar carrito
      sessionStorage.removeItem('carrito');
      setCarrito([]);
      setTotal(0);
      
      // Esta linea crea y dispara un evento personalizado llamado 'carritoActualizado'
      // que permite que otros componentes (como CartWidget) se enteren de que el carrito cambio
      // y actualicen su estado automaticamente
      window.dispatchEvent(new CustomEvent('carritoActualizado'));
      
      Swal.fire(
        '¡Carrito limpiado!',
        'El carrito ha sido vaciado y el stock restaurado.',
        'success'
      );
    }
  };

  // Función para pagar
  const pagar = async () => {
    if (carrito.length === 0) {
      Swal.fire(
        'Carrito vacío',
        'Agrega productos al carrito antes de pagar.',
        'info'
      );
      return;
    }

    const result = await Swal.fire({
      title: '¿Confirmar compra?',
      html: `
        <div style="text-align: left;">
          <p><strong>Total a pagar:</strong> ${formatearPrecio(total)}</p>
          <p><strong>Productos:</strong> ${carrito.length}</p>
          <p><strong>Unidades totales:</strong> ${carrito.reduce((sum, item) => sum + item.cantidad, 0)}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '¡Pagar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      // Simular proceso de pago
      Swal.fire({
        title: 'Procesando pago...',
        text: 'Por favor espera...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Simular delay de pago
      setTimeout(() => {
        Swal.fire({
          title: '¡Pago exitoso!',
          text: `Tu pedido por ${formatearPrecio(total)} ha sido procesado correctamente.`,
          icon: 'success',
          confirmButtonText: '¡Genial!'
        });

        // Limpiar carrito después del pago
        sessionStorage.removeItem('carrito');
        setCarrito([]);
        setTotal(0);
        
        window.dispatchEvent(new CustomEvent('carritoActualizado'));
        
        // Cerrar barra lateral (onClose viene de Navbar)
        onClose();
      }, 2000);
    }
  };

  // Cargar carrito cuando se abre
  useEffect(() => {
    if (isOpen) {
      cargarCarrito();
    }
    //Si isOpen cambia, se ejecuta la funcion cargarCarrito
  }, [isOpen]);

  // Escuchar eventos de actualización del carrito
  useEffect(() => {
    // Función que se ejecuta cuando se dispara el evento 'carritoActualizado'
    const handleCarritoActualizado = () => {
      cargarCarrito(); // Recarga el carrito desde sessionStorage
    };

    // Agrego un listener al evento global carritoActualizado
    window.addEventListener('carritoActualizado', handleCarritoActualizado);
    
    // Función de limpieza que se ejecuta cuando el componente se desmonta para evitar memory leaks
    return () => {
      window.removeEventListener('carritoActualizado', handleCarritoActualizado);
    };
  }, []); // Array vacío significa que solo se ejecuta una vez al montar el componente

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay para cerrar al hacer click fuera */}
      <div className="carrito-overlay" onClick={onClose}></div>
      
      {/* Barra lateral */}
      <div className={`carrito-lateral ${modoNocturno ? 'modo-nocturno' : ''}`}>
        <div className="carrito-header">
          <h2>🛒 Mi Carrito</h2>
          <button className="cerrar-carrito" onClick={onClose}>
            ✕
          </button>
        </div>

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <div className="emoji-vacio">🛒</div>
            <p>Tu carrito está vacío</p>
            <p className="texto-secundario">Agrega algunos emojis para comenzar</p>
          </div>
        ) : (
          <>
            <div className="carrito-items">
              {carrito.map((item) => (
                // La prop key es obligatoria  para renderizar listas en React
                // React usa esta key para identificar unicamente cada elemento y optimizar re-renders
                // item.id es perfecto porque cada emoji tiene un ID unico. 
                <div key={item.id} className="carrito-item">
                   <div className="item-header">
                     <div className="item-emoji">
                       <span>{item.imagenUrl}</span>
                     </div>
                     
                     <div className="item-info">
                       <h4>{item.titulo}</h4>
                       <p className="item-precio">Precio unitario: {formatearPrecio(item.precio)}</p>
                     </div>
                     
                                           <button 
                        onClick={() => quitarItem(item.id)}
                        className="btn-quitar"
                        title="Quitar del carrito"
                      >
                        ❌
                      </button>
                   </div>
                   
                   <div className="item-footer">
                     <div className="item-cantidad">
                       <span className="cantidad-label">Cantidad:</span>
                                               <span className="cantidad-badge">{item.cantidad}</span>
                     </div>
                     
                     <div className="item-subtotal">
                       <span className="subtotal-label">Subtotal:</span>
                       <span className="subtotal-precio">{formatearPrecio(item.precio * item.cantidad)}</span>
                     </div>
                   </div>
                 </div>
              ))}
            </div>

            <div className="carrito-footer">
              <div className="carrito-total">
                <span>Total:</span>
                <span className="total-precio">{formatearPrecio(total)}</span>
              </div>
              
              <div className="carrito-acciones">
                <Boton 
                  onClick={limpiarCarrito}
                  className="boton-limpiar"
                >
                  🗑️ Limpiar
                </Boton>
                
                <Boton 
                  onClick={pagar}
                  className="boton-pagar"
                >
                  💳 Pagar
                </Boton>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarritoLateral;
