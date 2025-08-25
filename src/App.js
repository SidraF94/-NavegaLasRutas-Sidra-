import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailPage from './components/ItemDetailPage';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import SobreNosotros from './components/SobreNosotros';
import Contacto from './components/Contacto';
import SaludoPersonalizado from './components/SaludoPersonalizado';

function App() {
  //useState para el nombre del usuario y setNombreUsuario para cambiar el nombre
  const [nombreUsuario, setNombreUsuario] = useState('');

  //useState para el modo nocturno y setModoNocturno para cambiar el modo
  const [modoNocturno, setModoNocturno] = useState(() => {
    const guardado = localStorage.getItem('modoNocturno');
    return guardado ? JSON.parse(guardado) : false;
  });

  // En localStorage cuando cambie el modo
  useEffect(() => {
    localStorage.setItem('modoNocturno', JSON.stringify(modoNocturno));
  }, [modoNocturno]);

  //Cuando llamo setNombreUsuario y setModoNocturno se vuelve a renderizar.
  const cuandoElNombreCambia = (nombre) => {
    setNombreUsuario(nombre);
  };
  const cambiarModoNocturno = () => {
    setModoNocturno(!modoNocturno);
  };

  const mensajeBienvenida = nombreUsuario
    ? `Bienvenido ${nombreUsuario}! 🎉`
    : 'Bienvenidos a TiendaEmoji!';

  return (
    <BrowserRouter>
      <div className={`App ${modoNocturno ? 'modo-nocturno' : ''}`} id="inicio">
        <SaludoPersonalizado cuandoElNombreCambia={cuandoElNombreCambia} />
        <NavBar modoNocturno={modoNocturno} cambiarModoNocturno={cambiarModoNocturno} />

        <Routes>
          <Route path="/" element={<ItemListContainer greeting={mensajeBienvenida} modoNocturno={modoNocturno} />} />
          <Route path="/categoria/:categoriaId" element={<ItemListContainer greeting={mensajeBienvenida} modoNocturno={modoNocturno} />} />
          <Route path="/item/:id" element={<ItemDetailPage modoNocturno={modoNocturno} />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros modoNocturno={modoNocturno} />} />
          <Route path="/contacto" element={<Contacto modoNocturno={modoNocturno} />} />
          <Route path="*" element={<PaginaNoEncontrada modoNocturno={modoNocturno} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
