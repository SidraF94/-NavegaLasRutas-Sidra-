import React from 'react';
import Item from './Item';
import './ItemList.css';

const ItemList = ({ items, modoNocturno, lastEmojiRef }) => {
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
          <div key={`emoji-${index}`} ref={index === items.length - 1 ? lastEmojiRef : null}>
            <Item item={item} modoNocturno={modoNocturno} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;