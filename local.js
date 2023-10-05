function saveScore(score) {
  // Get the previous scores from localStorage or initialize an empty array
  const previousScores = JSON.parse(localStorage.getItem("scores")) || [];

  // Add the current score to the array
  if (score < 0) {
    previousScores.push(1);
  } else previousScores.push(score);
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
    scoreItem.classList.add("leaderbord-item");
    // scoreItem.style.display = "flex";
    // scoreItem.style.alignItems = "center";
    // if (i + 1 == 10) {
    //   scoreItem.style.marginRight = "40px";
    // }
    scoreItem.textContent = `Game ${i + 1}: ${previousScores[i]}`;
    scoresContainer.appendChild(scoreItem);
    const scoreMedal = document.createElement("img");

    switch (previousScores[i]) {
      case 10:
        scoreMedal.src = "img/gold-medal.png";
        break;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        scoreMedal.src = "img/silver-medal.png";
        break;
      default:
        scoreMedal.src = "img/copper-medal.png";
        break;
    }
    scoreMedal.style.marginLeft = "20px";
    scoreMedal.style.width = "20px";
    scoreMedal.style.height = "20px";
    scoreItem.appendChild(scoreMedal);
  }
}
