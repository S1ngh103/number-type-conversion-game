const numberToConvert = document.querySelector("#numberToConvert");
const resultText = document.querySelector("#resultText");
const instructionText = document.querySelector("#instructionText")
const playerScoreText = document.querySelector("#currScore");
const playerHighScoreText = document.querySelector("#highScore");
const binaryBtn = document.querySelector("#binary-btn");
const twoBitBtn = document.querySelector("#twoBit-btn");
const threeBitBtn = document.querySelector("#threeBit-btn");
const fourBitBtn = document.querySelector("#fourBit-btn");
const menuGameBtn = document.querySelector("#main-menu-game-btn");
const menuBitBtn = document.querySelector("#main-menu-bit-btn");
const startScreenHighscore = document.querySelector("#highscore-start-screen");

// Initializing variables
let maxBits = 3;
let playerScoreCount = 0;
let currNumToConvert;
let userInput;
let highscore;

binaryBtn.addEventListener("click", () => {
    let elementStartScreen = document.getElementById('startScreen');
    elementStartScreen.style.display = 'none';
    let elementBinaryGame = document.getElementById('binaryBitSelector');
    elementBinaryGame.style.display = 'block';
})

twoBitBtn.addEventListener("click", () => {
    // Setting max bits for calculation and max number in 2 bits (3)
    maxBits = 2;
    currNumToConvert = Math.floor(Math.random()* 3)+1;

    // Update number and text
    numberToConvert.textContent = `Number: ${currNumToConvert}`;
    instructionText.textContent = `Convert the number to 2-bit binary:`;

    // Update current score
    if(localStorage.getItem('currScore') != null){
        playerScoreText.textContent = `Current Score: ${localStorage.getItem('currScore')}`;
    }else{
        playerScoreText.textContent = 'Current Score: 0';
    }

    // Update highscore
    playerHighScoreText.textContent = `Highscore: ${localStorage.getItem('highscore')}`;

    // Swap screens
    let elementBinaryBitSelector = document.getElementById('binaryBitSelector');
    elementBinaryBitSelector.style.display = 'none';
    let elementBinaryGame = document.getElementById('binaryScreen');
    elementBinaryGame.style.display = 'block';
})

threeBitBtn.addEventListener("click", () => {
    // Setting max bits for calculation and max number in 3 bits (7)
    maxBits = 3;
    currNumToConvert = Math.floor(Math.random()* 7)+1;

    // Update number and text
    numberToConvert.textContent = `Number: ${currNumToConvert}`;
    instructionText.textContent = `Convert the number to 3-bit binary:`;

    // Update current score
    if(localStorage.getItem('currScore') != null){
        playerScoreText.textContent = `Current Score: ${localStorage.getItem('currScore')}`;
    }else{
        playerScoreText.textContent = 'Current Score: 0';
    }

    // Update high score
    playerHighScoreText.textContent = `Highscore: ${localStorage.getItem('highscore')}`;

    // Swap Screens
    let elementBinaryBitSelector = document.getElementById('binaryBitSelector');
    elementBinaryBitSelector.style.display = 'none';
    let elementBinaryGame = document.getElementById('binaryScreen');
    elementBinaryGame.style.display = 'block';
})

fourBitBtn.addEventListener("click", () => {
    // Setting max bits for calculation and max number in 4 bits (15)
    maxBits = 4;
    currNumToConvert = Math.floor(Math.random()* 15)+1;

    // Update number and text
    numberToConvert.textContent = `Number: ${currNumToConvert}`;
    instructionText.textContent = `Convert the number to 4-bit binary:`;

    // Update current score
    if(localStorage.getItem('currScore') != null){
        playerScoreText.textContent = `Current Score: ${localStorage.getItem('currScore')}`;
    }else{
        playerScoreText.textContent = 'Current Score: 0';
    }

    // Update highscore
    playerHighScoreText.textContent = `Highscore: ${localStorage.getItem('highscore')}`;

    // Swap Screens
    let elementBinaryBitSelector = document.getElementById('binaryBitSelector');
    elementBinaryBitSelector.style.display = 'none';
    let elementBinaryGame = document.getElementById('binaryScreen');
    elementBinaryGame.style.display = 'block';
})

