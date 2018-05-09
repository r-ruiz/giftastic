// start with a theme of gifs

var gifButtons = ["Micheal Scott", "Patrick Stewart", "John Dorian"];
// render the initial buttons for display

function addGifButton() {
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gifSearch").val().trim();

        // Adding movie from the textbox to our array
        gifButtons.push(gif);
        $("#gifSearch").val("");
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });
}

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifButtons.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button type='button'>");
      // Adding a class of movie-btn to our button
      a.addClass("btn btn-secondary mr-1 mb-1");
      // Adding a data-attribute
      a.attr("data-gif", gifButtons[i]);
      // Providing the initial button text
      a.text(gifButtons[i]);
      // Adding the button to the buttons-view div
      $("#buttons").append(a);
    }
    displayGifs();
  }

function randomGifs(){
    $("#gifTitle").html("<h4>Gifs: Trending</h4>");
    $.ajax({
        url:"http://api.giphy.com/v1/gifs/trending?api_key=5MyMqktou2jxB81XKaoVlMQ6Xl0QZXZx&limit=6",
        method: "GET"
    })
// Promise has been initiated for modification
    .then(function(response) {
    // store the results in a temporary array
        var results = response.data;
        for (var i = 0; i < results.length; i++){
            if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
                //var gif
                // var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                // var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var gifImage = $("<img class='rounded img-thumbnail'>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                gifImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                // gifDiv.append(p);
                // gifDiv.append(gifImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifDisplay").prepend(gifImage);
            }
        }    
    });
}

function displayGifs(){
    $(".btn-secondary").on("click", function(){
        $("#gifDisplay").empty();
        var myGifs = $(this).attr("data-gif");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + myGifs + "&api_key=5MyMqktou2jxB81XKaoVlMQ6Xl0QZXZx&limit=6";
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
            if (results[i].rating !== "r"){
                //var gif
                // var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                // var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var gifImage = $("<img class='rounded img-thumbnail'>");
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                gifImage.attr("src", results[i].images.fixed_height.url);
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                // gifDiv.append(p);
                // gifDiv.append(gifImage);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
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
    // displayGifs();
});