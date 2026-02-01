const QUOTES = [
  "Discipline is choosing what you want most over what you want now.",
  "No zero days.",
  "Your future is created today, not tomorrow.",
  "Small steps every day lead to big change.",
  "Consistency beats intensity.",
  "You are competing with who you were yesterday.",
  "90 days of pain, lifetime of pride.",
  "Focus. Execute. Repeat.",
  "You didn’t come this far to stop."
];

const grid = document.getElementById("quotes-grid");

if (grid) {
  grid.innerHTML = "";
  QUOTES.forEach(q => {
    const box = document.createElement("div");
    box.className = "quote-box";
    box.innerText = q;
    grid.appendChild(box);
  });
}
