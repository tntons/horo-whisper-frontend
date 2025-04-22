// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZYh_4MNEOS0XE5LX7lDj32XJqkPqkVTM",
  authDomain: "horowhisperfile.firebaseapp.com",
  projectId: "horowhisperfile",
  storageBucket: "horowhisperfile.firebasestorage.app",
  messagingSenderId: "168485112317",
  appId: "1:168485112317:web:a508ac2d7a9e3bd6b2b194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);