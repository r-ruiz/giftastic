// start with a theme of gifs
var gifButtons = ["Micheal Scott", "Patrick Stewart", "John Dorian"];
// render the initial buttons for display

function addGifButton() {
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gifSearch").val().trim();
        if (gif ===""){
            alert("You must ener something!");
        }
        else {
            // Adding gif idea from the textbox to our array
            gifButtons.push(gif);
            $("#gifSearch").val("");
        }
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
        url:"https://api.giphy.com/v1/gifs/trending?api_key=5MyMqktou2jxB81XKaoVlMQ6Xl0QZXZx&limit=10",
        method: "GET"
    })
    // Promise has been initiated for modification
    .then(function(response) {
    // store the results in a temporary array
        var results = response.data;
        for (var i = 0; i < results.length; i++){
            if (results[i].rating !== "r"){
                var gifDiv = $("<div class='card'>");
                var p = $("<p class='card-title text-center'>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.attr("class", "card-img-top gif");
                gifDiv.append(gifImage);
                gifDiv.append(p);
                //  Prepending the gifImage to the "#gifDisplay" div in the HTML
                $("#gifDisplay").prepend(gifDiv);
            }
        }    
    });
}

function displayGifs(){
    $(".btn-secondary").on("click", function(){
        $("#gifDisplay").empty();
        var myGifs = $(this).attr("data-gif");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + myGifs + "&api_key=5MyMqktou2jxB81XKaoVlMQ6Xl0QZXZx&limit=10";
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
                    var gifDiv = $("<div class='card'>");
                    var p = $("<p class='card-title text-center'>").text("Rating: " + results[i].rating);
                    var gifImage = $("<img>");
                    gifImage.attr("class", "card-img-top gif");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifDiv.append(gifImage);
                    gifDiv.append(p);
                    //  Prepending the gifImage to the "#gifDisplay" div in the HTML
                    $("#gifDisplay").prepend(gifDiv);
                
                }
                
            }
        
        });
    });
}

function gifify() {
    // Since this is all dynamically rendered images with a class of .gif, we have to monitor 
    // the body and wait for the class to be rendered to track the click event
    $("body").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        console.log(this);
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          console.log(this);
        } 
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
          console.log(this);
        }
    });
}
    
$(document).ready(function(){
    randomGifs();
    renderButtons();
    addGifButton();
    gifify();
});


