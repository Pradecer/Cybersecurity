import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForDevelopmentPurposesOnly",
  authDomain: "cyber-lms-dev.firebaseapp.com",
  projectId: "cyber-lms-dev",
  storageBucket: "cyber-lms-dev.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
