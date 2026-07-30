// Rock Paper Scissors — versiunea vizuala (in pagina, nu in consola).

// ===== Scorul (variabile globale) =====
let humanScore = 0;
let computerScore = 0;
let humanChoice = null; // ce a ales jucatorul; null = inca nimic
const TOTAL_ROUNDS = 5;
let roundsPlayed = 0;

// ===== Legaturi cu elementele din HTML =====
const humanScoreEl = document.querySelector("#human-score");
const computerScoreEl = document.querySelector("#computer-score");
const resultEl = document.querySelector("#result");
const playButton = document.querySelector("#play-button");
const choicesContainer = document.querySelector(".choices");
const choiceButtons = document.querySelectorAll(".choice");

// ===== Alegerea calculatorului (random) =====
function getComputerChoice() {
  const roll = Math.floor(Math.random() * 3);
  if (roll === 0) return "rock";
  if (roll === 1) return "paper";
  return "scissors";
}

// ===== Emoji pentru fiecare alegere (pentru mesaje) =====
function icon(choice) {
  if (choice === "rock") return "✊";
  if (choice === "paper") return "✋";
  return "✌️";
}

// ===== Selectarea unei iconite prin click =====
// Fiecare iconita asculta un click; cea aleasa ramane evidentiata.
choiceButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    humanChoice = button.dataset.choice; // "rock" / "paper" / "scissors"

    // scoate selectia de pe toate, apoi o pune doar pe cea apasata
    choiceButtons.forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");

    // sterge celelalte iconite (clasa .locked din CSS)
    choicesContainer.classList.add("locked");

    resultEl.textContent = `You chose ${icon(humanChoice)} — press Play Game!`;
  });
});

// ===== O singura runda =====
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return `It's a tie! You both chose ${icon(humanChoice)}`;
  }

  const humanWins =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  if (humanWins) {
    humanScore++;
    return `You win! ${icon(humanChoice)} beats ${icon(computerChoice)}`;
  } else {
    computerScore++;
    return `You lose! ${icon(computerChoice)} beats ${icon(humanChoice)}`;
  }
}

// ===== Afiseaza scorul pe ecran =====
function updateScore() {
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;
}

// ===== Reseteaza pentru un joc nou =====
function resetGame() {
  humanScore = 0;
  computerScore = 0;
  roundsPlayed = 0;
  humanChoice = null;
  updateScore();
  choiceButtons.forEach((b) => b.classList.remove("selected"));
  choicesContainer.classList.remove("locked");
  playButton.textContent = "Play Game";
}

// ===== Butonul Play Game =====
playButton.addEventListener("click", function () {
  // Daca jocul s-a terminat, apasarea reporneste totul.
  if (roundsPlayed >= TOTAL_ROUNDS) {
    resetGame();
    resultEl.textContent = "New game! Choose an icon, then press Play Game.";
    return;
  }

  // Trebuie sa fi ales o iconita inainte de a juca.
  if (humanChoice === null) {
    resultEl.textContent = "Pick an icon first!";
    return;
  }

  const computerChoice = getComputerChoice();
  const message = playRound(humanChoice, computerChoice);

  updateScore();
  resultEl.textContent = message;
  roundsPlayed++;

  // mica animatie (shake) la fiecare runda
  choicesContainer.classList.add("shake");
  setTimeout(() => choicesContainer.classList.remove("shake"), 400);

  // pregateste urmatoarea runda: deblocheaza alegerea
  humanChoice = null;
  choiceButtons.forEach((b) => b.classList.remove("selected"));
  choicesContainer.classList.remove("locked");

  // La final de joc, anunta castigatorul.
  if (roundsPlayed >= TOTAL_ROUNDS) {
    let finalMessage;
    if (humanScore > computerScore) {
      finalMessage = `🏆 You won the game ${humanScore}–${computerScore}!`;
    } else if (humanScore < computerScore) {
      finalMessage = `😢 You lost the game ${humanScore}–${computerScore}.`;
    } else {
      finalMessage = `🤝 The game is a tie ${humanScore}–${computerScore}.`;
    }
    resultEl.textContent = finalMessage;
    playButton.textContent = "Play Again";
  }
});
