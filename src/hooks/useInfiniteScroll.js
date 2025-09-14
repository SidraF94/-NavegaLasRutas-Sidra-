import { useRef, useCallback, useEffect } from 'react';

const useInfiniteScroll = (cargarSiguientePaquete, cargandoMas, hayMas, emojisVisibles, emojis) => {
  const lastEmojiRef = useRef();

  const lastEmojiCallback = useCallback((node) => {
    if (cargandoMas || !hayMas || emojisVisibles.length >= emojis.length) return;
    
    if (lastEmojiRef.current) lastEmojiRef.current.disconnect();
    
    if (node) {
      lastEmojiRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !cargandoMas && hayMas && emojisVisibles.length < emojis.length) {
          cargarSiguientePaquete();
        }
      });
      lastEmojiRef.current.observe(node);
    }
  }, [cargandoMas, hayMas, emojisVisibles.length, emojis.length, cargarSiguientePaquete]);

  useEffect(() => {
    return () => {
      if (lastEmojiRef.current) {
        lastEmojiRef.current.disconnect();
      }
    };
  }, []);

  return { lastEmojiRef: lastEmojiCallback };
};

export default useInfiniteScroll;