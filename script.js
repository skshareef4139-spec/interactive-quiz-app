const QUESTION_DB = {
  cricket: [
    { q: "Most international centuries", o: ["Ponting", "Sachin", "Kohli", "Kallis"], a: 1 },
    { q: "First Cricket World Cup winner", o: ["India", "West Indies", "Australia", "England"], a: 1 },
    { q: "Home of Cricket", o: ["MCG", "Lords", "Oval", "Eden"], a: 1 },
    { q: "Captain Cool", o: ["Dhoni", "Dravid", "Rohit", "Kohli"], a: 0 },
    { q: "Fastest delivery bowler", o: ["Lee", "Akhtar", "Starc", "Tait"], a: 1 },
    // add 25+ cricket questions
  ],

  gk: [
    { q: "Capital of Australia", o: ["Sydney", "Melbourne", "Canberra", "Perth"], a: 2 },
    { q: "Largest desert", o: ["Gobi", "Sahara", "Kalahari", "Arctic"], a: 1 },
    { q: "National animal of India", o: ["Lion", "Tiger", "Elephant", "Peacock"], a: 1 },
    // add more
  ],

  ap_politics: [
    { q: "Current CM of Andhra Pradesh", o: ["Chandrababu", "Jagan", "Pawan", "KCR"], a: 1 },
    { q: "AP capital city", o: ["Vizag", "Amaravati", "Kurnool", "Guntur"], a: 1 },
    // add more
  ],

  science: [
    { q: "Chemical symbol of Gold", o: ["Ag", "Au", "Gd", "Go"], a: 1 },
    { q: "Speed of light is approx", o: ["3x10^8 m/s", "3x10^6 m/s", "3x10^5 km/s", "300 km/s"], a: 0 },
    // add more
  ],

  technology: [
    { q: "HTML stands for", o: ["Hyper Tool", "Hyper Text Markup Language", "High Text", "None"], a: 1 },
    { q: "JS is", o: ["Compiled", "Markup", "Interpreted", "Assembly"], a: 2 },
    // add more
  ]
};

const TOTAL_QUESTIONS = 10;
let currentCategory = "cricket";
let quiz = [];
let index = 0;
let score = 0;

const container = document.getElementById("quiz-container");
const categorySelect = document.getElementById("categorySelect");

categorySelect.addEventListener("change", () => {
  currentCategory = categorySelect.value;
  startQuiz();
});

function startQuiz() {
  const source = QUESTION_DB[currentCategory];
  quiz = [...source].sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
  index = 0;
  score = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = quiz[index];
  container.innerHTML = `
    <div class="progress">Question ${index + 1} of ${TOTAL_QUESTIONS}</div>
    <div class="question">${q.q}</div>
    <div class="options">
      ${q.o.map((opt, i) =>
        `<div class="option" onclick="selectAnswer(${i})">${opt}</div>`
      ).join("")}
    </div>
    <div class="footer">
      <div class="score">Score ${score}</div>
    </div>
  `;
}

function selectAnswer(choice) {
  const q = quiz[index];
  const options = document.querySelectorAll(".option");

  options.forEach((opt, i) => {
    opt.classList.add("disabled");
    if (i === q.a) opt.classList.add("correct");
    if (i === choice && i !== q.a) opt.classList.add("wrong");
  });

  if (choice === q.a) score++;

  setTimeout(() => {
    index++;
    index < TOTAL_QUESTIONS ? renderQuestion() : showResult();
  }, 900);
}

function showResult() {
  container.innerHTML = `
    <div class="result">
      <h2>Final Score</h2>
      <p>${score} / ${TOTAL_QUESTIONS}</p>
      <button onclick="startQuiz()">Restart Quiz</button>
    </div>
  `;
}

startQuiz();
