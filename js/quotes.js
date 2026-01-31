const quotes = [
  "Discipline beats motivation.",
  "No zero days.",
  "You are competing with yesterday.",
  "Consistency is power.",
  "Small steps every day.",
  "Do it even when you don't feel like it.",
  "90 days can change everything."
];

const index = new Date().getDate() % quotes.length;
document.getElementById("quote").innerText = quotes[index];
