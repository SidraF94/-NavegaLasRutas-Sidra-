import React from 'react';
import Boton from '../ui/Boton';
import './EmojiForm.css';

const EmojiFormReset = ({ onReset, modoNocturno }) => {
  return (
    <Boton 
      onClick={onReset}
      className="boton-reset"
    >
      🔄 Nuevo Emoji
    </Boton>
  );
};

export default EmojiFormReset;
