// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdH8es0sfIc6Yvf8VsaOWK_5fpYlaXPwQ",
  authDomain: "kaam-krne-wale.firebaseapp.com",
  projectId: "kaam-krne-wale",
  storageBucket: "kaam-krne-wale.appspot.com",
  messagingSenderId: "628315705375",
  appId: "1:628315705375:web:6cea27964795b90d79852a",
  measurementId: "G-G5NC6XE8XX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
