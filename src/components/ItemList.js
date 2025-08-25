import React from 'react';
import Item from './Item';
import './ItemList.css';

/* - Aplica la referencia lastEmojiRef solo al ultimo emoji de la lista
  - lastEmojiRef es la función callback para el infinite scroll*/
const ItemList = ({ items, modoNocturno, lastEmojiRef }) => {
  // Si no hay items, mostrar mensaje de carga
  if (!items || items.length === 0) {
    return (
      <div className={`item-list-empty ${modoNocturno ? 'modo-nocturno' : ''}`}>
        <div className="loading-spinner">🔄</div>
        <p>Cargando emojis...</p>
      </div>
    );
  }

  return (
    <div className={`item-list-container ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="item-grid">
        {items.map((item, index) => (
          // Solo el ultimo emoji (items.length - 1) recibe la referencia lastEmojiRef
          <div key={`emoji-${index}`} ref={index === items.length - 1 ? lastEmojiRef : null}>
            <Item item={item} modoNocturno={modoNocturno} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
