'use strict';

var words = [
  'geppetto',  'agamemnon',  'nebuchadnezzar'
  // ,  'supercalifragilisticexpialidocious'
];

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
      displayAt: []
    };
    
    wordSize = words[randomWord].length;
    lettersLeft = wordSize;
    console.log("wordSize == "+wordSize);
    console.log("lettersLeft == "+lettersLeft);
    console.log("words[randomWord] == "+words[randomWord]);


    function displayWord() {

      var oldTableRow = document.getElementById("tr")

      for(;oldTableRow.hasChildNodes() == true;) {
        oldTableRow.removeChild(oldTableRow.childNodes[0])
      }

      for(var i = 0; i < words[randomWord].length; i++) {
        
        var td = document.createElement("td");
        var h1 = document.createElement("h1");

        if(returnedObject.displayAt.includes(i)) {
          var t = document.createTextNode(words[randomWord].charAt(i));
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
          console.log("displayAt: "+returnedObject.displayAt[returnedObject.displayAt.length - 1]);
          console.log("words[wordUsed].charAt(i) == "+words[wordUsed].charAt(i));
          console.log("i == "+i);
          returnedObject.charIsCorrect = true;
    
          multiple++;
          lettersLeft--;   
          console.log("lettersLeft after decrement: "+lettersLeft);
        }

      }

      if(multiple == 0) {
        tries--;
      }

      multiple = 0;

      console.log("tries: "+tries);
      
      displayWord();

      return returnedObject;
    }


    document.onkeyup = function(event) {
  
      userInput = String.fromCharCode(event.keyCode).toLowerCase();
      console.log("userInput: "+userInput);

      if((/^[a-z]+$/).test(userInput) == true) {
        result = correctChar(randomWord);
      }

      var statsStr =   ""
                      +   "<h2>Player Stats</h2><br>"
                      +   "<h3>last letter : " + userInput + "</h3>"
                      +   "<h3>tries left : " + tries + "</h3>"
                      +   "<h3>wins : " + tries + "</h3>"
                      ;

      var stats = document.getElementById("stats");
      stats.innerHTML = statsStr;
    }

  // } while ((tries > 0) || ((wordSize - lettersLeft) > 0));

}

game();