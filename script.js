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
      setTimeout(() => {
        moveObstacle();
      }, 0);
    }
  }

  function generateGround() {
    if (isGameOver) return;

    let groundLeft = 0;
    const ground1 = document.createElement("div");
    const ground2 = document.createElement("div");

    ground1.classList.add("ground");
    ground2.classList.add("ground");

    gameDisplay.appendChild(ground1);
    gameDisplay.appendChild(ground2);

    ground1.style.left = groundLeft + "px";
    ground2.style.left = groundLeft + 400 + "px";

    function moveGround() {
      if (isGameOver) return;

      groundLeft -= 2;
      ground1.style.left = groundLeft + "px";
      ground2.style.left = groundLeft + 400 + "px";

      if (groundLeft <= -400) {
        gameDisplay.removeChild(ground1);
        gameDisplay.removeChild(ground2);
        groundLeft += 400;
        ground1.style.left = groundLeft + "px";
        generateGround();
      }
    }

    groundTimerId = setInterval(moveGround, 20);
  }

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
  }

  function startGameLogic() {
    generateGround();
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
    gameDisplay.style.animation = "none";
    clearInterval(gameTimerId);
    clearInterval(ObsTimerId);
    clearTimeout(scoreTimeId);
    clearTimeout(genTimerID);
    saveScore(showScore);
  }

  function gameOver() {
    gameOverImg.style.display = "block";
    stopGameLogic();
    isGameOver = true;
    document.removeEventListener("keyup", control);
    sky.removeEventListener("click", jump);
    gameDisplay.style.animation = "none";
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

  function removeGround() {
    const elementsToRemove = gameDisplay.querySelectorAll(".ground");
    elementsToRemove.forEach((element) => {
      gameDisplay.removeChild(element);
    });
  }

  function restart() {
    isGameOver = false;
    showScore = -1;
    removeObs();
    removeGround();
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

const logText = `Вёрстка +10
реализован интерфейс игры +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10
Реализовано завершение игры при достижении игровой цели +10
По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10
Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10
Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо`;

console.log(logText);
console.log("Total: 60");
