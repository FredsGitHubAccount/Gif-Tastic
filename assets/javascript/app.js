

let sportsList = ["basketball", "tennis", "golf", "hockey"]


const renderButton = () => {

    $("#button-holder").empty()

    for (let i = 0; i<sportsList.length; i++){

        let newButton = $("<button>");
        newButton.addClass("newgif btn btn-success")
        newButton.attr("data-name", sportsList[i],)
        newButton.text(sportsList[i])
        $("#button-holder").append(newButton)
 


    }
}


function gifGenerator(){
    
let apiKey = "VJbsDpwKy6yKGBcWTMuS5L3HfkyJvA6n"    
let userChoice = $(this).attr("data-name")
console.log(userChoice)
let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${userChoice}"&limit=10&offset=0&rating=&lang=en`


$(".gif-holder").empty();
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response)

    let results = response.data
   
    for(let i = 0; i< results.length; i++){
    
    let imgURL = response.data[i].images.fixed_height.url

    console.log(imgURL)
    
    let newGifs = $(`<div class="click-new">`)
    newGifs.append(`<h2> Rating : ${results[i].rating}</h2>`)
    let image = $("<img>").attr("src", imgURL);
    newGifs.append(image)

    $(".gif-holder").append(newGifs)
 
        
    
    }
})


}

$("#add-sport").on("click", function(event){
    
    event.preventDefault();
    

    let newSport = $("#sport-input").val().trim()

    if(newSport.length<1){
        alert("You must type something in!")
        return;
    }

    else{

    sportsList.push(newSport)
    renderButton()
    $("#sport-input").val("")
    }
    
})

$(".gif-generator").on("click")

$(document).on("click", ".newgif", gifGenerator)

renderButton();









// 1. Render buttons at the top within my sportsList

// 2. Allow the user to add their own button using the search feature

// 3. Display gifs when user clicks on the button
