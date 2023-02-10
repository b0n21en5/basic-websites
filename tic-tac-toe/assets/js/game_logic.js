let playerText = document.getElementById('playerTxt');
let restartbtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));


let winnerInd = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const x_text = 'X';
const o_text = 'O';
let currentPlayer = x_text;
let spaces = Array(9).fill(null);


const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {

    const id = e.target.id;
    
    if (!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        
        if (playerhasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has Won!`
            restartbtn.innerHTML = "play again?"
            let winning_blocks = playerhasWon();
            
            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerInd)
            
            return
        }
        
        currentPlayer = currentPlayer == x_text ? o_text : x_text
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]


function playerhasWon(){
    
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        
        if (spaces[a] && spaces[a] == spaces[b] && spaces[b] == spaces[c]){
            return [ a, b, c ]
        }
    }
    return false;
}

restartbtn.addEventListener('click', restart)

function restart() {
    
    spaces.fill(null)
    
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    
    playerText.innerHTML = 'Tic Tac Toe'
    restartbtn.innerHTML = 'Restart'
    
    currentPlayer = x_text
}

startGame();