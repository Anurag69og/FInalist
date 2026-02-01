import { db } from "./firebase.js";
import {
  doc, setDoc, getDocs, collection, query, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const submitBtn = document.getElementById("submitBtn");
const hoursSelect = document.getElementById("hours");
const historyEl = document.getElementById("history");

const arunBar = document.getElementById("bar-arun");
const krutiBar = document.getElementById("bar-kruti");
const arunTotalEl = document.getElementById("arun-total");
const krutiTotalEl = document.getElementById("kruti-total");

/* ---------- HOURS OPTIONS (3.5 → 13.5) ---------- */
function generateHours() {
  hoursSelect.innerHTML = `<option value="">Select hours</option>`;
  let h = 3.5;
  for (let i = 0; i < 20; i++) {
    hoursSelect.innerHTML += `<option value="${h}">${h} hrs</option>`;
    h += 0.5;
  }
}
generateHours();

/* ---------- DATE ---------- */
function today() {
  return new Date().toISOString().split("T")[0];
}

/* ---------- SUBMIT ---------- */
submitBtn.onclick = async () => {
  const hours = hoursSelect.value;
  if (!hours) return alert("Select hours");

  if (!window.currentUser) {
    alert("User not ready, refresh page");
    return;
  }

  const ref = doc(db, "users", window.currentUser, "days", today());
  await setDoc(ref, { hours: Number(hours) });

  await loadData();
  alert("Saved!");
};

/* ---------- LOAD DATA ---------- */
async function loadData() {
  historyEl.innerHTML = "";

  const users = ["arun", "kruti"];
  const totals = { arun: 0, kruti: 0 };

  for (let u of users) {
    const q = query(
      collection(db, "users", u, "days"),
      orderBy("__name__", "desc"),
      limit(7)
    );

    const snap = await getDocs(q);
    snap.forEach(d => {
      if (u === window.currentUser) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${d.id}</span><span>${d.data().hours}h</span>`;
        historyEl.appendChild(li);
      }
      totals[u] += d.data().hours;
    });
  }

  arunTotalEl.innerText = totals.arun + "h";
  krutiTotalEl.innerText = totals.kruti + "h";

  const max = Math.max(totals.arun, totals.kruti) || 1;
  arunBar.style.width = (totals.arun / max) * 100 + "%";
  krutiBar.style.width = (totals.kruti / max) * 100 + "%";
}

/* ---------- COUNTER ---------- */
const START_KEY = "challengeStart";

function getStartDate() {
  let s = localStorage.getItem(START_KEY);
  if (s) return new Date(s);

  const now = new Date();
  localStorage.setItem(START_KEY, now.toISOString());
  return now;
}

function updateCounter() {
  const start = getStartDate();
  const now = new Date();

  const passed = Math.floor((now - start) / 86400000) + 1;
  const left = Math.max(0, 90 - passed);

  document.getElementById("day-progress").innerText = `Day ${passed} / 90`;
  document.getElementById("day-left").innerText = `${left} days left`;
}

updateCounter();
setInterval(updateCounter, 60000);

/* ---------- AUTO LOAD ---------- */
setTimeout(loadData, 1500);
