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

function today() {
  return new Date().toISOString().split("T")[0];
}

/* ---------- SUBMIT ---------- */
submitBtn.onclick = async () => {
  const hours = hoursSelect.value;
  if (!hours) return alert("Select hours");

  const user = window.currentUser;
  const ref = doc(db, "users", user, today());

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
      collection(db, "users", u),
      orderBy("__name__", "desc"),
      limit(7)
    );

    const snap = await getDocs(q);
    snap.forEach(doc => {
      if (u === window.currentUser) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${doc.id}</span><span>${doc.data().hours}h</span>`;
        historyEl.appendChild(li);
      }
      totals[u] += doc.data().hours;
    });
  }

  arunTotalEl.innerText = totals.arun + "h";
  krutiTotalEl.innerText = totals.kruti + "h";

  const max = Math.max(totals.arun, totals.kruti) || 1;
  arunBar.style.width = (totals.arun / max) * 100 + "%";
  krutiBar.style.width = (totals.kruti / max) * 100 + "%";
}

/* ---------- COUNTERS ---------- */
function updateCounter() {
  const start = new Date("2026-02-01");
  const end = new Date("2026-05-01");
  const now = new Date();

  const passed = Math.floor((now - start) / 86400000) + 1;
  const left = Math.max(0, Math.floor((end - now) / 86400000));

  document.getElementById("day-progress").innerText = `Day ${passed} / 90`;
  document.getElementById("day-left").innerText = `${left} days left`;
}

updateCounter();
setInterval(updateCounter, 60 * 1000);

window.loadData = loadData;
setTimeout(loadData, 1500);
