import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

const COMPRAS_COLLECTION = 'compras';

// Crear una nueva compra
export const crearCompra = async (compraData) => {
  try {
    const comprasRef = collection(db, COMPRAS_COLLECTION);
    const docRef = await addDoc(comprasRef, {
      ...compraData,
      fecha: new Date(),
      estado: 'completada'
    });
    
    return {
      id: docRef.id,
      ...compraData,
      fecha: new Date(),
      estado: 'completada'
    };
  } catch (error) {
    console.error('Error creando compra:', error);
    throw error;
  }
};


