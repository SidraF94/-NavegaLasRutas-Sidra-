import React from "react";
import TarjetaHistoria from "./TarjetaHistoria";
import "./SobreNosotros.css";

const SobreNosotros = ({ modoNocturno }) => {
  return (
    <div className={`sobre-nosotros ${modoNocturno ? 'modo-nocturno' : ''}`} id="sobre-nosotros">
      <div className={`sobre-nosotros-container ${modoNocturno ? 'modo-nocturno' : ''}`}>
        <h2>📖 Nuestra Historia</h2>

        {/* Tarjeta de historia. El texto esta hecho claramente con IA */}
        
        <div className={`seccion-historia ${modoNocturno ? 'modo-nocturno' : ''}`}>
          <TarjetaHistoria 
            titulo="🌍 El Día que el Mundo se Quedó Sin Emojis"
            texto="Era un día normal en 2024 cuando de repente... ¡BOOM! 💥 
            Todos los emojis del mundo desaparecieron. WhatsApp sin 😂, 
            Instagram sin ❤️, Twitter sin 🚀. ¡El caos total!"
            modoNocturno={modoNocturno}
          />

          <TarjetaHistoria 
            titulo="🦸‍♂️ Nuestro Heroico Propósito"
            texto="Nosotros, los fundadores de TiendaEmoji, 
            decidimos que esto no podía continuar. Nos convertimos en 
            los salvadores de la comunicación digital, vendiendo emojis 
            a precios súper accesibles para que nadie se quede sin 
            expresar sus sentimientos. 😊"
            modoNocturno={modoNocturno}
          />

          <TarjetaHistoria 
            titulo="💰 ¿Por Qué Tan Baratos?"
            texto="Porque creemos que la felicidad no debería costar una fortuna. 
            Nuestros emojis cuestan menos que un café ☕ y duran para siempre. 
            ¡Es simple economía de la felicidad! 🎉"
            modoNocturno={modoNocturno}
          />
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros; 