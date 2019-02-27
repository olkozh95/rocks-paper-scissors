let userScore = 0;
let compScore = 0;

const userScoreSpan = document.querySelector(".user-score");
const compScoreSpan = document.querySelector(".computer-score");
const scoreBoard = document.querySelector(".score-board");
const resultBox = document.querySelector(".result-content");
const rockBox = document.querySelector(".choice-rock");
const paperBox = document.querySelector(".choice-paper");
const scissorsBox = document.querySelector(".choice-scissors");


function game(choice) {
    let userCount = userScore;
    let compCount = compScore;

    if(choice === "rock" && getComputerChoice() === "paper") {
        resultBox.innerHTML = "Rock is covered by paper. You lost";
        compScore += 1;
        compScoreSpan.innerHTML = `${compScore}`;
    } else if(choice === "rock" && getComputerChoice() === "scissors") {
        resultBox.innerHTML = "Rock blunted scissors. You won!";
        userScore += 1;
        userScoreSpan.innerHTML = `${userScore}`;
    } else if(choice === "paper" && getComputerChoice() === "rock") {
        resultBox.innerHTML = "Paper covers rock. You won!";
        userScore += 1;
        userScoreSpan.innerHTML = `${userScore}`;
    } else if(choice === "scissors" && getComputerChoice() === "rock") {
        resultBox.innerHTML = "Scissors is blunted against rock. You lost";
        compScore += 1;
        compScoreSpan.innerHTML = `${compScore}`;
    } else if(choice === "paper" && getComputerChoice() === "scissors") {
        resultBox.innerHTML = "Paper is cut up by scissors. You lost";
        compScore += 1;
        compScoreSpan.innerHTML = `${compScore}`;
    } else if(choice === "scissors" && getComputerChoice() === "paper") {
        resultBox.innerHTML = "Scissors cuts paper. You won!";
        userScore += 1;
        userScoreSpan.innerHTML = `${userScore}`;
    } else {
        resultBox.innerHTML = "Draw!";
    }

    checkCount(userCount, compCount);
    defineWinner();
}

function checkCount(user, comp) {
    if(user < userScore) {
        scoreBoard.style.borderColor = "green";
        scoreBoard.style.backgroundColor = "rgba(0, 255, 0, 0.1)";

        setTimeout(() => {
            scoreBoard.style.borderColor = "";
            scoreBoard.style.backgroundColor = "";
        }, 400);
    } else if(comp < compScore) {
        scoreBoard.style.borderColor = "red";
        scoreBoard.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
        
        setTimeout(() => {
            scoreBoard.style.borderColor = "";
            scoreBoard.style.backgroundColor = "";
        }, 400);
    } else {
        scoreBoard.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        
        setTimeout(() => scoreBoard.style.backgroundColor = "", 400);
    }
}

function getComputerChoice() {
    let ran = Math.floor(Math.random() * 3);
    let choices = ["rock", "paper", "scissors"];

    return choices[ran];
}

function getChoice() {
    rockBox.onclick = function() {
        game("rock");
    }

    paperBox.onclick = function() {
        game("paper");
    }

    scissorsBox.onclick = function() {
        game("scissors");
    }
}

function defineWinner() {
    if(userScore === 10 ) {
        endGame("user");
    } else if(compScore === 10) {
        endGame("comp");
    }
}

function endGame(player) {
    const endText = document.querySelector(".end-statement");
    const okButton = document.querySelector(".ok-btn");
    const cancelButton = document.querySelector(".cancel-btn");
    const endWindow = document.querySelector(".end-game")

    if(player === "user") {
        endWindow.style.display = "block";
        endText.style.color = "green";
        endText.innerHTML = `you won [${userScore} : ${compScore}]`;
    } else if(player === "comp") {
        endWindow.style.display = "block";
        endText.style.color = "red";
        endText.innerHTML = `you lost [${userScore} : ${compScore}]`;
    }
    
    okButton.addEventListener("click", function() {
        userScoreSpan.innerHTML = "0";
        userScore = 0;
        compScoreSpan.innerHTML = "0";
        compScore = 0;
        endWindow.style.display = "none";
    })

    cancelButton.addEventListener("click", function() {
        endWindow.style.display = "none";
        const body = document.querySelector("body");
        body.innerHTML = "Please, reload the page =)";
        body.classList.add("cancel");
    })
}

getChoice();


