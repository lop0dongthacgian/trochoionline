import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDos0xzvi80GzKeh6QUsE-E94uS0Uttlvg",
  authDomain: "trochoionline-37786.firebaseapp.com",
  projectId: "trochoionline-37786",
  storageBucket: "trochoionline-37786.firebasestorage.app",
  messagingSenderId: "743420798351",
  appId: "1:743420798351:web:3f0ea96ff17e868f8297fa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);