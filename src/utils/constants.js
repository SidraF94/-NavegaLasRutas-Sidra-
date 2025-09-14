export const EMOJIS_POR_PAGINA = 8;
export const DELAY_CARGA = 1000;

export const CATEGORIAS_MAP = {
  'caras': 'caras',
  'animales': 'animales', 
  'comida': 'comida',
  'actividades': 'actividades',
  'objetos': 'objetos',
  'simbolos': 'simbolos',
  'banderas': 'banderas'
};

export const CATEGORIAS_DISPONIBLES = [
  { id: 'todas', nombre: 'Todas', emoji: '🌟' },
  { id: 'caras', nombre: 'Caras', emoji: '😀' },
  { id: 'animales', nombre: 'Animales', emoji: '🐶' },
  { id: 'comida', nombre: 'Comida', emoji: '🍎' },
  { id: 'actividades', nombre: 'Actividades', emoji: '⚽' },
  { id: 'objetos', nombre: 'Objetos', emoji: '📱' },
  { id: 'simbolos', nombre: 'Símbolos', emoji: '❤️' },
  { id: 'banderas', nombre: 'Banderas', emoji: '🏳️' }
];

export const STORAGE_KEYS = {
  CARRITO: 'carrito',
  MODO_NOCTURNO: 'modoNocturno',
  NOMBRE_USUARIO: 'nombreUsuario'
};

export const STOCK_INICIAL = 50;
export const STOCK_MAXIMO = 50;