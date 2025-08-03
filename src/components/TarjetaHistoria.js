import React from "react";
import "./TarjetaHistoria.css";

//Tarjeta historia basicamente es un div para graficar el uso de proops. 

const TarjetaHistoria = ({ titulo, texto, modoNocturno }) => {
  return (
    <div className={`tarjeta-historia ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
};

export default TarjetaHistoria; 