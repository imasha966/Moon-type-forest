import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBX1qgotM8jSdoAzwCNdZstAnBstGPDQCo",
  authDomain: "moontype-forest.firebaseapp.com",
  databaseURL: "https://moontype-forest-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moontype-forest",
  storageBucket: "moontype-forest.firebasestorage.app",
  messagingSenderId: "37032274108",
  appId: "1:37032274108:web:44e49788ec7f97b340c8b9"
};
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);