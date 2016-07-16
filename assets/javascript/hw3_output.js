
var outputStr = "<p>" + input + "</p>";

var output = document.getElementById("output");

output.innerHTML(outputStr);

var $ = function( id ) { return document.getElementById( id ); };

// use with elements: $('someID')