document.addEventListener("DOMContentLoaded", () => {
  const textArr = [
    "Press 'W' to jump!",
    " Dodge pipes!",
    " Successfully avoid 10 pipes to win the game!",
    "Made by V. Kalenskiy",
    "for RSSchool",
    "2023",
  ];

  const settings = document.querySelector(".settings");
  const console = document.querySelector(".console-container");

  function openOrClose() {
    if (settings.classList.contains("hide")) {
      console.style.display = "block";
      settings.classList.toggle("hide");
      settings.style.animation = "rotateAnimation 4s linear infinite";
    } else {
      console.style.display = "none";
      settings.classList.toggle("hide");
      settings.style.animation = "";
    }
  }

  settings.addEventListener("click", openOrClose);

  const devopsBnt = document.getElementById("slide1");
  const rulesBnt = document.getElementById("slide2");
  const leaderBnt = document.getElementById("slide3");
  const text = document.querySelector(".changedText");

  function changeDevops() {
    text.textContent = `
    ${textArr[3]}
    ${textArr[4]}
    ${textArr[5]}`;
  }

  function changeRules() {
    text.textContent = `
    ${textArr[0]}
    ${textArr[1]}
    ${textArr[2]}`;
  }
  devopsBnt.addEventListener("click", changeDevops);
  rulesBnt.addEventListener("click", changeRules);
});
