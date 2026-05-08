// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ก๊อปปี้ก้อนนี้มาจากเว็บ Firebase ของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyAHZ6x_Zk6dHC1prIRbVvrtzDdqFHAjsso",
  authDomain: "jingjaibase-220dd.firebaseapp.com",
  projectId: "jingjaibase-220dd",
  storageBucket: "jingjaibase-220dd.firebasestorage.app",
  messagingSenderId: "249884691266",
  appId: "1:249884691266:web:76332a745a5f0264bbd6db"
};

// เริ่มต้นเปิดใช้งาน Firebase และ Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);