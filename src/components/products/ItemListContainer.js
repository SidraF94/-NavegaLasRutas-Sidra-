import React from "react";
import { useParams, Link } from "react-router-dom";
import ItemList from "./ItemList";
import FiltroCategorias from "./FiltroCategorias";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";
import InfiniteScrollTrigger from "../common/InfiniteScrollTrigger";
import useEmojis from "../../hooks/useEmojis";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting, modoNocturno }) => {
  const { categoriaId } = useParams();
  
  const {
    emojis,
    emojisVisibles,
    loading,
    error,
    hayMas,
    cargandoMas,
    cargarEmojis,
    cargarSiguientePaquete
  } = useEmojis(categoriaId);

  const { lastEmojiRef } = useInfiniteScroll(
    cargarSiguientePaquete,
    cargandoMas,
    hayMas,
    emojisVisibles,
    emojis
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const esCategoriaEspecifica = categoriaId && categoriaId !== 'todas';
  const esPaginaPrincipal = !categoriaId || categoriaId === 'todas';
  const nombreCategoria = categoriaId ? categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1) : '';

  const renderizarContenido = () => {
    if (loading) {
      return <LoadingSpinner mensaje="Cargando emojis..." modoNocturno={modoNocturno} />;
    }

    if (error) {
      return (
        <ErrorState 
          error={error}
          onReintentar={cargarEmojis}
          modoNocturno={modoNocturno}
        />
      );
    }

    if (emojisVisibles.length === 0 && emojis.length === 0) {
      return (
        <EmptyState 
          titulo="No hay emojis en esta categoría"
          mensaje="Intenta seleccionar otra categoría o vuelve al catálogo principal."
          botonTexto="Volver al Catálogo Principal"
          botonRuta="/"
          icono="😔"
          modoNocturno={modoNocturno}
        />
      );
    }

    if (emojisVisibles.length > 0) {
      return (
        <>
          <ItemList 
            items={emojisVisibles}
            modoNocturno={modoNocturno}
            lastEmojiRef={esPaginaPrincipal && hayMas ? lastEmojiRef : null}
          />
          
          {esPaginaPrincipal && (
            <InfiniteScrollTrigger 
              hayMas={hayMas}
              cargando={cargandoMas}
              modoNocturno={modoNocturno}
            />
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className={`contenedor-lista-productos ${modoNocturno ? 'modo-nocturno' : ''}`} id="productos">
      <div className={`contenido-contenedor ${modoNocturno ? 'modo-nocturno' : ''}`}>
        <h1>
          {esCategoriaEspecifica 
            ? `${greeting} - Categoría: ${nombreCategoria}`
            : greeting
          }
        </h1>
        
        <FiltroCategorias modoNocturno={modoNocturno} />
        
        {!loading && !error && esCategoriaEspecifica && (
          <div className={`info-categoria ${modoNocturno ? 'modo-nocturno' : ''}`}>
            <p>
              <strong>{emojisVisibles.length}</strong> emoji{emojisVisibles.length !== 1 ? 's' : ''} encontrado{emojisVisibles.length !== 1 ? 's' : ''} en la categoría 
              <strong> {nombreCategoria}</strong>
            </p>
          </div>
        )}

        {renderizarContenido()}

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