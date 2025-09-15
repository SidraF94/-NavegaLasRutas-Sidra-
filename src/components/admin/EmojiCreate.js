import React from 'react';
import Boton from '../ui/Boton';
import './EmojiCreate.css';

const EmojiCreate = ({ 
  nombre, setNombre, 
  descripcion, setDescripcion, 
  precio, setPrecio, 
  stock, setStock, 
  categoria, setCategoria, 
  categorias, 
  onCreate, 
  loading,
  modoNocturno
}) => {
  return (
    <div className={`emoji-create ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="form-row">
        <div className="input-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
        </div>
        
        <div className="input-group">
          <label>Categoría:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="input-group">
        <label>Descripción:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />
      </div>
      
      <div className="form-row">
        <div className="input-group">
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        
        <div className="input-group">
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Cantidad"
            min="0"
          />
        </div>
      </div>
      
      <Boton 
        onClick={onCreate}
        disabled={loading}
        className="boton-crear"
      >
        {loading ? 'Creando...' : '➕ Crear'}
      </Boton>
    </div>
  );
};

export default EmojiCreate;
