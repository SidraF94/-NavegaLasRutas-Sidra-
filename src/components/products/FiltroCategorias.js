import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FiltroCategorias.css';

const FiltroCategorias = ({ modoNocturno }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(new Set(['todas']));
  
  const categorias = [
    { id: 'todas', nombre: 'Todas', icono: '🏠' },
    { id: 'emociones', nombre: 'Emociones', icono: '😊' },
    { id: 'animales', nombre: 'Animales', icono: '🐱' },
    { id: 'comida', nombre: 'Comida', icono: '🍕' },
    { id: 'bebidas', nombre: 'Bebidas', icono: '☕' },
    { id: 'fantasia', nombre: 'Fantasía', icono: '🦄' },
    { id: 'tecnologia', nombre: 'Tecnología', icono: '🤖' },
    { id: 'celebraciones', nombre: 'Celebraciones', icono: '🎉' },
    { id: 'amor', nombre: 'Amor', icono: '❤️' },
    { id: 'gestos', nombre: 'Gestos', icono: '👍' },
    { id: 'elementos', nombre: 'Elementos', icono: '🔥' },
    { id: 'diversion', nombre: 'Diversión', icono: '🤡' }
  ];

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setCategoriasSeleccionadas(new Set(['todas']));
    } else if (path.startsWith('/categoria/')) {
      const categoriaId = path.split('/')[2];
      setCategoriasSeleccionadas(new Set([categoriaId]));
    }
  }, [location.pathname]);

  const toggleCategoria = (categoriaId) => {
    const nuevasCategorias = new Set(categoriasSeleccionadas);
    
    if (categoriaId === 'todas') {
      setCategoriasSeleccionadas(new Set(['todas']));
      navigate('/');
    } else {
      nuevasCategorias.delete('todas');
      
      if (nuevasCategorias.has(categoriaId)) {
        nuevasCategorias.delete(categoriaId);
        if (nuevasCategorias.size === 0) {
          setCategoriasSeleccionadas(new Set(['todas']));
          navigate('/');
        } else {
          setCategoriasSeleccionadas(nuevasCategorias);
          const primeraCategoria = Array.from(nuevasCategorias)[0];
          navigate(`/categoria/${primeraCategoria}`);
        }
      } else {
        nuevasCategorias.add(categoriaId);
        setCategoriasSeleccionadas(nuevasCategorias);
        navigate(`/categoria/${categoriaId}`);
      }
    }
  };

  const getTextoBoton = () => {
    if (categoriasSeleccionadas.has('todas')) {
      return 'Todas las categorías';
    }
    if (categoriasSeleccionadas.size === 1) {
      const categoria = categorias.find(c => c.id === Array.from(categoriasSeleccionadas)[0]);
      return categoria ? categoria.nombre : 'Categorías';
    }
    return `${categoriasSeleccionadas.size} categorías`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filtro-categorias')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`filtro-categorias ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <button 
        className="filtro-boton-principal"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="filtro-icono">🎯</span>
        <span className="filtro-texto">{getTextoBoton()}</span>
        <span className={`filtro-flecha ${isOpen ? 'abierta' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="filtro-dropdown">
          <div className="categorias-grid">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => toggleCategoria(categoria.id)}
                className={`categoria-item ${categoriasSeleccionadas.has(categoria.id) ? 'seleccionada' : ''}`}
                type="button"
              >
                <span className="categoria-icono">{categoria.icono}</span>
                <span className="categoria-nombre">{categoria.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltroCategorias;