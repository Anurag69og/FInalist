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

// global user setter
window.setUser = (u) => {
  window.currentUser = u;
};

loginBtn.onclick = async () => {
  if (isLoggingIn) return;
  isLoggingIn = true;

  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    errorBox.innerText = "Enter username and password";
    isLoggingIn = false;
    return;
  }

  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, `${username}@app.local`, password);
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
    window.setUser(user.email.split("@")[0]);
    isLoggingIn = false;
  } else {
    loginScreen.classList.remove("hidden");
    dashboard.classList.add("hidden");
    isLoggingIn = false;
  }
});
