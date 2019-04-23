const gamePageElems = {
  userScoreSpan: document.querySelector(".user-score"),
  compScoreSpan: document.querySelector(".computer-score"),
  scoreBoard: document.querySelector(".score-board"),
  resultBox: document.querySelector(".result-content"),
  rockBox: document.querySelector(".choice-rock"),
  paperBox: document.querySelector(".choice-paper"),
  scissorsBox: document.querySelector(".choice-scissors"),
  endText: document.querySelector(".end-statement"),
  okButton: document.querySelector(".ok-btn"),
  cancelButton: document.querySelector(".cancel-btn"),
  endWindow: document.querySelector(".end-game"),
  body: document.querySelector("body")
}

const gameController = {
    userScore: 0,
    compScore: 0
}
    
gameController.game = function(choice, {resultBox, compScoreSpan, userScoreSpan}    = gamePageElems) {

     let userCount = this.userScore;
    let compCount = this.compScore;

    if(choice === "rock" && this.getComputerChoice() === "paper") {
        resultBox.innerHTML = "Rock is covered by paper. You lost";
        this.compScore += 1;
        compScoreSpan.innerHTML = `${this.compScore}`;
    } else if(choice === "rock" && this.getComputerChoice() === "scissors") {
        resultBox.innerHTML = "Rock blunted scissors. You won!";
        this.userScore += 1;
        userScoreSpan.innerHTML = `${this.userScore}`;
    } else if(choice === "paper" && this.getComputerChoice() === "rock") {
        resultBox.innerHTML = "Paper covers rock. You won!";
        this.userScore += 1;
        userScoreSpan.innerHTML = `${this.userScore}`;
    } else if(choice === "scissors" && this.getComputerChoice() === "rock") {
        resultBox.innerHTML = "Scissors is blunted against rock. You lost";
        this.compScore += 1;
        compScoreSpan.innerHTML = `${this.compScore}`;
    } else if(choice === "paper" && this.getComputerChoice() === "scissors") {
        resultBox.innerHTML = "Paper is cut up by scissors. You lost";
        this.compScore += 1;
        compScoreSpan.innerHTML = `${this.compScore}`;
    } else if(choice === "scissors" && this.getComputerChoice() === "paper") {
        resultBox.innerHTML = "Scissors cuts paper. You won!";
        this.userScore += 1;
        userScoreSpan.innerHTML = `${this.userScore}`;
    } else {
        resultBox.innerHTML = "Draw!";
    }

    this.checkCount(userCount, compCount);
    this.defineWinner();
}

gameController.checkCount = function(user, comp) {
    const {scoreBoard} = gamePageElems;

    if(user < this.userScore) {
        scoreBoard.style.borderColor = "green";
        scoreBoard.style.backgroundColor = "rgba(0, 255, 0, 0.1)";

        setTimeout(() => {
            scoreBoard.style.borderColor = "";
            scoreBoard.style.backgroundColor = "";
        }, 400);
    } else if(comp < this.compScore) {
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

gameController.getComputerChoice = function() {
    let ran = Math.floor(Math.random() * 3);
    let choices = ["rock", "paper", "scissors"];

    return choices[ran];
}

gameController.getChoice = function() {
    const {rockBox, paperBox, scissorsBox} = gamePageElems;
    
    let self = this;

    rockBox.onclick = function() {
        self.game("rock");
    }

    paperBox.onclick = function() {
        self.game("paper");
    }

    scissorsBox.onclick = function() {
        self.game("scissors");
    }
}

gameController.defineWinner = function() {
    if(this.userScore === 10 ) {
        this.endGame("user");
    } else if(this.compScore === 10) {
        this.endGame("comp");
    }
}

gameController.endGame = function(player) {

    const {endText, okButton, cancelButton, endWindow, userScoreSpan, compScoreSpan, body} = gamePageElems;

    if(player === "user") {
        endWindow.style.display = "block";
        endText.style.color = "green";
        endText.innerHTML = `you won [${this.userScore} : ${this.compScore}]`;
    } else if(player === "comp") {
        endWindow.style.display = "block";
        endText.style.color = "red";
        endText.innerHTML = `you lost [${this.userScore} : ${this.compScore}]`;
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
        body.innerHTML = "Please, reload the page =)";
        body.classList.add("cancel");
    })
}

gameController.getChoice();


