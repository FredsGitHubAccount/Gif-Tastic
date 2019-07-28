// Global Variables
let sportsList = ["basketball", "tennis", "golf", "hockey"]

// Function to render buttons, can add additional buttons using the add sport form.

function renderButton() {

    $("#button-holder").empty()

    for (let i = 0; i < sportsList.length; i++) {

        let newButton = $("<button>");
        newButton.addClass("newgif btn btn-success")
        newButton.attr("data-name", sportsList[i])
        newButton.text(sportsList[i].charAt(0).toUpperCase() + sportsList[i].slice(1))
        $("#button-holder").append(newButton)


    }
}

// Will append the rating and gif affiliated with the clicked button's value.
function gifGenerator() {

    let apiKey = "VJbsDpwKy6yKGBcWTMuS5L3HfkyJvA6n"
    let userChoice = $(this).attr("data-name")
    console.log(userChoice)
    let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${userChoice}"&limit=10&offset=0&rating=&lang=en`

    $(".gif-holder").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        let results = response.data

        for (let i = 0; i < results.length; i++) {

            // Storing urls into a variable
            let animateURL = response.data[i].images.downsized.url
            let stillURL = response.data[i].images.downsized_still.url

            // Rating Append
            let newGifs = $(`<div class="col-md-12 imgstyle border bg-dark" style="margin: 25px;">`)
            newGifs.append(`<h2 style="margin-top: 25px;">  Rating : ${results[i].rating.toUpperCase()}</h2>`)

            // Image Append
            let image = $("<img>").addClass("toggler img-fluid")
            image.attr("src", animateURL)
            image.attr("data-still", stillURL)
            image.attr("data-animate", animateURL)
            image.attr("data-state", "animate")
            newGifs.append(image)

            // Append all gifs to the holder

            $(".gif-holder").append(newGifs)
        }
    })
}

function gifToggler() {

    // Storing "this" attributes into variables
    let state = $(this).attr("data-state");
    let animate = $(this).attr("data-animate");
    let still = $(this).attr("data-still");

        // Will set the gif to the still url
    if (state == "animate") {

        $(this).attr("src", still)
        $(this).attr("data-state", "still")
    }
        // Will set the gif to the animated url

    else {
        $(this).attr("src", animate)
        $(this).attr("data-state", "animate")
    }
}


$("#add-sport").on("click", function (event) {

    event.preventDefault();

    let newSport = $("#sport-input").val().trim()

    if (newSport.length < 1) {
        alert("You must type something in!")
        return;
    }

    else {

        let apiKey = "VJbsDpwKy6yKGBcWTMuS5L3HfkyJvA6n"
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${newSport}"&limit=10&offset=0&rating=&lang=en`

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            if (response.data.length == 0) {
                alert("you did not input a valid field")
                $("#sport-input").val("")
                return;

            }
            else {
                sportsList.push(newSport)
                renderButton()
                $("#sport-input").val("")
            }
        })
    }
})

renderButton();
$(document).on("click", ".newgif", gifGenerator)
$(document).on("click", ".toggler", gifToggler)
