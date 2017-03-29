
$(document).ready(function(){

var sports = ["soccer", "cricket", "rugby", "golf"];

// Function for displaying sport buttons
function createButton() {
  // Deleting the sports prior to adding new sports to prevent repeat buttons
  $("#gif-buttons").empty();
  // Looping through the array of sports
  for (var i = 0; i < sports.length; i++) {
    // Then dynamicaly generating buttons for each sport in the array
    var button = $("<button>");
    // Adding a class of sport to our button
    button.addClass("sport");
    // Adding a data-attribute
    button.attr("data-name", sports[i]);
    // Providing the initial button text
    button.text(sports[i]);
    // Adding the button to the gif-buttons div
    $("#gif-buttons").append(button);
  };//end for loop
 };//end createButton()

// Adding click event listen listener to all buttons
  $(document).on("click", "button", function() {
    // Grabbing and storing the data-animal property value from the button
    var sport = $(this).attr("data-name");

    // Constructing a queryURL using the sport name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      sport + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After data comes back from the request
      .done(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          var gifsDiv = $("#gifs");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var sportImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          sportImage.attr("src", results[i].images.fixed_height.url);

          //Adding data-state calls
          sportImage.attr("data-state", "still");

          //Adding class for targeting 
          sportImage.addClass("giphys");

          // Appending the paragraph and image tag to the animalDiv
          gifsDiv.append(p).append(sportImage);
          // gifsDiv.append(sportImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
         gifsDiv.prepend(sportImage);
        }
      });
  });//end button event listener

  // This function handles events where a sport button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var sport = $("#user-sport").val().trim();

        // Adding the user's sport to the sports array
        sports.push(sport);

        // Calling renderButtons which handles the processing of the sports array
        createButton();
        $("#user-sport").val(" ")
      });

      $(".giphys").on("click", function() {
      
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

 createButton();
});//end document ready