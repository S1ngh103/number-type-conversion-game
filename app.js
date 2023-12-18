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
// const menuBitBtn = document.querySelector("#main-menu-bit-btn");
let maxBits = 3;

// Extracting number from highscore text
var highscoreText = playerHighScoreText.textContent.replace(/[^0-9.]/g, '');
var highscore = parseFloat(highscoreText);

// Initializing variables
let playerScoreCount = 0;
let currNumToConvert;
let userInput;

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

    // Swap Screens
    let elementBinaryBitSelector = document.getElementById('binaryBitSelector');
    elementBinaryBitSelector.style.display = 'none';
    let elementBinaryGame = document.getElementById('binaryScreen');
    elementBinaryGame.style.display = 'block';
})

menuGameBtn.addEventListener("click", () => {
    let elementBinaryGame = document.getElementById('binaryScreen');
    elementBinaryGame.style.display = 'none';

    let elementStartScreen = document.getElementById('startScreen');
    elementStartScreen.style.display = 'block';
})

menuBitBtn.addEventListener("click", () => {
    let elementBinaryBitSelector = document.getElementById('binaryBitSelector');
    elementBinaryBitSelector.style.display = 'none';

    let elementStartScreen = document.getElementById('startScreen');
    elementStartScreen.style.display = 'block';
})

numberToConvert.textContent = `Number: ${currNumToConvert}`;
// Listening for reroll from user
function nextNumber(){
    // Clear input box and success/failure note
    resultText.textContent = "";
    document.getElementById("userInput").value = "";

    // Set new number to convert
    updateCurrNum();
    numberToConvert.textContent = `Number: ${currNumToConvert}`;
}

// Listening for user to submit their entry
var form = document.getElementById("userInputForm");
form.addEventListener("submit", function(event){
    event.preventDefault();
    userInput = document.getElementById("userInput").value;
    checkCorrectness();
})

// Updating current number to convert w/ function
function updateCurrNum(){
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
        console.log(`${playerScoreCount} and ${highscore}`)
        if(playerScoreCount > highscore){
            highscore = playerScoreCount;
            console.log('new highscore is ', highscore);
        }
        playerScoreText.textContent = `Current Score: 0`;
        playerHighScoreText.textContent = `Highscore: ${highscore}`;
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


// TO DO:
// Points for consecutive correct answers
//      - Reset to 0 when incorrect
//      - Scoreboard (maybe live)
// Success and Incorrect Pages (to implement smoother gameplay and automatic reroll)