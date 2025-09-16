import { useCallback } from 'react';
import { useStockContext } from '../context/StockContext';
import { getEmojiById, updateEmojiStock } from '../firebase/emojisService';

export const useStockOperations = () => {
  const { updateStock } = useStockContext();

  const updateStockInFirestore = useCallback(async (itemId, newStock) => {
    await updateEmojiStock(itemId, newStock);
    updateStock(itemId, newStock);
    return true;
  }, [updateStock]);

  const reduceStock = useCallback(async (itemId, quantity) => {
    try {
      const emojiData = await getEmojiById(itemId);
      if (!emojiData || emojiData.stock < quantity) {
        return false;
      }

      const newStock = emojiData.stock - quantity;
      return await updateStockInFirestore(itemId, newStock);
    } catch (error) {
      console.error('Error reducing stock:', error);
      return false;
    }
  }, [updateStockInFirestore]);

  const restoreStock = useCallback(async (itemId, quantity) => {
    try {
      const emojiData = await getEmojiById(itemId);
      if (!emojiData) {
        return false;
      }

      const newStock = emojiData.stock + quantity;
      return await updateStockInFirestore(itemId, newStock);
    } catch (error) {
      console.error('Error restoring stock:', error);
      return false;
    }
  }, [updateStockInFirestore]);

  return {
    reduceStock,
    restoreStock,
    updateStockInFirestore
  };
};

export default useStockOperations;
