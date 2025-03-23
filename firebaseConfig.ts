// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByPEaxcA_z_qtNBJq7wvXLQx2DIWfNRTg",
  authDomain: "gym-management-system-7a77a.firebaseapp.com",
  projectId: "gym-management-system-7a77a",
  storageBucket: "gym-management-system-7a77a.appspot.com",
  messagingSenderId: "305036963651",
  appId: "1:305036963651:web:df7000f2bb7e22514889f6",
  measurementId: "G-9RF8LQPW2K",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
