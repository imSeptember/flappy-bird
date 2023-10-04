function saveScore(score) {
  // Get the previous scores from localStorage or initialize an empty array
  const previousScores = JSON.parse(localStorage.getItem("scores")) || [];

  // Add the current score to the array
  previousScores.push(score);

  // If there are more than 10 scores, remove the oldest one
  if (previousScores.length > 10) {
    previousScores.shift(); // Remove the first (oldest) score
  }

  // Save the updated scores back to localStorage
  localStorage.setItem("scores", JSON.stringify(previousScores));
}

function displayScores() {
  const previousScores = JSON.parse(localStorage.getItem("scores")) || [];
  const scoresContainer = document.querySelector(".changedText");

  // Clear any previous scores in the container
  scoresContainer.innerHTML = "";

  // Iterate over the last 10 scores (or less if there are fewer scores)
  for (
    let i = Math.max(0, previousScores.length - 10);
    i < previousScores.length;
    i++
  ) {
    const scoreItem = document.createElement("div");
    scoreItem.textContent = `Game ${i + 1}: ${previousScores[i]} points`;
    scoresContainer.appendChild(scoreItem);
  }
}
