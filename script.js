document.addEventListener("DOMContentLoaded", () => {
  const flyAnimation = [
    "img/yellowbird-downflap.png",
    "img/yellowbird-midflap.png",
    "img/yellowbird-upflap.png",
  ];

  const scoreArr = [
    "img/0.png",
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/9.png",
  ];

  const start = document.querySelector(".start-game");
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const scoreNumber = document.querySelector(".score");
  const sky = document.querySelector(".sky");

  let scoreTimeId;
  let ObsTimerId;
  let gameTimerId;
  let genTimerID;
  let birdBottom = 250;
  let gravity = 2;
  let isGameOver = true; // Initialize the game as "game over"
  let gap = 430;
  let showScore = -1;
  let index = 0;

  function scoreUp() {
    if (isGameOver) {
      return;
    }
    showScore++;
    if (!isGameOver) {
      scoreNumber.src = scoreArr[showScore];
    }
    if (showScore === 10) gameWinner();
  }

  function generateObstacle() {
    if (isGameOver) return; // Don't generate obstacles if the game is over

    let randomHeight = Math.random() * 60;
    let obstacleLeft = 500;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");

    obstacle.classList.add("obstacle");
    topObstacle.classList.add("topObstacle");
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    obstacle.classList.add("temp-obs");
    topObstacle.style.left = obstacleLeft + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";
    topObstacle.classList.add("temp-obs");

    function moveObstacle() {
      if (isGameOver) return;

      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -60) {
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }

      // Check for collision
      if (
        obstacleLeft > 150 &&
        obstacleLeft < 230 &&
        (birdBottom < obstacleBottom + 200 ||
          birdBottom > obstacleBottom + gap - 150)
      ) {
        gameOver();
      }
    }

    ObsTimerId = setInterval(moveObstacle, 20);
    genTimerID = setTimeout(generateObstacle, 3000);
    setTimeout(scoreUp, 500);

    if (!isGameOver) {
      // Call moveObstacle after a short delay
      setTimeout(() => {
        moveObstacle();
      }, 0);
    }
  }

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
  }

  function startGameLogic() {
    gameTimerId = setInterval(startGame, 20);
  }

  function stopGameLogic() {
    clearInterval(gameTimerId);
    clearInterval(ObsTimerId);
  }

  function wings() {
    if (!isGameOver) {
      bird.src = flyAnimation[index];
      index++;

      if (index >= flyAnimation.length) {
        index = 0;
      }
    }
  }

  setInterval(wings, 200);

  function control(e) {
    if (e.keyCode === 87) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
  }

  document.addEventListener("keyup", control);

  const gameOverImg = document.querySelector(".end-game");
  const gameWinImg = document.querySelector(".win-game");

  gameOverImg.addEventListener("click", restart);
  gameWinImg.addEventListener("click", restart);

  function gameWinner() {
    stopGameLogic();
    isGameOver = true;
    document.removeEventListener("keyup", control);
    sky.removeEventListener("click", jump);
    gameWinImg.style.display = "block";
    gameDisplay.style.animation = "none"; // Stop the background animation
    clearInterval(gameTimerId);
    clearInterval(ObsTimerId);
    clearTimeout(scoreTimeId);
    clearTimeout(genTimerID);
    // const formDataJSON = JSON.stringify(showScore);
    // localStorage.setItem("formData", formDataJSON);
    saveScore(showScore);
  }

  function gameOver() {
    gameOverImg.style.display = "block";
    stopGameLogic();
    isGameOver = true;
    document.removeEventListener("keyup", control);
    sky.removeEventListener("click", jump);
    gameDisplay.style.animation = "none"; // Stop the background animation
    clearInterval(gameTimerId);
    clearInterval(ObsTimerId);
    clearTimeout(scoreTimeId);
    clearTimeout(genTimerID);
    saveScore(showScore);
  }

  function removeObs() {
    const elementsToRemove = gameDisplay.querySelectorAll(".temp-obs");
    elementsToRemove.forEach((element) => {
      gameDisplay.removeChild(element);
    });
  }

  function restart() {
    isGameOver = false;
    showScore = -1;
    removeObs();
    birdBottom = 250;
    scoreNumber.src = scoreArr[0];
    gameWinImg.style.display = "none";
    gameOverImg.style.display = "none";
    document.addEventListener("keyup", control);
    sky.addEventListener("click", jump);
    startGameLogic();
    generateObstacle();
  }

  function checkWish() {
    start.style.display = "none";
    bird.style.display = "block";
    isGameOver = false;
    startGameLogic();
    generateObstacle();
  }

  start.addEventListener("click", checkWish);
  sky.addEventListener("click", jump);
});
