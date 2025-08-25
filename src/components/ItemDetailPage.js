import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Boton from './Boton';
import ItemCount from './ItemCount';
import './ItemDetailPage.css';

const ItemDetailPage = ({ modoNocturno }) => {
  //useParams y useNavigate son hooks de react-router-dom
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  //setLoading para que no se muestre el loading hasta que se cargue el item
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estado para forzar re-render del ItemCount cuando cambie el stock
  const [stockActual, setStockActual] = useState(50);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Importar los datos de emojis desde el archivo emojis.json
        const emojisData = await import('../data/emojis.json');
        const foundItem = emojisData.default.find(emoji => emoji.id === parseInt(id)); 
        
        if (foundItem) {
          setItem(foundItem);
        } else {
          setError('Emoji no encontrado');
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el emoji');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(precio);
  };

  const volverAProductos = () => {
    navigate('/');
  };

  // Función para manejar agregar al carrito
  const agregarAlCarrito = (cantidad) => {
    if (item) {
      // Obtener carrito actual del sessionStorage
      const carritoActual = JSON.parse(sessionStorage.getItem('carrito') || '[]');
      
      // Buscar si el item ya existe en el carrito
      const itemExistente = carritoActual.find(cartItem => cartItem.id === item.id);
      
      if (itemExistente) {
        // Si ya existe actualizar cantidad
        itemExistente.cantidad += cantidad;
      } else {
        // Si no existe agregar nuevo item
        carritoActual.push({
          id: item.id,
          titulo: item.titulo,
          precio: item.precio,
          imagenUrl: item.imagenUrl,
          cantidad: cantidad
        });
      }
      
      // Guardar en sessionStorage
      sessionStorage.setItem('carrito', JSON.stringify(carritoActual));
      
      // Actualizar stock
      const stockActual = parseInt(sessionStorage.getItem(`stock_${item.id}`) || '50');
      const nuevoStock = Math.max(0, stockActual - cantidad);
      sessionStorage.setItem(`stock_${item.id}`, nuevoStock.toString());
      
      // Actualizar estado local para forzar re-render del ItemCount
      setStockActual(nuevoStock);
      
      // Disparar evento personalizado para actualizar el CartWidget
      window.dispatchEvent(new CustomEvent('carritoActualizado', { 
        detail: { carrito: carritoActual } 
      }));
      
      // Mostrar confirmación con SweetAlert2
      Swal.fire({
        title: '¡Agregado al carrito!',
        text: `Se agregaron ${cantidad} unidades de ${item.titulo}`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
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

        {/* Contenido principal */}
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
                <span className="info-value">#{id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Categoría:</span>
                <span className="info-value">Emoji</span>
              </div>
              <div className="info-item">
                <span className="info-label">Disponibilidad:</span>
                <span className="info-value disponible">✅ En Stock</span>
              </div>
              <div className="info-item">
                <span className="info-label">Envío:</span>
                <span className="info-value">🚚 Gratis en Argentina</span>
              </div>
            </div>

            <div className="item-detail-actions">
              <ItemCount 
                stock={stockActual} // Stock actualizado en tiempo real
                initial={1}
                onAdd={agregarAlCarrito}
              />
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ItemDetailPage;
