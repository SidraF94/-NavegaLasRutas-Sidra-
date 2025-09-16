import React, { createContext, useContext, useState, useCallback } from 'react';

const StockContext = createContext();

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStockContext debe ser usado dentro de StockProvider');
  }
  return context;
};

export const StockProvider = ({ children }) => {
  const [stockMap, setStockMap] = useState({});

  const updateStock = useCallback((itemId, newStock) => {
    setStockMap(prev => ({
      ...prev,
      [itemId]: newStock
    }));
  }, []);

  const getStock = useCallback((itemId, fallbackStock = 50) => {
    return stockMap[itemId] !== undefined ? stockMap[itemId] : fallbackStock;
  }, [stockMap]);

  const value = {
    stockMap,
    updateStock,
    getStock
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;
