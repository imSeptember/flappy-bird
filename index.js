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

  //
  // BUTTONS
  //

  const settings = document.querySelector(".settings");
  const openClose = document.querySelector(".open-close");

  function openOrClose() {
    if (settings.classList.contains("hide")) {
      openClose.style.display = "block";
      settings.classList.remove("hide");
      settings.textContent = "Close";
    } else {
      openClose.style.display = "none";
      settings.classList.add("hide");
      settings.textContent = "Settings";
    }
  }

  settings.addEventListener("click", openOrClose);

  //
  // BUTTONS
  //

  const start = document.querySelector(".start-game");
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");

  function checkWish() {
    bird.style.display = "block";
    start.style.display = "none";
    let birdLeft = 220;
    let birdBottom = 250;
    let gravity = 2;
    let isGameOver = false;
    let gap = 430;

    function startGame() {
      birdBottom -= gravity;
      bird.style.bottom = birdBottom + "px";
    }

    let gameTimerId = setInterval(startGame, 20);

    let index = 0;

    function wings() {
      if (!isGameOver) {
        bird.src = flyAnimation[index];
        index++; // Increment the index

        if (index >= flyAnimation.length) {
          index = 0; // Reset the index if it exceeds the array length
        }
      }
    }

    setInterval(wings, 200);

    function control(e) {
      if (e.keyCode === 32) {
        jump();
      }
    }

    function jump() {
      if (birdBottom < 500) birdBottom += 50;
      bird.style.bottom = birdBottom + "px";
    }

    document.addEventListener("keyup", control);

    let showScore = -1;
    let scoreNumber = document.querySelector(".score");

    function scoreUp() {
      showScore++;
      if (!isGameOver) {
        scoreNumber.src = scoreArr[showScore];
      }
    }

    function generateObstacle() {
      let randomHeight = Math.random() * 60;
      let obstacleLeft = 500;
      let obstacleBottom = randomHeight;
      const obstacle = document.createElement("div");
      const topObstacle = document.createElement("div");

      if (!isGameOver) {
        obstacle.classList.add("obstacle");
        topObstacle.classList.add("topObstacle");
      }
      gameDisplay.appendChild(obstacle);
      gameDisplay.appendChild(topObstacle);
      obstacle.style.left = obstacleLeft + "px";
      obstacle.style.bottom = obstacleBottom + "px";
      topObstacle.style.left = obstacleLeft + "px";
      topObstacle.style.bottom = obstacleBottom + gap + "px";

      function moveObstacle() {
        if (!isGameOver) {
          obstacleLeft -= 2;
          obstacle.style.left = obstacleLeft + "px";
          topObstacle.style.left = obstacleLeft + "px";
          if (obstacleLeft === -60) {
            clearInterval(timerId);
            gameDisplay.removeChild(obstacle);
            gameDisplay.removeChild(topObstacle);
          }

          //
          // CONSOLE
          //
          const topConsole = document.querySelector(".top-screen-content");
          topConsole.textContent = obstacleLeft;
          const botConsole = document.querySelector(".bot-screen-content");
          botConsole.textContent = Math.round(obstacleBottom);
          const birdPosition = document.querySelector(".bird-position");
          birdPosition.textContent = birdBottom;

          //
          // CONSOLE
          //

          if (
            //check if obs in centre
            (obstacleLeft > 200 &&
              obstacleLeft < 280 &&
              //check if bird can fly above bot obs
              (birdBottom < obstacleBottom + 200 ||
                // increase 200 if height container is making smaller
                birdBottom > obstacleBottom + gap - 150)) ||
            // increase 150 if height container  is making biger
            birdBottom === 0
          ) {
            gameOver();
            clearInterval(timerId);
          }
        }
      }
      let timerId = setInterval(moveObstacle, 20);
      if (!isGameOver) setTimeout(generateObstacle, 3000);
      setTimeout(scoreUp, 500);
    }
    generateObstacle();

    function gameOver() {
      clearInterval(gameTimerId);
      console.log("game over");
      isGameOver = true;
      document.removeEventListener("keyup", control);
    }
  }

  start.addEventListener("click", checkWish);
});
