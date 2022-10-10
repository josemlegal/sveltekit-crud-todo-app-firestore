import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZKmaiKWRFQLflbJ6nIpQUyJmqU0Opnlw",
  authDomain: "svelte-crud-todo-app.firebaseapp.com",
  projectId: "svelte-crud-todo-app",
  storageBucket: "svelte-crud-todo-app.appspot.com",
  messagingSenderId: "1033099382625",
  appId: "1:1033099382625:web:fecdd8838fb72a699dbf20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
