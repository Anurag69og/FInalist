import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqH0qto__icf60ja-IZLyNIaJNMeF1wkY",
  authDomain: "study-challenge-96dab.firebaseapp.com",
  projectId: "study-challenge-96dab",
  storageBucket: "study-challenge-96dab.firebasestorage.app",
  messagingSenderId: "493026362192",
  appId: "1:493026362192:web:c059d9f9a46475afa6a255"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
