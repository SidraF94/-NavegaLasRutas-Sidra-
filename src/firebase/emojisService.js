import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = 'emojis';


export const getAllEmojis = async () => {
  try {
    const emojisRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(emojisRef);
    
    const emojis = [];
    snapshot.forEach((doc) => {
      emojis.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return emojis;
  } catch (error) {
    console.error('Error obteniendo emojis:', error);
    throw error;
  }
};

export const getEmojiById = async (id) => {
  try {
    const emojiRef = doc(db, COLLECTION_NAME, id);
    const emojiSnap = await getDoc(emojiRef);
    
    if (emojiSnap.exists()) {
      return {
        id: emojiSnap.id,
        ...emojiSnap.data()
      };
    } else {
      throw new Error('Emoji no encontrado');
    }
  } catch (error) {
    console.error('Error obteniendo emoji por ID:', error);
    throw error;
  }
};

export const getEmojisByCategory = async (categoria) => {
  try {
    const emojisRef = collection(db, COLLECTION_NAME);
    const q = query(emojisRef, where('categoria', '==', categoria));
    const snapshot = await getDocs(q);
    
    const emojis = [];
    snapshot.forEach((doc) => {
      emojis.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return emojis;
  } catch (error) {
    console.error('Error obteniendo emojis por categoría:', error);
    throw error;
  }
};

export const getEmojisPaginated = async (pageSize = 8, lastDoc = null) => {
  try {
    const emojisRef = collection(db, COLLECTION_NAME);
    let q = query(emojisRef, orderBy('id'), limit(pageSize));
    
    if (lastDoc) {
      q = query(emojisRef, orderBy('id'), startAfter(lastDoc), limit(pageSize));
    }
    
    const snapshot = await getDocs(q);
    const emojis = [];
    let lastVisible = null;
    
    snapshot.forEach((doc) => {
      emojis.push({
        id: doc.id,
        ...doc.data()
      });
      lastVisible = doc;
    });
    
    return {
      emojis,
      lastVisible,
      hasMore: snapshot.size === pageSize
    };
  } catch (error) {
    console.error('Error obteniendo emojis paginados:', error);
    throw error;
  }
};


export const addEmoji = async (emojiData) => {
  try {
    const emojisRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(emojisRef, emojiData);
    return docRef.id;
  } catch (error) {
    console.error('Error agregando emoji:', error);
    throw error;
  }
};


export const updateEmoji = async (id, emojiData) => {
  try {
    const emojiRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(emojiRef, emojiData);
  } catch (error) {
    console.error('Error actualizando emoji:', error);
    throw error;
  }
};


export const deleteEmoji = async (id) => {
  try {
    const emojiRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(emojiRef);
  } catch (error) {
    console.error('Error eliminando emoji:', error);
    throw error;
  }
};


export const getEmojiBySlug = async (slug) => {
  try {
    const emojis = await getAllEmojis();
    const foundEmoji = emojis.find(emoji => emoji.slug === slug);
    
    if (foundEmoji) {
      return foundEmoji;
    } else {
      throw new Error('Emoji no encontrado');
    }
  } catch (error) {
    console.error('Error obteniendo emoji por slug:', error);
    throw error;
  }
};

export const checkSlugExists = async (slug) => {
  try {
    const emojis = await getAllEmojis();
    const foundEmoji = emojis.find(emoji => emoji.slug === slug);
    return foundEmoji ? true : false;
  } catch (error) {
    console.error('Error verificando slug:', error);
    return false;
  }
};


export const getEmojiByEmoji = async (emoji) => {
  try {
    const emojis = await getAllEmojis();
    const foundEmoji = emojis.find(item => item.imagenUrl === emoji);
    
    if (foundEmoji) {
      return foundEmoji;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error obteniendo emoji por emoji:', error);
    throw error;
  }
};

export const updateEmojiStock = async (id, cantidad) => {
  try {
    const emojiRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(emojiRef, { stock: cantidad });
  } catch (error) {
    console.error('Error actualizando stock:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const emojis = await getAllEmojis();
    const categorias = [...new Set(emojis.map(emoji => emoji.categoria))];
    return categorias.sort();
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    throw error;
  }
};
