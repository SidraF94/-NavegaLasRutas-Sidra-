import React from 'react';
import { Link } from 'react-router-dom';
import Boton from '../ui/Boton';
import EmojiForm from './EmojiForm';
import './AdminEmojis.css';

const AdminEmojis = ({ modoNocturno }) => {
  return (
    <div className={`admin-emojis ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-title-section">
            <h1>🛠️ Administración de Emojis</h1>
            <p>Gestiona el inventario de emojis de la tienda</p>
          </div>
          
          <Link to="/" className="volver-tienda">
            <Boton className="boton-volver">
              ← Volver a la Tienda
            </Boton>
          </Link>
        </div>

        <div className="admin-content">
          <EmojiForm modoNocturno={modoNocturno} />
        </div>
      </div>
    </div>
  );
};

export default AdminEmojis;
