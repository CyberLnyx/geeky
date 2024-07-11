// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import config from "@/config";

const { FIRE_BASE } = config;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIRE_BASE.API_KEY,
  authDomain: FIRE_BASE.AUTH_DOMAIN,
  projectId: FIRE_BASE.PROJECT_ID,
  storageBucket: FIRE_BASE.STORAGE_BUCKET,
  messagingSenderId: FIRE_BASE.MESSAGING_SENDER_ID,
  appId: FIRE_BASE.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const storage = getStorage(app);
const auth = getAuth(app);

export { app, storage, auth };
