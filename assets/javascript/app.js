// Global Variables
let sportsList = ["basketball", "tennis", "golf", "hockey"]

// Function to render buttons, can add additional functions with the add-sport function

function renderButton (){

    $("#button-holder").empty()

    for (let i = 0; i < sportsList.length; i++) {

        let newButton = $("<button>");
        newButton.addClass("newgif btn btn-success")
        newButton.attr("data-name", sportsList[i])
        newButton.text(sportsList[i])
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

        if (results.length == 0) {
            alert("You must search a valid category")
            return;

        }

        else {
            for (let i = 0; i < results.length; i++) {

                let animateURL = response.data[i].images.downsized.url
                let stillURL = response.data[i].images.downsized_still.url

                console.log(animateURL)
                console.log(stillURL)

                // Rating Append
                let newGifs = $(`<div class="col-md-12">`)
                newGifs.append(`<h2> Rating : ${results[i].rating}</h2>`)

                // Image Append
                let image = $("<img>").addClass("toggler img-fluid")
                image.attr("src", animateURL)
                image.attr("data-still", stillURL)
                image.attr("data-animate", animateURL)
                image.attr("data-state", "animate")
                newGifs.append(image)


                $(".gif-holder").append(newGifs)

            }
        }
    })


}

function gifToggler() {


    let state = $(this).attr("data-state");
    let animate = $(this).attr("data-animate");
    let still = $(this).attr("data-still");

    if (state == "animate") {

        $(this).attr("src", still)
        $(this).attr("data-state", "still")
    }

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

        sportsList.push(newSport)
        renderButton()
        $("#sport-input").val("")
    }

})


renderButton();
$(document).on("click", ".newgif", gifGenerator)
$(document).on("click", ".toggler", gifToggler)
