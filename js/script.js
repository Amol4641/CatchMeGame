const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const highScoreBoard=document.querySelector('.highScore');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;


let highScore=localStorage.getItem('game1HighScore') || 0;
highScoreBoard.textContent='HIGH SCORE: ' + highScore;
function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popOut(){
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time);
}


function startGame(){
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            checkHighScore()
            countdownBoard.textContent = 'Times UP!! Try Again!';
        }
    }, 1000);
}
startButton.addEventListener('click', startGame);

function catchMe(e){
    score++;
    this.style.backgroundImage = 'url("https://images.unsplash.com/photo-1585129918930-d1f1179a81e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMTk3MTAwMg&ixlib=rb-1.2.1&q=80&w=400")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("https://images.unsplash.com/photo-1617144519956-bba853571334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMTk4NDU0NA&ixlib=rb-1.2.1&q=80&w=400")';
        this.style.pointerEvents = 'all';

    }, 1200);
    scoreBoard.textContent ="Score " + score;

}
// let x = document.getElementById("set");
// x.addEventListener('click',resetScore);

function resetScore(){
    localStorage.removeItem('game1HighScore');
}
moles.forEach(mole => mole.addEventListener('click', catchMe));

function checkHighScore(){
    if(score> localStorage.getItem('game1HighScore')){
        localStorage.setItem('game1HighScore' , score);
        highScore=score;
        highScoreBoard.textContent='HIGH SCORE:' +  highScore;
    }
}