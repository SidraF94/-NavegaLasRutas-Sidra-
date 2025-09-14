const useFormateo = () => {
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(precio);
  };

  const formatearPrecioConSimbolo = (precio, simbolo = '$') => {
    return `${simbolo} ${precio.toLocaleString('es-AR')}`;
  };

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('es-AR');
  };

  const formatearFecha = (fecha) => {
    return new Intl.DateTimeFormat('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(fecha));
  };

  const formatearTexto = (texto, maxLength = 50) => {
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength) + '...';
  };

  const formatearTitulo = (titulo) => {
    return titulo.charAt(0).toUpperCase() + titulo.slice(1).toLowerCase();
  };

  const formatearCategoria = (categoria) => {
    const categoriasMap = {
      'caras': 'Caras',
      'animales': 'Animales',
      'comida': 'Comida',
      'actividades': 'Actividades',
      'objetos': 'Objetos',
      'simbolos': 'Símbolos',
      'banderas': 'Banderas',
      'emociones': 'Emociones',
      'bebidas': 'Bebidas',
      'fantasia': 'Fantasía',
      'tecnologia': 'Tecnología',
      'celebraciones': 'Celebraciones',
      'amor': 'Amor',
      'gestos': 'Gestos',
      'elementos': 'Elementos',
      'diversion': 'Diversión'
    };
    
    return categoriasMap[categoria] || categoria;
  };

  const formatearStock = (stock) => {
    if (stock === 0) return 'Sin stock';
    if (stock === 1) return '1 unidad';
    return `${stock} unidades`;
  };

  const formatearPorcentaje = (valor, total) => {
    if (total === 0) return '0%';
    const porcentaje = Math.round((valor / total) * 100);
    return `${porcentaje}%`;
  };

  return {
    formatearPrecio,
    formatearPrecioConSimbolo,
    formatearCantidad,
    formatearFecha,
    formatearTexto,
    formatearTitulo,
    formatearCategoria,
    formatearStock,
    formatearPorcentaje
  };
};

export default useFormateo;
