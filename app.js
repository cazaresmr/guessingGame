let magicNumber = Math.floor(Math.random() * 100) + 1;
let playing = true;
let guessCount = 0;
let isDarkMode = true;

document
  .getElementById("guessInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      makeGuess();
    }
  });

document.getElementById("toggleMode").addEventListener("click", function () {
  isDarkMode = !isDarkMode;
  toggleMode();
});

function toggleMode() {
  const body = document.body;
  const toggleButton = document.getElementById("toggleMode");

  if (isDarkMode) {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    toggleButton.textContent = "Switch to Light Mode";
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    toggleButton.textContent = "Switch to Dark Mode";
  }
}

function makeGuess() {
  const guessInput = document.getElementById("guessInput");
  const feedback = document.getElementById("feedback");
  const guess = parseInt(guessInput.value);

  if (isNaN(guess)) {
    feedback.textContent = "Please enter a valid number.";
    return;
  }

  guessCount++;

  if (guess === magicNumber) {
    feedback.textContent = `Congratulations, you guessed the magic number ${magicNumber} in ${guessCount} guesses!`;
    setTimeout(() => askToPlayAgain(), 100); // Delay to ensure feedback is visible before prompt
  } else if (guess < magicNumber) {
    feedback.textContent = "Too low! Try again.";
  } else {
    feedback.textContent = "Too high! Try again.";
  }

  guessInput.value = ""; // Clear the input field after each guess
}

function askToPlayAgain() {
  if (window.confirm("Would you like to play again?")) {
    resetGame();
  } else {
    playing = false;
    document.getElementById("feedback").textContent = "";
    document.getElementById("playButton").classList.remove("hidden");
  }
}

function resetGame() {
  magicNumber = Math.floor(Math.random() * 100) + 1;
  guessCount = 0;
  document.getElementById("guessInput").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("message").textContent =
    "Guess the number between 1 and 100";
  document.getElementById("playButton").classList.add("hidden");
}

// Ensure prompt on page unload if game is still playing
window.addEventListener("beforeunload", (event) => {
  if (playing) {
    event.preventDefault();
    event.returnValue = "";
  }
});

// Initialize the mode to dark mode by default
toggleMode();
