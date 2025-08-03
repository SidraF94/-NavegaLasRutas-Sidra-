import React from "react";
import "./ItemListContainer.css";

//greeting es el mensaje de bienvenida que se recibe por props
const ItemListContainer = ({ greeting, modoNocturno }) => {
  // Función para desplazarse suavemente al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`contenedor-lista-productos ${modoNocturno ? 'modo-nocturno' : ''}`} id="productos">
      <div className={`contenido-contenedor ${modoNocturno ? 'modo-nocturno' : ''}`}>
        {/* Título personalizado recibido por props */}
        <h1>{greeting}</h1>

        <div className={`seccion-sin-stock ${modoNocturno ? 'modo-nocturno' : ''}`}>
          <div className="icono-stock">📦</div>
          <h2>Lo sentimos! 😔</h2>

          <p className={`mensaje-stock ${modoNocturno ? 'modo-nocturno' : ''}`}>
            Estamos sin stock en este momento. Nuestros emojis están agotados
            debido a la alta demanda mundial.
          </p>


          <div className={`informacion-stock ${modoNocturno ? 'modo-nocturno' : ''}`}>
            <p>🔄 <strong>Próximamente:</strong> Nuevo stock de emojis</p>
            <p>📅 <strong>Fecha estimada:</strong> En los próximos días</p>
            <p>📧 <strong>Notificación:</strong> Te avisaremos cuando llegue</p>
          </div>

          {/* Botón para volver al inicio de la página */}
          <button className="boton-volver-inicio" onClick={scrollToTop}>
            🏠 Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer; 