// **********
// On Search Click - Display Button to Page (add button to firebase)
// **********

$('#srchBttn').on('click', function () {

    // prevent default action on click
    event.preventDefault();


    // define var
    var srch = $('#giphySearch').val().trim();
    console.log("srch:",srch);

    // Create button
    var button = $("<button>");
    // add text
    button.text(srch);
    // add id
    button.attr("data-value", srch);
    // add button class
    button.addClass("gifBttn btn btn-light btn-lg");
    // add type
    button.attr("type", "button");
    // Print & append to Page
    $('#bttnDisplay').append(button);


    // Clear Value in form
    $('#giphySearch').val('');

});


// **********
// On Giphy Button click - Display to page
// **********

// On Click pull Giphys
$("#bttnDisplay").on("click", ".gifBttn", function () {
    // log that the button was clicked
    console.log('hello world');


    // clear current values, then print new values
    $('#gifDisplay').empty();


    // query url variables
    var val = $(this).attr("data-value");
    var key = '3VzpigYWh3dRmmAKr2sfOr3WrwY7GEe3';
    var limit = 10;

    console.log('val:' + val);

    // Giphy Url Search
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + val +
        "&api_key=" + key + "&limit=" + limit;

    // console log the url
    console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

            var results = response.data;

            console.log(results);

            // Loop through the results
            for (var i = 0; i < results.length; i++) {

                // If results not = to r & pg-13
                if (results[i].rating !== 'r' && results[i].rating !== 'pg-13') {

                    // create a div for the gif
                    var gifDiv = $('<div>');

                    // add class for formatting
                    gifDiv.addClass("gif");

                    // store the rating of the gif
                    var rating = results[i].rating;

                    // create a P with the results rating
                    var p = $('<p>').text('Rating: ' + rating);

                    // Create Title
                    var h =$('<p>').text(results[i].title);

                    // Create img tag
                    var img = $('<img>');

                    // Add Src (still)
                    img.attr("src", results[i].images.fixed_height_still.url);

                    // add attr still
                    img.attr("still", results[i].images.fixed_height_still.url);
                    console.log(results[i].images.fixed_height_still.url);

                    // add attr animate
                    img.attr("animate", results[i].images.fixed_height.url);
                    console.log(results[i].images.fixed_height.url);

                    // add attr state (still = 1)
                    img.attr("state", "1");

                    // add class
                    img.addClass('gif');

                    // Append the rating and image to the div
                    // gifDiv.append(h);
                    gifDiv.append(img);
                    gifDiv.append(p);


                    // Append the Gif to the HTML Page
                    $('#gifDisplay').append(gifDiv);

                }
            }
        });

});

// **********
// On Gif click - pause/unpause
// **********

$("#gifDisplay").on("click", ".gif", function () {

    console.log("Click")

    // grab the current state of the gif (still vs. moving)
    var state = $(this).attr("state");

    // Determine if its moving or not
    if (state == 1) {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("state", "0");
    } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "1");
    }
});