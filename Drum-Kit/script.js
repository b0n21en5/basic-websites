const allDrums = document.querySelectorAll(".drums");

// Added event listener on all drums
allDrums.forEach((drum) => {
  drum.addEventListener("click", () => {
    const drumInnerHtml = drum.innerHTML;

    playDrumAudio(drumInnerHtml);
    applyAnimationDrum(drumInnerHtml);
  });
});

// Added event listener for keyboard
document.addEventListener("keypress", (event) => {
  playDrumAudio(event.key);
  applyAnimationDrum(event.key);
});

// Function to handle playing audio
function playDrumAudio(key) {
  switch (key) {
    case "a":
      let drum1 = new Audio("assets/sounds/d1.wav");
      drum1.play();
      break;
    case "w":
      let drum2 = new Audio("assets/sounds/d2.wav");
      drum2.play();
      break;
    case "s":
      let drum3 = new Audio("assets/sounds/d3.wav");
      drum3.play();
      break;
    case "d":
      let drum4 = new Audio("assets/sounds/d4.wav");
      drum4.play();
      break;
    case "f":
      let drum5 = new Audio("assets/sounds/d5.mp3");
      drum5.play();
      break;
  }
}

// Apply animation to clicked drum
function applyAnimationDrum(currKey) {
  const activeButton = document.querySelector("#" + currKey);
  console.log(activeButton);
  activeButton.classList.add("pressed");

  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 800);
}
