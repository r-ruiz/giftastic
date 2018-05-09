// start with a theme of gifs
var gifButtons = ["Micheal Scott", "Patrick Stewart", "John Dorian"];
// render the initial buttons for display

function addGifButton() {
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gifSearch").val().trim();

        // Adding gif idea from the textbox to our array
        gifButtons.push(gif);
        $("#gifSearch").val("");
        renderButtons();
    });
}

function renderButtons() {
    // Clear the buttons 
    $("#buttons").empty();

    // Build the buttons!
    for (var i = 0; i < gifButtons.length; i++) {
      var renderTheButton = $("<button type='button'>");
      renderTheButton.addClass("btn btn-secondary mr-1 mb-1");
      // Adding a data-attribute
      renderTheButton.attr("data-gif", gifButtons[i]);
      // Providing the initial button text
      renderTheButton.text(gifButtons[i]);
      // Adding the button to the buttons div
      $("#buttons").append(renderTheButton);
    }
    displayGifs();
}

function randomGifs(){
    $("#gifTitle").html("<h4>Gifs: Trending</h4>");
    $.ajax({
        url:"https://api.giphy.com/v1/gifs/trending?api_key=5MyMqktou2jxB81XKaoVlMQ6Xl0QZXZx&limit=6",
        method: "GET"
    })
    // Promise has been initiated for modification
    .then(function(response) {
    // store the results in a temporary array
        var results = response.data;
        for (var i = 0; i < results.length; i++){
            if (results[i].rating !== "r"){
                // Creating an image tag
                var gifImage = $("<img class='rounded img-thumbnail'>");
                // Giving the image tag an src attribute of a proprty pulled off the result item
                gifImage.attr("src", results[i].images.fixed_height.url);
                // Prepending the gifImage to the "#gifDisplay" div in the HTML
                $("#gifDisplay").prepend(gifImage);
            }
        }    
    });
}

function displayGifs(){
    $(".btn-secondary").on("click", function(){
        $("#gifDisplay").empty();
        var myGifs = $(this).attr("data-gif");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + myGifs + "&api_key=5MyMqktou2jxB81XKaoVlMQ6Xl0QZXZx&limit=6";
        $("#gifTitle").html("<h4>Gifs: " + myGifs + "</h4>");
        $.ajax({
            url:queryURL,
            method: "GET"
        })
        // Promise has been initiated for modification
        .then(function(response) {
        // store the results in a temporary array
            var results = response.data;
            for (var i = 0; i < results.length; i++){
                // check the rating of the displayed gif
                if (results[i].rating !== "r"){
                    var gifImage = $("<img class='rounded img-thumbnail'>");
                    gifImage.attr("src", results[i].images.fixed_height.url);
                    //  Prepending the gifImage to the "#gifDisplay" div in the HTML
                    $("#gifDisplay").prepend(gifImage);
                
                }
                
            }
        
        });
    });
}

$(document).ready(function(){
    randomGifs();
    renderButtons();
    addGifButton();
});