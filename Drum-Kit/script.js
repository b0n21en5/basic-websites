const drum1 = document.getElementById("drum-1");
drum1.addEventListener("click", () => {
  let audio = new Audio("assets/sounds/d1.wav");
  audio.play();
});

const drum2 = document.getElementById("drum-2");
drum2.addEventListener("click", () => {
  let audio = new Audio("assets/sounds/d2.wav");
  audio.play();
});

const drum3 = document.getElementById("drum-3");
drum3.addEventListener("click", () => {
  let audio = new Audio("assets/sounds/d3.wav");
  audio.play();
});

const drum4 = document.getElementById("drum-4");
drum4.addEventListener("click", () => {
  let audio = new Audio("assets/sounds/d4.wav");
  audio.play();
});

const drum5 = document.getElementById("drum-5");
drum5.addEventListener("click", () => {
  let audio = new Audio("assets/sounds/d5.mp3");
  audio.play();
});

document.addEventListener("keydown", () => {
  let audio = new Audio("assets/sounds/d1.wav");
  audio.play();
});
