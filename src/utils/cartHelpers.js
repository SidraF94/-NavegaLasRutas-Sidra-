export const createCartItem = (item, quantity) => ({
  id: item.id,
  titulo: item.titulo,
  precio: item.precio,
  imagenUrl: item.imagenUrl,
  cantidad: quantity
});

export const calculateTotalItems = (items) => {
  return items.reduce((sum, item) => sum + item.cantidad, 0);
};

export const calculateTotalPrice = (items) => {
  return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
};

export const findCartItem = (carrito, itemId) => {
  return carrito.find(item => item.id === itemId);
};

export const updateItemQuantity = (carrito, itemId, quantity) => {
  return carrito.map(item =>
    item.id === itemId
      ? { ...item, cantidad: item.cantidad + quantity }
      : item
  );
};
