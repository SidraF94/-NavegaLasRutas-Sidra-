import { useState, useEffect, useCallback } from 'react';
import { getAllEmojis, getEmojisByCategory } from '../firebase/emojisService';

const useEmojis = (categoriaId) => {
  const [emojis, setEmojis] = useState([]);
  const [emojisVisibles, setEmojisVisibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hayMas, setHayMas] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);

  const cargarEmojis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let emojisFiltrados = [];
      
      if (categoriaId && categoriaId !== 'todas') {
        const categoriasMap = {
          'emociones': 'Emociones',
          'gestos': 'Gestos',
          'elementos': 'Elementos',
          'celebraciones': 'Celebraciones',
          'amor': 'Amor',
          'diversion': 'Diversión',
          'fantasia': 'Fantasía',
          'tecnologia': 'Tecnología',
          'animales': 'Animales',
          'comida': 'Comida',
          'bebidas': 'Bebidas'
        };
        
        const categoriaFiltro = categoriasMap[categoriaId];
        if (categoriaFiltro) {
          emojisFiltrados = await getEmojisByCategory(categoriaFiltro);
        }
      } else {
        emojisFiltrados = await getAllEmojis();
      }
      
      setEmojis(emojisFiltrados);
      setError(null);
      
      if (categoriaId && categoriaId !== 'todas') {
        setEmojisVisibles(emojisFiltrados);
        setHayMas(false);
      } else {
        const paqueteInicial = emojisFiltrados.slice(0, 8);
        setEmojisVisibles(paqueteInicial);
        setHayMas(emojisFiltrados.length > 8);
      }
    } catch (err) {
      setError('Error al cargar los emojis desde Firestore');
      console.error('Error cargando emojis:', err);
    } finally {
      setLoading(false);
    }
  }, [categoriaId]);

  const cargarSiguientePaquete = useCallback(() => {
    if (cargandoMas || !hayMas || emojisVisibles.length >= emojis.length) {
      return;
    }

    setCargandoMas(true);
    
    const siguientePaquete = emojis.slice(emojisVisibles.length, emojisVisibles.length + 8);
    setEmojisVisibles(prev => [...prev, ...siguientePaquete]);
    setHayMas(emojisVisibles.length + 8 < emojis.length);
    setCargandoMas(false);
  }, [cargandoMas, hayMas, emojisVisibles.length, emojis.length, emojis]);

  useEffect(() => {
    cargarEmojis();
  }, [cargarEmojis]);

  return {
    emojis,
    emojisVisibles,
    loading,
    error,
    hayMas,
    cargandoMas,
    cargarEmojis,
    cargarSiguientePaquete
  };
};

export default useEmojis;