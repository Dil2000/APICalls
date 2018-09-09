$(document).ready(function(){

/*****************************************************************************/

// variables
    var APIKey = "dc6zaTOxFJmzC"; 	
    var topics = ["Ellen Show","SNL","Tonight Show","Daily Show","The Late Show","Americas got Talet","Jimmy Kimmel Live","The Late Late Show","Last Week Tonight","The Colbert Report"];
    
    var queryURL;

// Adding buttons
    AddingButtons = function(event){
        $("#AddButtons").empty();
        for(var i = 0 ; i < topics.length ; i++){
            newButton = $("<button>");
            newButton.addClass("tvShows");
            newButton.attr("data-name" , topics[i]);
            newButton.text(topics[i]);
            if(i % 2 == 0){ 
              newButton.addClass("btn btn-primary");
            }
            else{
              newButton.addClass("btn btn-info");
            }
            $("#AddButtons").append(newButton);
        }
    }

    AddingButtons();

// Fetch Data from the API and add to html
    fetchData = function(SearchCategory){
        $("#imagesGoHere").empty();
        $("#HeadingSelected").text(SearchCategory);
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + SearchCategory +"&api_key=" + APIKey;
        $.ajax({
          url : queryURL,
          method : "GET"
        })
        .done(function(response){
          console.log(response);          
          for(var i = 0 ; i < 10 ; i++){

            if (response.data[i].rating !== "r") {
              // Adding Images
              var newEm = $("<embed>");
              newEm.addClass("Images");
              var AnimationLink = response.data[i].images.downsized.url;
              if (AnimationLink.protocol !== "https:") {
                AnimationLink.protocol = "https:";
              }
              newEm.attr("src",response.data[i].images.original_still.url);
              newEm.attr("data-animate",response.data[i].images.downsized.url);
              newEm.attr("data-still",response.data[i].images.original_still.url);
              newEm.attr("data-state" ,"still");

              // Adding a div for ratings
              // var Ratings = response.rating;
              // newP = $("<div>");
              // newP.addClass("ratings");
              // newP.text("Rating : " + response.data[i].rating);

              $("#imagesGoHere").append(newEm);
              // $("#imagesGoHere").append(newP);
              // $("#imagesGoHere").append("<hr/>");
            }
          }
        });
    };

// click event of buttons
    $("#AddButtons").on("click",".tvShows",function(event){
      var tvShowName = $(this).attr("data-name");
      fetchData(tvShowName);
    });	

// Search new topics
    $("#extraGif").on("click",function(event){
        event.preventDefault();
        var newTopic = $("#search").val().trim();
        topics.push(newTopic);
        AddingButtons();

        if (newTopic == ""){ 
          alert("Type the word you want to search");
        }
        else{
          fetchData(newTopic);
        }

    });

// Click event for images
    $("#imagesGoHere").on("click",".Images",function(event){
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } 
        else if(state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});

