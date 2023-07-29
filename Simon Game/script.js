const levelTitle = $("#level-title");

let gamePattern = [];
let userClickedPatterns = [];

let level = 0;
let started = false;

// Event listener on keyboard for start
$(document).keypress(() => {
  if (!started) {
    generateNextSequence();
    started = true;
  }
});

// Add event listener to all keys
$(".key").click((event) => {
  const clickedKey = event.target.classList[1];
  animateKeys(clickedKey);

  userClickedPatterns.push(clickedKey);

  checkAnswer(userClickedPatterns.length - 1);
});

// Function to check if user inputs is correct
function checkAnswer(currLevel) {
  if (gamePattern[currLevel] === userClickedPatterns[currLevel]) {
    if (gamePattern.length === userClickedPatterns.length) {
      setTimeout(() => {
        generateNextSequence();
      }, 1000);
    }
  } else {
    handleWrongAnswerAnimations();
    levelTitle.text("Game Over! Press Any key to Restart");
    startOver();
  }
}

const buttonColors = ["green", "red", "yellow", "blue"];

// Function to generate next color
function generateNextSequence() {
  userClickedPatterns = [];
  level++;
  levelTitle.text(`level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = buttonColors[randomNumber];
  animateKeys(randomColor);

  gamePattern.push(randomColor);
}

// handle game to start again
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

// Animation for all keys
function animateKeys(className) {
  $(`.${className}`).addClass("pressed");

  playAudio(className);

  setTimeout(() => {
    $(`.${className}`).removeClass("pressed");
  }, 100);
}

// Handle wrong answers
function handleWrongAnswerAnimations() {
  $("body").addClass("game-over");

  playAudio("wrong");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

// Handle playing audio with different colors
function playAudio(color) {
  const audioSound = new Audio(`sounds/${color}.mp3`);
  audioSound.play();
}
