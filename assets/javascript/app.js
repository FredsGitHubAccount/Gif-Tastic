



let showList = ["southpark", "family guy", "archer"] 
let apiKey = "VJbsDpwKy6yKGBcWTMuS5L3HfkyJvA6n"

for (let i = 0; i<showList.length; i++) {

let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q="${showList[i]}"&limit=10&offset=0&rating=R&lang=en"`
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response.data[3].embed_url)
    $("#hello").append(`<div class="holy">${response.data[3].embed_url}</div>`)
    


})

}

$(document).on("click",".holy",function(){
    alert("hi")
})