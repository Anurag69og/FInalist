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
  for (const q of QUOTES) {
    const box = document.createElement("div");
    box.className = "quote-box";
    box.textContent = q;
    grid.appendChild(box);
  }
}

/* run after page load */
window.addEventListener("load", loadQuotes);

/* run after login */
window.addEventListener("user-ready", loadQuotes);
