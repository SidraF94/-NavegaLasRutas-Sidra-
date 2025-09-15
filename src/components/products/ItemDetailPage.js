import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Boton from '../ui/Boton';
import ItemCount from '../cart/ItemCount';
import useSweetAlert from '../../hooks/useSweetAlert';
import { formatearPrecio } from '../../utils/formatters';
import useCartContext from '../../hooks/useCartContext';
import { getEmojiBySlug } from '../../firebase/emojisService';
import './ItemDetailPage.css';

const ItemDetailPage = ({ modoNocturno }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockActual, setStockActual] = useState(50);
  const { showAddToCart } = useSweetAlert();
  const { addItem, getTotalItems, isInCart } = useCartContext();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        
        const foundItem = await getEmojiBySlug(id);
        
        if (foundItem) {
          setItem(foundItem);
          // Usar el stock de Firestore directamente
          const stock = foundItem.stock || 50; // Fallback a 50 si no hay stock definido
          setStockActual(stock);
        } else {
          setError('Emoji no encontrado en Firestore');
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el emoji desde Firestore');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    const handleStockActualizado = (event) => {
      const stockId = item?.id;
      if (event.detail.itemId === stockId) {
        setStockActual(event.detail.nuevoStock);
      }
    };

    window.addEventListener('stockActualizado', handleStockActualizado);
    return () => {
      window.removeEventListener('stockActualizado', handleStockActualizado);
    };
  }, [id, item]);


  const volverAProductos = () => {
    navigate('/');
  };

  const terminarCompra = () => {
    navigate('/cart');
  };

  const agregarAlCarrito = (cantidad) => {
    if (item) {
      const exito = addItem(item, cantidad);
      if (exito) {
        showAddToCart(item.titulo, cantidad);
      }
    }
  };

  if (loading) {
    return (
      <div className={`item-detail-page ${modoNocturno ? 'modo-nocturno' : ''}`}>
        <div className="loading-container">
          <div className="loading-spinner">🔄</div>
          <h2>Cargando emoji...</h2>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className={`item-detail-page ${modoNocturno ? 'modo-nocturno' : ''}`}>
        <div className="error-container">
          <div className="error-icon">❌</div>
          <h2>¡Ups! Algo salió mal</h2>
          <p>{error || 'Emoji no encontrado'}</p>
          <Boton
            onClick={volverAProductos}
            className="boton-volver-productos"
          >
            🏠 Volver a Productos
          </Boton>
        </div>
      </div>
    );
  }

  const { titulo, descripcion, precio, imagenUrl } = item;

  return (
    <div className={`item-detail-page ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="item-detail-container">
        <div className="item-detail-header">
          <Boton 
            onClick={volverAProductos}
            className="boton-volver-header"
          >
            Volver a Productos
          </Boton>
          
          <h1 className="page-title">Detalle del Emoji</h1>
        </div>

        <div className="item-detail-content">
          <div className="item-detail-emoji-section">
            <div className="emoji-display-large">
              <span className="emoji-gigante">{imagenUrl}</span>
            </div>
          </div>

          <div className="item-detail-info-section">
            <h2 className="item-detail-titulo">{titulo}</h2>
            <p className="item-detail-descripcion">{descripcion}</p>
            
            <div className="item-detail-precio">
              <span className="precio-destacado">{formatearPrecio(precio)}</span>
            </div>

            <div className="item-detail-adicional">
              <div className="info-item">
                <span className="info-label">ID:</span>
                <span className="info-value">{item.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Categoría:</span>
                <span className="info-value">Emoji</span>
              </div>
              <div className="info-item">
                <span className="info-label">Disponibilidad:</span>
                <span className={`info-value ${stockActual > 0 ? 'disponible' : 'sin-stock'}`}>
                  {stockActual > 0 ? `✅ En Stock (${stockActual})` : '❌ Sin Stock'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Envío:</span>
                <span className="info-value">🚚 Gratis en Argentina</span>
              </div>
            </div>

            <div className="item-detail-actions">
              {!isInCart(item.id) && (
                <ItemCount 
                  stock={stockActual}
                  initial={1}
                  onAdd={agregarAlCarrito}
                />
              )}
              
              {isInCart(item.id) && (
                <div className="item-agregado-mensaje">
                  <p>✅ Producto agregado al carrito</p>
                  <Boton 
                    onClick={terminarCompra}
                    className="boton-terminar-compra"
                  >
                    🛒 Terminar mi compra ({getTotalItems()} items)
                  </Boton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;