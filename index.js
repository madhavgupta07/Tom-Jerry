const jerry = document.querySelector(".jerry");
const gameOver = document.querySelector(".gameOver");
const tom = document.querySelector(".tom");
const jerryCaught = document.querySelector(".jerryCaught");
const scoreCount = document.querySelector(".scoreCount");
const audio = document.getElementById("myAudio");

let score = 0;
let cross = true;

let gameOverAudio = new Audio("GameOver.mp3");
let gameAudio = new Audio("DuringGame.mp3");
let jumpAudio = new Audio("Jump.mp3");
document.onkeydown = function (e) {
  // console.log("Key code is: ", e.keyCode)
  if (e.keyCode == 32) {
    jumpAudio.play();
    jerry.classList.add("animateJerry");
    setTimeout(() => {
      jerry.classList.remove("animateJerry");
    }, 700);
  }
};

let duringGameAudio = () => {
  gameAudio.play();
};

let myInterval = setInterval(duringGameAudio, 100);

function buttonClick(e) {
  jumpAudio.play();
  jerry.classList.add("animateJerry");
  setTimeout(() => {
    jerry.classList.remove("animateJerry");
  }, 700);
}
setInterval(() => {
  let jerryX = parseInt(
    window.getComputedStyle(jerry, null).getPropertyValue("left")
  );
  let jerryY = parseInt(
    window.getComputedStyle(jerry, null).getPropertyValue("top")
  );
  let tomX = parseInt(
    window.getComputedStyle(tom, null).getPropertyValue("left")
  );
  let tomY = parseInt(
    window.getComputedStyle(tom, null).getPropertyValue("top")
  );
  let offsetX = Math.abs(jerryX - tomX);
  let offsetY = Math.abs(jerryY - tomY);
  // console.log(offsetX);
  if (offsetX < 93 && offsetY < 52) {
    gameOver.style.visibility = "visible";
    tom.classList.remove("animateTom");
    jerry.classList.remove("jerry");
    tom.classList.remove("tom");
    gameOverAudio.play();
    jumpAudio.pause();
    gameAudio.pause();
    clearInterval(myInterval);
    jerryCaught.classList.add("gameOverCharacter");
  } else if (offsetX < 155 && cross) {
    score += 1;
    // console.log(score);
    scoreCount.innerHTML = `Score: ${score}`;
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 900);
  }
}, 100);
duringGameAudio();
