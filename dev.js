document.addEventListener("DOMContentLoaded", () => {
  const settings = document.querySelector(".settings");
  const console = document.querySelector(".console-container");

  function openOrClose() {
    if (settings.classList.contains("hide")) {
      console.style.display = "block";
      settings.classList.toggle("hide");
    } else {
      console.style.display = "none";
      settings.classList.toggle("hide");
    }
  }

  settings.addEventListener("click", openOrClose);

  const devopsBnt = document.getElementById("slide1");
  const rulesBnt = document.getElementById("slide2");
  const leaderBnt = document.getElementById("slide3");
  const text = document.querySelector(".changedText");

  function changeDevops() {
    text.textContent = "1231";
  }

  function changeRules() {
    text.textContent = "Press 'W' to jump!";
  }

  devopsBnt.addEventListener("click", changeDevops);
  rulesBnt.addEventListener("click", changeRules);
});
