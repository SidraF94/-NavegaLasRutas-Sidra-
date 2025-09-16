import React from 'react';
import EmojiSearch from './EmojiSearch';
import EmojiUpdate from './EmojiUpdate';
import EmojiCreate from './EmojiCreate';

const CATEGORIAS = [
  'Emociones', 'Gestos', 'Elementos', 'Celebraciones', 
  'Amor', 'Diversión', 'Fantasía', 'Tecnología', 
  'Animales', 'Comida', 'Bebidas'
];

const EmojiFormContent = ({
  emoji,
  setEmoji,
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  precio,
  setPrecio,
  stock,
  setStock,
  categoria,
  setCategoria,
  loading,
  emojiExistente,
  modo,
  
  buscarEmoji,
  crearEmoji,
  actualizarStock,
  eliminarEmoji,
  modoNocturno
}) => {
  return (
    <>
      <EmojiSearch
        emoji={emoji}
        setEmoji={setEmoji}
        onSearch={buscarEmoji}
        loading={loading}
        modoNocturno={modoNocturno}
      />

      {modo === "Actualizar" && emojiExistente && (
        <EmojiUpdate
          emojiExistente={emojiExistente}
          stock={stock}
          setStock={setStock}
          onUpdate={actualizarStock}
          onDelete={eliminarEmoji}
          loading={loading}
          modoNocturno={modoNocturno}
        />
      )}

      {modo === "Crear" && (
        <EmojiCreate
          nombre={nombre}
          setNombre={setNombre}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          precio={precio}
          setPrecio={setPrecio}
          stock={stock}
          setStock={setStock}
          categoria={categoria}
          setCategoria={setCategoria}
          categorias={CATEGORIAS}
          onCreate={crearEmoji}
          loading={loading}
          modoNocturno={modoNocturno}
        />
      )}
    </>
  );
};

export default EmojiFormContent;
