//GLOBAL VARIABLES
//==========================================================================================
//Arrays and Variables for holding data
var wordOptions = ["bender", "fry", "leela", "professor", "hermes", "zoidberg", "amy"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

//FUINCTIONS
//==========================================================================================
function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    //Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    //Populate Blanks and Successes with right number of blanks
    for (var i=0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    //Change html to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    //Testing / Debugging
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

// Create Image Object with jQuery and place in the html
function hangMan(){

    if (guessesLeft == 9){
        $('#hang').append('<img id="bender"src="images/guess9.png"/>')
    } else if (guessesLeft == 8){
        $('#hang').replaceWith('<p id="hang"><img id="bender" src="images/guess8.png"/></p>')
    }else if (guessesLeft == 7){
        $('#hang').replaceWith('<p id="hang"><img id="bender"src="images/guess7.png"/></p>')
    }else if (guessesLeft == 6){
        $('#hang').replaceWith('<p id="hang"><img id="bender"src="images/guess6.png"/></p>')
    }else if (guessesLeft == 5) {
        $('#hang').replaceWith('<p id="hang"><img id="bender"src="images/guess5.png"/></p>')
    }else if (guessesLeft == 4){
        $('#hang').replaceWith('<p id="hang"><img id="bender"src="images/guess4.png"/></p>')
    }else if (guessesLeft == 3){
        $('#hang').replaceWith('<p id="hang"><img id="bender"src="images/guess3.png"/></p>')
    } else if (guessesLeft == 2){
        $('#hang').replaceWith('<p id="hang"><img id="bender"src="images/guess2.png"/></p>')
    }else if (guessesLeft == 1){
        $('#hang').replaceWith('<p id="hang"><img id="bender"src="images/guess1.png"/></p>')
    }else if (guessesLeft == 0){
        $('#hang').replaceWith('<p id="hang"><img id="bender"src="images/guess0.png"/></p>') 
    }   
}



function checkLetters(letter){
    //Check if letter exists in code at all

    var isLetterInWord = false;

    for (var i=0; i<numBlanks; i++){
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
  
        }
    }

    //Check where in word letter exists, then popilate out blanksAndSuccesses array
    
    if(isLetterInWord){
        for (var i=0; i<numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }
    else{
        wrongLetters.push(letter);
        guessesLeft --;
        hangMan(guessesLeft);
    }
    //testing
    console.log(blanksAndSuccesses);
}



function roundComplete(){
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses left" + guessesLeft);

    //Update the HTML to reflect most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    //check if user won
    if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
        winCount++
        alert("You Won!");
        //update win counter in html
        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    }
    //check if user lost
    else if(guessesLeft == 0) {
        lossCount++;
        alert("You Lose!");
        //Update html
        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
        
    }
}

//MAIN PROCESS
//==========================================================================================
// Initiates the code the first time
startGame();
hangMan();

//Register Key clicks

document.onkeyup = function(event){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    
    //Testing/Debugging
    console.log(letterGuessed);
}