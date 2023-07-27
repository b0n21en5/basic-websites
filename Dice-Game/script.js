const cpuImgEle = document.getElementById("cpu-img");
const playerImgEle = document.getElementById("player-img");

const result = document.getElementById("result");

let cpu, player;
// Function to generate random dice side and update dom
function rollTheDice() {
  cpu = Math.floor(Math.random() * 6) + 1;
  player = Math.floor(Math.random() * 6) + 1;

  if (cpu > player) result.textContent = "You Losses!";
  else if (cpu < player) result.textContent = "You Won!";
  else result.textContent = "Draw!";

  cpuImgEle.src = `assets/${cpu}.webp`;
  playerImgEle.src = `assets/${player}.webp`;
}

// Added event listener on roll dice button
const rollDiceBtn = document.getElementById("roll-dice-btn");
rollDiceBtn.addEventListener("click", () => {
  rollTheDice();
});
