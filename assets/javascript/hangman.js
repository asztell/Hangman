'use strict';

var words = [
    'geppetto',  'agamemnon',  'nebuchadnezzar'
  // ,  'supercalifragilisticexpialidocious'
];
var wins = 0;

function rand(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}

function game() {
  
  // do {

    var randomWord = rand(0,3);
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
    console.log("wordSize == "+wordSize);
    console.log("lettersLeft == "+lettersLeft);
    console.log("words[randomWord] == "+words[randomWord]);


    function displayWord() {

        var oldTableRow = document.getElementById("tr")

        for( ;oldTableRow.hasChildNodes() == true ; ) {
            oldTableRow.removeChild(oldTableRow.childNodes[0])
        }

        for(var i = 0; i < words[randomWord].length; i++) {
        
            var td = document.createElement("td");
            var h1 = document.createElement("h1");

            if(returnedObject.displayAt.includes(i)) {
                var t = document.createTextNode(words[randomWord].charAt(i));

                if(!returnedObject.usedChars.includes(words[randomWord].charAt(i))) {
                    returnedObject.usedChars.push(words[randomWord].charAt(i));
                }
                console.log("last char = "+returnedObject.usedChars[returnedObject.usedChars.length-1]);
            } else {
                var t = document.createTextNode("_");
            }
      
            h1.appendChild(t);
            td.appendChild(h1);
      
            document.getElementById("tr").appendChild(td);
        }

    }
    

    function correctChar(wordUsed) {
      
        // console.log(wordUsed);
        for(var i = 0; i < words[wordUsed].length; i++) {
        
            if(userInput.charAt(0) == words[wordUsed].charAt(i)) {

                returnedObject.displayAt.push(i);
                returnedObject.charIsCorrect = true;

                multiple++;
                lettersLeft--;
            }

        }

        if(multiple == 0) {
            tries--;
        }

        multiple = 0;
        displayWord();

        return returnedObject;
    }


    document.onkeyup = function(event) {
  
        userInput = String.fromCharCode(event.keyCode).toLowerCase();
        console.log("userInput: "+userInput);

        if((/^[a-z]+$/).test(userInput) == true) {
            result = correctChar(randomWord);
        }

        var statsStr = ""
                     + "<h3>" + userInput + "</h3>"
                     + "<h3>" + tries + "</h3>"
                     + "<h3>" + wins + "</h3>"
                     ;
        var stats = document.getElementById("stats");
        stats.innerHTML = statsStr;

    }

  // } while ((tries > 0) || ((wordSize - lettersLeft) > 0));

}

game();