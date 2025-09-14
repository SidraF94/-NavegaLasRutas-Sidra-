import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1zPx48_7eR3GSqO5PCJgBOdPvs6CQiP8",
    authDomain: "proyect-react-emoji.firebaseapp.com",
    projectId: "proyect-react-emoji",
    storageBucket: "proyect-react-emoji.firebasestorage.app",
    messagingSenderId: "677641859600",
    appId: "1:677641859600:web:b23ccf8999c4b3e2cf1095",
    measurementId: "G-H1Y5TRGTEB"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
