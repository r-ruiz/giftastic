// start with a theme of gifs

var leadingMen = ["Micheal Scott", "Patrict Stewart", "John Dorian",];

var apiKey = 5MyMqktou2jxB81XKaoVlMQ6Xl0QZXZx;
var limit = 5;
var filter = random;
// render the initial buttons for display

function displayGifs(){
    var myGifs = $(this).attr("data-name");
    
    var queryURL = "http://api.giphy.com/v1/gifs/" + filter + "?&api_key=" + apiKey + "&tag=" +  + "&" + limit;
}