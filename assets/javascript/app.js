

let sportsList = ["basketball", "tennis", "golf", "hockey"]


const renderButton = () => {

    $("#button-holder").empty()

    for (let i = 0; i<sportsList.length; i++){

        let newButton = $("<button>");
        newButton.addClass("gif-generator")
        newButton.attr("data-name", sportsList[i])
        newButton.text(sportsList[i])
        $("#button-holder").append(newButton)


    }
}


const gifGenerator = () => {
    
let apiKey = "VJbsDpwKy6yKGBcWTMuS5L3HfkyJvA6n"    
let userChoice = $(this).attr("data-name")
let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${userChoice}"&limit=10&offset=0&rating=R&lang=en"`



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response)
})



}


$("#add-sport").on("click", function(event){
    
    event.preventDefault();

    let newSport = $("#sport-input").val().trim()

    sportsList.push(newSport)

    renderButton()
    
})

$(".gif-generator").on("click")

$(document).on("click", ".gif-generator", gifGenerator)

renderButton();









// 1. Render buttons at the top within my sportsList

// 2. Allow the user to add their own button using the search feature

// 3. Display gifs when user clicks on the button














// let showList = ["southpark", "family guy", "archer"] 


// for (let i = 0; i<showList.length; i++) {

// let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${showList[i]}"&limit=10&offset=0&rating=R&lang=en"`
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response){
//     console.log(response.data[3].embed_url)
//     $("#hello").append(`<div class="holy">${response.data[3].embed_url}</div>`)
    


// })

// }

// $(document).on("click",".holy",function(){
//     alert("hi")
// })