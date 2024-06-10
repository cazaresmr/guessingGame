let magicNumber = Math.floor(Math.random() * 100) + 1;
let playing = true;

function makeGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const feedback = document.getElementById("feedback");

  if (!guess) {
    feedback.textContent = "Please enter a valid number.";
    return;
  }

  if (guess === magicNumber) {
    feedback.textContent = `Congratulations, you guessed the magic number!`;
    if (window.confirm("Would you like to play again?")) {
      resetGame();
    } else {
      playing = false;
    }
  } else if (guess < magicNumber) {
    feedback.textContent = "Too low! Try again.";
  } else {
    feedback.textContent = "Too high! Try again.";
  }
}

function resetGame() {
  magicNumber = Math.floor(Math.random() * 100) + 1;
  document.getElementById("guessInput").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("message").textContent =
    "Guess the number between 1 and 100";
}

// Prompt user at the end to play again if the game ends
window.addEventListener("beforeunload", (event) => {
  if (playing) {
    event.preventDefault();
    event.returnValue = "";
  }
});