menuGameBtn.addEventListener("click", () => {
    if(playerScoreCount > highscore){
        highscore = playerScoreCount;
        localStorage.setItem('highscore', highscore);
    }

    // Store the current score count if they go to main menu
    localStorage.setItem('currScore', playerScoreCount);

    // Turn off game screen
    let elementBinaryGame = document.getElementById('binaryScreen');
    elementBinaryGame.style.display = 'none';

    // Turn on start screen and update high score
    let newHighscore = localStorage.getItem('highscore');
    let elementStartScreen = document.getElementById('startScreen');
    startScreenHighscore.textContent = `Your highscore: ${newHighscore}`;
    elementStartScreen.style.display = 'block';
})

menuBitBtn.addEventListener("click", () => {
    // Turn off binary bit selection screen
    let elementBinaryBitSelector = document.getElementById('binaryBitSelector');
    elementBinaryBitSelector.style.display = 'none';

    // turn on game screen
    let elementStartScreen = document.getElementById('startScreen');
    elementStartScreen.style.display = 'block';
})

// Listening for reroll from user
function nextNumber(){
    // Clear input box and success/failure note
    // resultText.textContent = "";
    document.getElementById("userInput").value = "";

    // Set new number to convert
    updateCurrNum();
    numberToConvert.textContent = `Number: ${currNumToConvert}`;
}

// Updating current number to convert w/ function
function updateCurrNum(){
    // Based on the bits selected by user, generate new number
    switch(maxBits){
        case 2:
            currNumToConvert = Math.floor(Math.random()* 3)+1;
            break;
        case 3:
            currNumToConvert = Math.floor(Math.random()* 7)+1;
            break;
        case 4:
            currNumToConvert = Math.floor(Math.random()* 15)+1;
            break;
    }
}

// Check if users input was correct
// Likely will increment user points here
function checkCorrectness(){
    let expectedResult = convertIntToBinary(currNumToConvert);
    if(expectedResult == userInput){
        resultText.textContent = `GREAT JOB!`;
        playerScoreText.textContent = `Current Score: ${playerScoreCount+=100}`;
        nextNumber();
    }else{
        resultText.textContent = `INCORRECT!`;
        if(playerScoreCount > highscore){
            highscore = playerScoreCount;
            localStorage.setItem('highscore', highscore);
        }
        playerScoreText.textContent = `Current Score: 0`;
        playerHighScoreText.textContent = `Highscore: ${localStorage.getItem('highscore')}`;
        playerScoreCount = 0;
    }
}

// Custom coding math w/ little to no help
function convertIntToBinary(integer){
    // Need array to keep track of position and the binary number
    const binaryNum = [];

    let bitCount = maxBits-1;
    while(binaryNum.length != maxBits){
        if(integer >= 2**bitCount){
            // How I debugged this process
            // console.log(`${integer} - ${2**bitCount}`);
            integer -= 2**bitCount;
            binaryNum.push(1);
        }else{
            binaryNum.push(0);
        }
        bitCount--;
    }
    
    return binaryNum.join("")
}

function initialize(){
    if(localStorage.getItem('highscore') != null){
        highscore = localStorage.getItem('highscore');
    }else{
        highscore = 0;
        localStorage.setItem('highscore', highscore);
    }
}

initialize();
// Initial start screen high score
startScreenHighscore.textContent = `Your highscore: ${localStorage.getItem('highscore')}`;

// Listening for user to submit their entry
var form = document.getElementById("userInputForm");
form.addEventListener("submit", function(event){
    event.preventDefault();
    userInput = document.getElementById("userInput").value;
    checkCorrectness();
})

// TO DO:
// Point system (Done)
//      - Implement into local storage (In progress)
// Add logic to not have duplicate numbers between runs of a submission in updateCurrentNum (In progress)
// Success and Incorrect Pages (to implement smoother gameplay and automatic reroll) (Mostly done)

// Reset scores between bit types (need to do)
// Local storage (mostly done)
// Hall of fame for scores (need to do)