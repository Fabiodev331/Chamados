import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAAEzlhB9l-Uyr3ucV1d3rc5WxxhPRQfPg",
  authDomain: "chamados-b9b12.firebaseapp.com",
  projectId: "chamados-b9b12",
  storageBucket: "chamados-b9b12.appspot.com",
  messagingSenderId: "495811880877",
  appId: "1:495811880877:web:16dd61904959ce3a19a324",
  measurementId: "G-W9GW2RN39D"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };