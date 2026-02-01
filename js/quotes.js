const QUOTES = [
  "Discipline beats motivation.",
  "No zero days.",
  "Do it even when you don’t feel like it.",
  "Consistency is self-respect.",
  "Small steps every day.",
  "Future you is watching.",
  "90 days can change your life.",
  "Focus. Execute. Repeat.",
  "One day or day one.",
  "You will thank yourself later."
];

function loadQuotes() {
  const grid = document.getElementById("quotes-grid");
  if (!grid) return;

  grid.innerHTML = "";
  QUOTES.forEach(q => {
    const div = document.createElement("div");
    div.className = "quote-box";
    div.innerText = q;
    grid.appendChild(div);
  });
}

/* run once page loads */
document.addEventListener("DOMContentLoaded", loadQuotes);

/* run again after login */
window.addEventListener("user-ready", loadQuotes);
