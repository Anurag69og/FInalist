import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const errorBox = document.getElementById("login-error");

loginBtn.onclick = async () => {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    errorBox.innerText = "Enter username and password";
    return;
  }

  const email = `${username}@app.local`;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  }catch (e) {
  console.error(e);
  errorBox.innerText = e.code;
}
};

logoutBtn.onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
    window.currentUser = user.email.split("@")[0]; // Arun / Kruti
  } else {
    loginScreen.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
});
