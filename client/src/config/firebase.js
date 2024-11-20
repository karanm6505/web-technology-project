import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDNv6yrXzdH5KA3-OqHX3cQ86rmiv3GhN4",
    authDomain: "webtech-80dfb.firebaseapp.com",
    projectId: "webtech-80dfb",
    storageBucket: "webtech-80dfb.firebasestorage.app",
    messagingSenderId: "224579990241",
    appId: "1:224579990241:web:a9e33f08f7d01d0a78fda0",
    measurementId: "G-DB3TB23Y8H"
  };
  

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 