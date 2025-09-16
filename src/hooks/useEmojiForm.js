import { useState } from 'react';
import useSweetAlert from './useSweetAlert';
import { getEmojiByEmoji, addEmoji, updateEmoji, updateEmojiStock, deleteEmoji, checkSlugExists } from '../firebase/emojisService';
import { generateUniqueSlug } from '../utils/slugGenerator';
import Swal from 'sweetalert2';

export const useEmojiForm = () => {
  const [emoji, setEmoji] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState("Emociones");
  const [loading, setLoading] = useState(false);
  const [emojiExistente, setEmojiExistente] = useState(null);
  const [modo, setModo] = useState("Buscar");

  const { showSuccess, showError } = useSweetAlert();

  const buscarEmoji = async () => {
    if (!emoji.trim()) {
      showError("Por favor ingresa un emoji");
      return;
    }

    setLoading(true);
    try {
      const emojiEncontrado = await getEmojiByEmoji(emoji);
      
      if (emojiEncontrado) {
        setEmojiExistente(emojiEncontrado);
        setModo("Actualizar");
        setStock(emojiEncontrado.stock || 50);
        showSuccess(`Emoji encontrado: "${emojiEncontrado.titulo}"`);
      } else {
        setEmojiExistente(null);
        setModo("Crear");
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('');
        showSuccess("Emoji nuevo - Completa los datos");
      }
    } catch (error) {
      console.error("Error buscando emoji:", error);
      showError("Error al buscar emoji");
    } finally {
      setLoading(false);
    }
  };

  const crearEmoji = async () => {
    if (!nombre.trim() || !descripcion.trim() || !precio || !stock) {
      showError("Completa todos los campos");
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
      showError("Selecciona un emoji para eliminar");
      return;
    }

    const confirmacion = await Swal.fire({
      title: "¿Eliminar emoji?",
      text: `¿Estás seguro de que quieres eliminar "${emojiExistente.titulo}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirmacion.isConfirmed) {
      setLoading(true);
      try {
        await deleteEmoji(emojiExistente.id);
        showSuccess(`Emoji "${emojiExistente.titulo}" eliminado exitosamente`);
        resetForm();
      } catch (error) {
        console.error("Error eliminando emoji:", error);
        showError('Error al eliminar emoji');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setEmoji("");
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setEmojiExistente(null);
    setModo("Buscar");
  };

  return {
    // States
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
    resetForm
  };
};

export default useEmojiForm;