import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const errorBox = document.getElementById("login-error");

let isLoggingIn = false;

loginBtn.onclick = async () => {
  if (isLoggingIn) return; // 🔒 prevent spam
  isLoggingIn = true;

  errorBox.innerText = "";

  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    errorBox.innerText = "Enter username and password";
    isLoggingIn = false;
    return;
  }

  const email = `${username}@app.local`;

  try {
    await setPersistence(auth, browserLocalPersistence); // stay logged in
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    errorBox.innerText = e.code;
    isLoggingIn = false;
  }
};

logoutBtn.onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
    window.currentUser = user.email.split("@")[0];
    isLoggingIn = false;
  } else {
    loginScreen.classList.remove("hidden");
    dashboard.classList.add("hidden");
    isLoggingIn = false;
  }
});
