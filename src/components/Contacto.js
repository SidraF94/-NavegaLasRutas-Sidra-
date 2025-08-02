import React from "react";
import "./Contacto.css";

const Contacto = ({ modoNocturno }) => {
  return (
    <div className={`contacto ${modoNocturno ? 'modo-nocturno' : ''}`} id="contacto">
      <div className={`contacto-container ${modoNocturno ? 'modo-nocturno' : ''}`}>
        <h2>📞 Contáctanos</h2>
        
        <div className={`contacto-contenido ${modoNocturno ? 'modo-nocturno' : ''}`}>
          <div className={`contacto-info ${modoNocturno ? 'modo-nocturno' : ''}`}>
            <h3>💬 ¿Necesitas ayuda?</h3>
            <p>
              Estamos aquí para ayudarte con cualquier consulta sobre nuestros emojis. 
              ¡No dudes en contactarnos!
            </p>
            
            <div className={`metodos-contacto ${modoNocturno ? 'modo-nocturno' : ''}`}>
              <div className={`metodo-contacto ${modoNocturno ? 'modo-nocturno' : ''}`}>
                <span className="icono-metodo">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>info@tiendaemoji.com</p>
                </div>
              </div>
              
              <div className={`metodo-contacto ${modoNocturno ? 'modo-nocturno' : ''}`}>
                <span className="icono-metodo">📱</span>
                <div>
                  <h4>WhatsApp</h4>
                  <p>+54 11 1234-5678</p>
                </div>
              </div>
              
              <div className={`metodo-contacto ${modoNocturno ? 'modo-nocturno' : ''}`}>
                <span className="icono-metodo">🕒</span>
                <div>
                  <h4>Horarios</h4>
                  <p>Lun-Vie: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`formulario-contacto ${modoNocturno ? 'modo-nocturno' : ''}`}>
            <h3>📝 Envíanos un mensaje</h3>
            <form>
              <div className="grupo-formulario">
                <input type="text" placeholder="Tu nombre" required />
              </div>
              <div className="grupo-formulario">
                <input type="email" placeholder="Tu email" required />
              </div>
              <div className="grupo-formulario">
                <textarea placeholder="Tu mensaje" rows="4" required></textarea>
              </div>
              <button type="submit" className="boton-enviar">
                📤 Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto; 