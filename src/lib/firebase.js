import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBX7KBqdcrcSjidTnq0pcZC6LSZuFHplj0',
  authDomain: 'statsolocked.firebaseapp.com',
  projectId: 'statsolocked',
  storageBucket: 'statsolocked.firebasestorage.app',
  messagingSenderId: '712346959483',
  appId: '1:712346959483:web:9c2786a1f5e86505e96cde',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
