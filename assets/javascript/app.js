apiKey = "0537550b36da48a4947415046708cf2d";
rating = "&rating=pg"
limit = "&limit=12"
animals = ["Swordfish", "Goat", "Skunk", "Beaver", "Squirrel", "Cat", "Dog", "Lizard", "Sparrow", "Sasquatch", "Monkey", "Hippo", "Minnow", "Elephant"];
// build buttons dymanically from this array
$(document).ready(function() {

    renderButtons();

    function addOnclick() {

        $("button").on("click", function() {
            //clear out gif's div
            $("#gifs-appear-here").empty();

            var animal = $(this).attr("data-animal");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apiKey + limit + rating;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var animalDiv = $("<div>");
                    animalDiv.addClass("float-left");
                    var p = $("<p>");
                    var animatedUrl = results[i].images.fixed_width.url;
                    var stillUrl = results[i].images.fixed_width_still.url;
                    p.text("Rating: " + results[i].rating);
                    var animalImage = $("<img>");
                    animalImage.attr("src", animatedUrl);
                    animalImage.attr("data-animate", animatedUrl);
                    animalImage.attr("data-still", stillUrl);
                    animalImage.attr("data-state", "animate");
                    animalImage.addClass("gif");
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $('#gifs-appear-here').prepend(animalDiv);
                }

            });
        });

    }

    function renderButtons() {

        // Clear out the Div to prevent duplicate elements
        $("#buttons-view").empty();

        // Loops through the array of Animals
        for (var i = 0; i < animals.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            var a = $("<button>");
            a.attr("data-animal", animals[i]);
            a.addClass("btn btn-md")

            a.text(animals[i]);
            $("#buttons-view").append(a);
        }

        addOnclick();
    }


    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();

        if (animal.length > 1) {
            animals.push(animal);
            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
        } else {
            console.log("choose an animal with at least 2 letters")
            return;
        }

    });

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        animateMe = $(this).attr("data-animate");
        animateMeNot = $(this).attr("data-still");
        if (state === 'still') {
            $(this).attr("src", animateMe);
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", animateMeNot);
            $(this).attr("data-state", "still")
        }
    });
});