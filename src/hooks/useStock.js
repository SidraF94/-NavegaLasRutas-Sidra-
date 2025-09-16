import { useState, useEffect, useCallback } from 'react';
import { useStockContext } from '../context/StockContext';
import { getEmojiById } from '../firebase/emojisService';

export const useStock = (itemId, initialStock = 50) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getStock, updateStock } = useStockContext();

  const stock = getStock(itemId, initialStock);

  const syncWithFirestore = useCallback(async () => {
    if (!itemId) return;

    try {
      setLoading(true);
      setError(null);
      
      const emojiData = await getEmojiById(itemId);
      if (emojiData && emojiData.stock !== undefined) {
        updateStock(itemId, emojiData.stock);
      }
    } catch (err) {
      setError('Error al sincronizar stock con Firestore');
      console.error('Error syncing stock:', err);
    } finally {
      setLoading(false);
    }
  }, [itemId, updateStock]);

  const isAvailable = useCallback((quantity) => {
    return stock >= quantity;
  }, [stock]);

  useEffect(() => {
    if (itemId) {
      syncWithFirestore();
    }
  }, [itemId, syncWithFirestore]);

  return {
    stock,
    loading,
    error,
    isAvailable,
    syncWithFirestore
  };
};

export default useStock;
