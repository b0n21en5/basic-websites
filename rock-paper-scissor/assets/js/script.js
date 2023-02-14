

let playerPoint = document.getElementById('playerPoint');
let cpuPoint = document.getElementById('cpuPoint');
let playerChoice = document.getElementById('player');
let cpuChoice = document.getElementById('cpu');
let roundLeft = document.getElementById('round-left');
let winner = document.getElementById('winner');
let startAgain = document.getElementById('start-again');

let cpuScore = playerScore = 0;

let rounds = 10;

function startOver(){
    rounds = 10
    cpuScore = playerScore = 0
    playerPoint.textContent = 0
    cpuPoint.textContent = 0
    playerChoice.textContent = "none"
    cpuChoice.textContent = "none"
    roundLeft.textContent = rounds
    winner.textContent = 'not yet'
}

function game(player){

    let gameChars = ['rock', 'paper','scissor' ];
    let cpu = gameChars[Math.floor(Math.random()*gameChars.length)];

    if (rounds>0){
        if (cpu===player){
        

            playerChoice.innerHTML = '  '+ player.toUpperCase();
            cpuChoice.innerHTML = ' '+ cpu.toUpperCase();
    
        }else if (cpu==='rock' && player==='paper') {
            playerScore++
    
            playerPoint.textContent = playerScore
            playerChoice.innerHTML = ' '+ player.toUpperCase();
            cpuChoice.innerHTML = ' '+ cpu.toUpperCase();
    
        }else if (cpu==='paper' && player==='rock'){
            cpuScore++
    
            cpuPoint.textContent = cpuScore
            playerChoice.innerHTML = ' '+ player.toUpperCase();
            cpuChoice.innerHTML = ' '+ cpu.toUpperCase();
    
        }else if (cpu==='rock' && player==='scissor'){
            cpuScore++
    
            cpuPoint.textContent = cpuScore
            playerChoice.innerHTML = ' '+ player.toUpperCase();
            cpuChoice.innerHTML = ' '+ cpu.toUpperCase();
    
        }else if (cpu==='scissor' && player==='rock'){
            playerScore++
    
            playerPoint.textContent = playerScore
            playerChoice.innerHTML = '   '+ player.toUpperCase();
            cpuChoice.innerHTML = ' '+ cpu.toUpperCase();
    
        }else if (cpu==='paper' && player==='scissor'){
            playerScore++
    
            playerPoint.textContent = playerScore
            playerChoice.innerHTML = ' '+ player.toUpperCase();
            cpuChoice.innerHTML = ' '+ cpu.toUpperCase();
    
        }else{
            cpuScore++
    
            cpuPoint.textContent = cpuScore
            playerChoice.innerHTML = ' '+ player.toUpperCase();
            cpuChoice.innerHTML = ' '+ cpu.toUpperCase();
        }
        rounds--;
    
        roundLeft.textContent = rounds;
    }
    

    

    winner.textContent = cpuScore>playerScore?"Computer":cpuScore<playerScore?"Player":"Tie!"
}

