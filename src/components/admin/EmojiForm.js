import React, { useState } from 'react';
import Boton from '../ui/Boton';
import useSweetAlert from '../../hooks/useSweetAlert';
import { getEmojiByEmoji, addEmoji, updateEmoji, updateEmojiStock, deleteEmoji, checkSlugExists } from '../../firebase/emojisService';
import { generateUniqueSlug } from '../../utils/slugGenerator';
import Swal from 'sweetalert2';
import EmojiSearch from './EmojiSearch';
import EmojiUpdate from './EmojiUpdate';
import EmojiCreate from './EmojiCreate';
import './EmojiForm.css';

const EmojiForm = ({ modoNocturno }) => {
  const [emoji, setEmoji] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('Emociones');
  const [loading, setLoading] = useState(false);
  const [emojiExistente, setEmojiExistente] = useState(null);
  const [modo, setModo] = useState('buscar');

  const { showSuccess, showError } = useSweetAlert();

  const categorias = [
    'Emociones', 'Gestos', 'Elementos', 'Celebraciones', 
    'Amor', 'Diversión', 'Fantasía', 'Tecnología', 
    'Animales', 'Comida', 'Bebidas'
  ];

  const buscarEmoji = async () => {
    if (!emoji.trim()) {
      showError('Por favor ingresa un emoji');
      return;
    }

    setLoading(true);
    try {
      const emojiEncontrado = await getEmojiByEmoji(emoji);
      
      if (emojiEncontrado) {
        setEmojiExistente(emojiEncontrado);
        setModo('actualizar');
        setStock(emojiEncontrado.stock || 50);
        showSuccess(`Emoji encontrado: "${emojiEncontrado.titulo}"`);
      } else {
        setEmojiExistente(null);
        setModo('crear');
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        showSuccess('Emoji nuevo - Completa los datos');
      }
    } catch (error) {
      console.error('Error buscando emoji:', error);
      showError('Error al buscar emoji');
    } finally {
      setLoading(false);
    }
  };

  const crearEmoji = async () => {
    if (!nombre.trim() || !descripcion.trim() || !precio || !stock) {
      showError('Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const nuevoEmoji = {
        titulo: nombre,
        descripcion,
        precio: parseFloat(precio),
        imagenUrl: emoji,
        categoria,
        stock: parseInt(stock)
      };

             const id = await addEmoji(nuevoEmoji);
             const slug = await generateUniqueSlug(nombre, id, { checkSlugExists });

             // Actualizar con el slug
             await updateEmoji(id, { slug });
      
      showSuccess(`Emoji "${nombre}" creado exitosamente`);
      resetForm();
    } catch (error) {
      showError('Error al crear emoji');
    } finally {
      setLoading(false);
    }
  };

  const actualizarStock = async () => {
    if (!stock) {
      showError('Ingresa una cantidad de stock');
      return;
    }

    setLoading(true);
    try {
      await updateEmojiStock(emojiExistente.id, parseInt(stock));
      showSuccess(`Stock actualizado a ${stock} unidades`);
      resetForm();
    } catch (error) {
      showError('Error al actualizar stock');
    } finally {
      setLoading(false);
    }
  };

  const eliminarEmoji = async () => {
    if (!emojiExistente) {
      showError('Selecciona un emoji para eliminar');
      return;
    }

    const confirmacion = await Swal.fire({
      title: '¿Eliminar emoji?',
      text: `¿Estás seguro de que quieres eliminar "${emojiExistente.titulo}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      setLoading(true);
      try {
        await deleteEmoji(emojiExistente.id);
        showSuccess(`Emoji "${emojiExistente.titulo}" eliminado exitosamente`);
        resetForm();
      } catch (error) {
        console.error('Error eliminando emoji:', error);
        showError('Error al eliminar emoji');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setEmoji('');
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setStock('');
    setEmojiExistente(null);
    setModo('buscar');
  };

  return (
    <div className={`emoji-form ${modoNocturno ? 'modo-nocturno' : ''}`}>
      <EmojiSearch
        emoji={emoji}
        setEmoji={setEmoji}
        onSearch={buscarEmoji}
        loading={loading}
        modoNocturno={modoNocturno}
      />

      {modo === 'actualizar' && emojiExistente && (
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

      {modo === 'crear' && (
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
          categorias={categorias}
          onCreate={crearEmoji}
          loading={loading}
          modoNocturno={modoNocturno}
        />
      )}
      
      <Boton 
        onClick={resetForm}
        className="boton-reset"
      >
        🔄 Nuevo Emoji
      </Boton>
    </div>
  );
};

export default EmojiForm;
