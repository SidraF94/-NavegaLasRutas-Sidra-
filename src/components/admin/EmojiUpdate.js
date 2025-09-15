import React from 'react';
import Boton from '../ui/Boton';
import './EmojiUpdate.css';

const EmojiUpdate = ({ emojiExistente, stock, setStock, onUpdate, onDelete, loading, modoNocturno }) => {
  return (
    <div className={`emoji-update ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="emoji-info">
        <span className="emoji-display">{emojiExistente.imagenUrl}</span>
        <div className="emoji-details">
          <p><strong>{emojiExistente.titulo}</strong></p>
          <p>Stock: {emojiExistente.stock || 50}</p>
        </div>
      </div>
      
      <div className="input-group">
        <label>Nuevo Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Cantidad"
          min="0"
        />
      </div>
      
      <div className="botones-accion">
        <Boton 
          onClick={onUpdate}
          disabled={loading}
          className="boton-actualizar"
        >
          {loading ? 'Actualizando...' : '📦 Actualizar'}
        </Boton>
        
        <Boton 
          onClick={onDelete}
          disabled={loading}
          className="boton-eliminar"
        >
          {loading ? 'Eliminando...' : '🗑️ Eliminar'}
        </Boton>
      </div>
    </div>
  );
};

export default EmojiUpdate;
