import React from 'react';
import { useNavigate } from 'react-router-dom';
import useItem from '../../hooks/useItem';
import ItemInfo from './ItemInfo';
import ItemActions from './ItemActions';
import './Item.css';

const Item = ({ item, modoNocturno }) => {
  const { id, titulo, descripcion, precio, imagenUrl, slug } = item;
  const navigate = useNavigate();
  const { stockActual, agregarAlCarrito } = useItem(item);

  const irADetalle = () => {
    // Usar slug si existe, sino usar id como fallback
    const routeId = slug || id;
    navigate(`/item/${routeId}`);
  };

  return (
    <div className="item-card">
      <div className="item-emoji" onClick={irADetalle} style={{ cursor: 'pointer' }}>
        <span className="emoji-display">{imagenUrl}</span>
      </div>
      
      <ItemInfo
        titulo={titulo}
        descripcion={descripcion}
        precio={precio}
        stockActual={stockActual}
        modoNocturno={modoNocturno}
      />
      
      <ItemActions
        onVerDetalle={irADetalle}
        onAgregarCarrito={agregarAlCarrito}
        stockActual={stockActual}
        modoNocturno={modoNocturno}
      />
    </div>
  );
};

export default Item;
