import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import ItemListContainer from './components/products/ItemListContainer';
import ItemDetailPage from './components/products/ItemDetailPage';
import PaginaNoEncontrada from './components/pages/PaginaNoEncontrada';
import SobreNosotros from './components/pages/SobreNosotros';
import Contacto from './components/pages/Contacto';
import SaludoPersonalizado from './components/layout/SaludoPersonalizado';
import Cart from './components/cart/Cart';
import useLocalStorage from './hooks/useLocalStorage';
import CartProvider from './context/CartProvider';

function App() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [modoNocturno, setModoNocturno] = useLocalStorage('modoNocturno', false);

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
    <CartProvider>
      <BrowserRouter>
        <div className={`App ${modoNocturno ? 'modo-nocturno' : ''}`} id="inicio">
          <SaludoPersonalizado cuandoElNombreCambia={cuandoElNombreCambia} />
          <NavBar modoNocturno={modoNocturno} cambiarModoNocturno={cambiarModoNocturno} />

          <Routes>
            <Route path="/" element={<ItemListContainer greeting={mensajeBienvenida} modoNocturno={modoNocturno} />} />
            <Route path="/categoria/:categoriaId" element={<ItemListContainer greeting={mensajeBienvenida} modoNocturno={modoNocturno} />} />
            <Route path="/item/:id" element={<ItemDetailPage modoNocturno={modoNocturno} />} />
            <Route path="/cart" element={<Cart modoNocturno={modoNocturno} />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros modoNocturno={modoNocturno} />} />
            <Route path="/contacto" element={<Contacto modoNocturno={modoNocturno} />} />
            <Route path="*" element={<PaginaNoEncontrada modoNocturno={modoNocturno} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
