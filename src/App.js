import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import SobreNosotros from './components/SobreNosotros';
import Contacto from './components/Contacto';
import SaludoPersonalizado from './components/SaludoPersonalizado';

function App() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [modoNocturno, setModoNocturno] = useState(false);

  const manejarCambioNombre = (nombre) => {
    setNombreUsuario(nombre);
  };

  const cambiarModoNocturno = () => {
    setModoNocturno(!modoNocturno);
  };

  const mensajeBienvenida = nombreUsuario 
    ? `¡Bienvenido ${nombreUsuario}! 🎉` 
    : '¡Bienvenidos a TiendaEmoji!';

  return (
    <div className={`App ${modoNocturno ? 'modo-nocturno' : ''}`} id="inicio">
      <SaludoPersonalizado onNombreCambio={manejarCambioNombre} />
      <NavBar modoNocturno={modoNocturno} cambiarModoNocturno={cambiarModoNocturno} />
      <ItemListContainer greeting={mensajeBienvenida} modoNocturno={modoNocturno} />
      <SobreNosotros modoNocturno={modoNocturno} />
      <Contacto modoNocturno={modoNocturno} />
    </div>
  );
}

export default App;
