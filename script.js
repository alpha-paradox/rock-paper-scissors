// Rock Paper Scissors — played entirely in the console.

// Step 2: randomly return "rock", "paper" or "scissors".
function getComputerChoice() {
  const roll = Math.floor(Math.random() * 3);
  if (roll === 0) return "rock";
  if (roll === 1) return "paper";
  return "scissors";
}

// Step 3: get the human choice via prompt (assumes valid input).
function getHumanChoice() {
  return prompt("Enter your choice: rock, paper or scissors");
}

// Step 6: play the whole game — scores live inside playGame.
function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  // Step 5: play a single round.
  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();

    if (humanChoice === computerChoice) {
      console.log(`It's a tie! You both chose ${humanChoice}`);
      return;
    }

    const humanWins =
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper");

    if (humanWins) {
      humanScore++;
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    } else {
      computerScore++;
      console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    }
  }

  for (let round = 0; round < 5; round++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }

  console.log(`Final score — You: ${humanScore}, Computer: ${computerScore}`);
  if (humanScore > computerScore) {
    console.log("You won the game!");
  } else if (humanScore < computerScore) {
    console.log("You lost the game!");
  } else {
    console.log("The game is a tie!");
  }
}

playGame();
