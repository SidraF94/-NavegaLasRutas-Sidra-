import React from 'react';
import Boton from '../ui/Boton';
import './EmojiSearch.css';

const EmojiSearch = ({ emoji, setEmoji, onSearch, loading, modoNocturno }) => {
  return (
    <div className={`emoji-search ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="input-group">
        <label>Buscar o agregar emoji:</label>
        <input
          type="text"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Ingresar un emoji"
          maxLength="2"
        />
      </div>
      
      <Boton 
        onClick={onSearch}
        disabled={loading}
        className="boton-buscar"
      >
        {loading ? 'Buscando...' : '🔍 Buscar'}
      </Boton>
    </div>
  );
};

export default EmojiSearch;
