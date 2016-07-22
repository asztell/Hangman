'use strict';

var words = [
    'geppetto',  'agamemnon',  'nebuchadnezzar'
  ,  'supercalifragilisticexpialidocious'
];
var wins = 0;
var usedWords = [];

// random number generator function with min and max values
function rand(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}

// fantastically awesome last-element-of-Array function!
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

// main game function
function game() {

    var randomWord = rand(0,4);
    var tries = 7;
    var wordSize = 1;
    var lettersLeft = 0;
    var userInput = '';
    var result;
    var multiple = 0;
    var returnedObject = {
        charIsCorrect: false,
        displayAt: [],
        usedChars: []
    };
    
    wordSize = words[randomWord].length;
    lettersLeft = wordSize;

    var myBtn = document.getElementById("myBtn");
    myBtn.className = 'btn btn-primary btn-lg btn-block';
    myBtn.innerHTML = 'New Word';


    // word and character display function
    function displayWord() {

        var oldTableRow = document.getElementById("tr")

        for(;oldTableRow.hasChildNodes() === true;) {
            oldTableRow.removeChild(oldTableRow.childNodes[0])
        }

        for(var i = 0; i < words[randomWord].length; i++) {
        
            var td = document.createElement("td");
            var h1 = document.createElement("h1");

            if(returnedObject.displayAt.includes(i)) {
                var t = document.createTextNode(words[randomWord].charAt(i));

                if(!returnedObject.usedChars.includes(userInput.charAt(0))) {
                    returnedObject.usedChars.push(userInput.charAt(0));
                }

            } else {
                var t = document.createTextNode("_");
            }
      
            h1.appendChild(t);
            td.appendChild(h1);
      
            document.getElementById("tr").appendChild(td);
        }

        if(returnedObject.usedChars.length > 0) {

            t = document.createTextNode(returnedObject.usedChars.last()+' ');
            var usedChars = document.getElementById('used_chars');
            usedChars.appendChild(t);
        }

        if(lettersLeft == 0) {
            wins++;

            var myBtn = document.getElementById("myBtn");
            myBtn.innerHTML = 'New Word';
            myBtn.className = 'btn btn-success btn-lg btn-block';

            // game();

            // usedChars.innerHTML = '';
        }


    }

    displayWord();

    
    // character checker function
    function correctChar(wordUsed) {
      
        // console.log(wordUsed);
        for(var i = 0; i < words[wordUsed].length; i++) {
        
            if(userInput.charAt(0) === words[wordUsed].charAt(i)) {

                returnedObject.displayAt.push(i);
                returnedObject.charIsCorrect = true;

                multiple++;
                lettersLeft--;

                if(!returnedObject.usedChars.includes(userInput.charAt(0))
                    && typeof i !== 'number') {
                    returnedObject.usedChars.push(i);
                }
            }

        }

        if(multiple === 0) {
            tries--;
        }

        multiple = 0;
        displayWord();

        return returnedObject;
    }

    // event handler function
    document.onkeyup = function(event) {
  
        userInput = String.fromCharCode(event.keyCode).toLowerCase();
        // console.log("userInput: "+userInput);

        if((/^[a-z]+$/).test(userInput) === true) {
            result = correctChar(randomWord);
        }

        var statsStr = ""
                     + "<h3>" + tries + "</h3>"
                     + "<h3>" + wins + "</h3>"
                     ;
        var stats = document.getElementById("stats");
        stats.innerHTML = statsStr;

    }

}
