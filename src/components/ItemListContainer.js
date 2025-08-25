import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ItemList from "./ItemList";
import FiltroCategorias from "./FiltroCategorias";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting, modoNocturno }) => {
  const { categoriaId } = useParams();
  
  // Estados para manejar la carga de emojis
  const [emojis, setEmojis] = useState([]);           // Todos los emojis del JSON
  const [loading, setLoading] = useState(true);       // Loading inicial
  const [error, setError] = useState(null);           // Manejo de errores
  const [emojisVisibles, setEmojisVisibles] = useState([]); // Emojis visibles en pantalla
  const [paqueteActual, setPaqueteActual] = useState(0);        // Paquete actual
  const [hayMas, setHayMas] = useState(true);             // Si quedan más emojis
  const [cargandoMas, setCargandoMas] = useState(false);  // Loading de más emojis
  // observerRef.current será la instancia del observador activo
  const observerRef = useRef();
  // Referencia que se coloca en el ÚLTIMO emoji de la lista para detectar cuándo el usuario llega al final
  const lastEmojiRef = useRef();
  const PAQUETE_EMOJI = 20;

  // Cargar emojis del JSON (simula API)
  const cargarEmojis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Importar datos del JSON
      const datosEmojis = await import('../data/emojis.json');
      
      
      let todosLosEmojis = datosEmojis.default;
      
      // Filtrar por categoría si se especifica
      if (categoriaId && categoriaId !== 'todas') {
        // Mapear IDs del filtro a nombres de categorías del JSON
        const mapeoCategorias = {
          'emociones': 'Emociones',
          'animales': 'Animales',
          'comida': 'Comida',
          'bebidas': 'Bebidas',
          'fantasia': 'Fantasía',
          'tecnologia': 'Tecnología',
          'celebraciones': 'Celebraciones',
          'amor': 'Amor',
          'gestos': 'Gestos',
          'elementos': 'Elementos',
          'diversion': 'Diversión'
        };
        const categoriaBuscada = mapeoCategorias[categoriaId.toLowerCase()];
        if (categoriaBuscada) {
          todosLosEmojis = todosLosEmojis.filter(emoji => 
            emoji.categoria === categoriaBuscada
          );
        }
      }
      //SOLUCION para los items que se renderizaban 2 veces.
      // Reiniciar estados para la nueva categoría
      setEmojis(todosLosEmojis);
      setPaqueteActual(0);
      setHayMas(todosLosEmojis.length > 0);
      
      
      if (todosLosEmojis.length > 0) {
        if (categoriaId && categoriaId !== 'todas') {
          // CATEGORÍA: Mostrar todos los emojis filtrados de una vez
          setEmojisVisibles(todosLosEmojis);
          setHayMas(false); // No hay más para cargar en categorías
        } else {
          const primerPaquete = todosLosEmojis.slice(0, PAQUETE_EMOJI);
          setEmojisVisibles(primerPaquete);
          setHayMas(todosLosEmojis.length > PAQUETE_EMOJI);
        }
      } else {
        setEmojisVisibles([]);
        setHayMas(false);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los emojis');
      setLoading(false);
    }
  }, [categoriaId]);

  // Cargar siguiente paquete
  const cargarSiguientePaquete = useCallback(() => {
    // Validación única: si está cargando, no hay más, o ya se mostraron todos
    if (cargandoMas || !hayMas || paqueteActual * PAQUETE_EMOJI >= emojis.length) return;
    
    setCargandoMas(true);
    
    setTimeout(() => {   
      const nuevoPaqueteActual = paqueteActual + 1;
      const totalEmojisAMostrar = nuevoPaqueteActual * PAQUETE_EMOJI;
      
      // Actualizar todos los estados de una vez
      setEmojisVisibles(emojis.slice(0, totalEmojisAMostrar));
      setPaqueteActual(nuevoPaqueteActual);
      setHayMas(totalEmojisAMostrar < emojis.length);
      setCargandoMas(false);
    }, 1000);
  }, [paqueteActual, cargandoMas, hayMas, emojis]);

  // Callback del último emoji simplificado
  const callbackUltimoEmoji = useCallback(node => {
    // Validación única: si está cargando, no hay más, o ya se mostraron todos
    if (cargandoMas || !hayMas || emojisVisibles.length >= emojis.length) return;
    
    // Limpiar observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    
    // Solo configurar si hay nodo y no está cargando
    if (node && !cargandoMas) {
      observerRef.current = new IntersectionObserver(entries => {
        // Si el nodo es visible y se pueden cargar más emojis
        if (entries[0].isIntersecting && hayMas && !cargandoMas) {
          cargarSiguientePaquete();
        }
      });
      
      observerRef.current.observe(node);
    }
  }, [cargandoMas, hayMas, cargarSiguientePaquete, emojisVisibles.length, emojis.length]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    setEmojisVisibles([]);
    setPaqueteActual(0);
    setHayMas(true);
    setCargandoMas(false);
    setLoading(true);

    cargarEmojis();
  }, [categoriaId, cargarEmojis]);

  // Funciones auxiliares
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const esCategoriaEspecifica = categoriaId && categoriaId !== 'todas';
  const esPaginaPrincipal = !categoriaId || categoriaId === 'todas';
  const nombreCategoria = categoriaId ? categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1) : '';

  // Renderizado condicional
  const renderizarContenido = () => {
    // Helper para aplicar modo nocturno
    const modoNocturnoClass = modoNocturno ? 'modo-nocturno' : '';
    
    if (loading) {
      return (
        <div className={`seccion-loading ${modoNocturnoClass}`}>
          <div className="loading-spinner">⏳</div>
          <p>Cargando emojis...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={`seccion-error ${modoNocturnoClass}`}>
          <div className="icono-error">❌</div>
          <h2>¡Ups! Algo salió mal</h2>
          <p className={`mensaje-error ${modoNocturnoClass}`}>{error}</p>
          <button className="boton-reintentar" onClick={cargarEmojis}>🔄 Reintentar</button>
        </div>
      );
    }

    if (emojisVisibles.length === 0 && emojis.length === 0) {
      return (
        <div className={`seccion-sin-emojis ${modoNocturnoClass}`}>
          <div className="icono-sin-emojis">😔</div>
          <h2>No hay emojis en esta categoría</h2>
          <p>Intenta seleccionar otra categoría o vuelve al catálogo principal.</p>
          <Link to="/" className="boton-volver-catalogo">🏠 Volver al Catálogo Principal</Link>
        </div>
      );
    }

    if (emojisVisibles.length > 0) {
      return (
        <>
          <ItemList 
            items={emojisVisibles}
            modoNocturno={modoNocturno}
            lastEmojiRef={esPaginaPrincipal && hayMas ? callbackUltimoEmoji : null}
          />
          
          {/* Indicador de carga solo en página principal */}
          {esPaginaPrincipal && hayMas && (
            <div className="seccion-cargar-mas">
              <div className={`indicador-carga ${modoNocturnoClass}`}>
                <span className="loading-spinner-pequeño">⏳</span>
                <p>Cargando más emojis...</p>
              </div>
            </div>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className={`contenedor-lista-productos ${modoNocturno ? 'modo-nocturno' : ''}`} id="productos">
      <div className={`contenido-contenedor ${modoNocturno ? 'modo-nocturno' : ''}`}>
        {/* Título dinámico según categoría */}
        <h1>
          {esCategoriaEspecifica 
            ? `${greeting} - Categoría: ${nombreCategoria}`
            : greeting
          }
        </h1>
        
        <FiltroCategorias modoNocturno={modoNocturno} />
        
        {/* Información de resultados solo para categorías específicas */}
        {!loading && !error && esCategoriaEspecifica && (
          <div className={`info-categoria ${modoNocturno ? 'modo-nocturno' : ''}`}>
            <p>
              <strong>{emojisVisibles.length}</strong> emoji{emojisVisibles.length !== 1 ? 's' : ''} encontrado{emojisVisibles.length !== 1 ? 's' : ''} en la categoría 
              <strong> {nombreCategoria}</strong>
            </p>
          </div>
        )}

        {/* Contenido principal renderizado condicionalmente */}
        {renderizarContenido()}

        {/* Botón flotante para volver al top */}
        <button 
          className={`boton-volver-top ${modoNocturno ? 'modo-nocturno' : ''}`}
          onClick={scrollToTop}
          title="Volver al inicio"
        >
          🏠
        </button>
      </div>
    </div>
  );
};

export default ItemListContainer; 