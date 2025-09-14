import { STOCK_MAXIMO } from './constants';

export const getStockInicial = (itemId) => {
  const stockKey = `stock_${itemId}`;
  const stockGuardado = sessionStorage.getItem(stockKey);
  if (stockGuardado !== null) {
    return parseInt(stockGuardado);
  }
  
  sessionStorage.setItem(stockKey, STOCK_MAXIMO.toString());
  return STOCK_MAXIMO;
};

export const reducirStock = (itemId, cantidad) => {
  const stockActual = getStockInicial(itemId);
  const nuevoStock = Math.max(0, stockActual - cantidad);
  sessionStorage.setItem(`stock_${itemId}`, nuevoStock.toString());
  return nuevoStock;
};

export const restaurarStockCompleto = (itemId, cantidadComprada) => {
  const stockActual = getStockInicial(itemId);
  const nuevoStock = Math.min(STOCK_MAXIMO, stockActual + cantidadComprada);
  sessionStorage.setItem(`stock_${itemId}`, nuevoStock.toString());
  return nuevoStock;
};

export const getStockDisponible = (itemId) => {
  return getStockInicial(itemId);
};

export const isStockDisponible = (itemId, cantidad) => {
  return getStockDisponible(itemId) >= cantidad;
};
