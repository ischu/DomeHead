console.log("js working");

// The STORY object contains methods for each kind of request we'll make
var AUTHOR = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/authors",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/authors",
      type: GET
    });
  },
  // method attempts to GETs name to check if username is in use
  // will return json object if name IS in use, null if name is NOT in use
  getName: function (nameToCheck) {
    return $.ajax({
      url: "api/authors/" + nameToCheck,
      type: GET
    });
  },
  // method runs GET on username/password cobination
  // will return false if login is unsucessful, returns Author object if sucessful
  getLogin: function (name, password) {
    return $.ajax({
      url: "api/authors/" + name + "/" + password,
      type: "GET"
    });
  }

};

var STORY = {
  saveStory: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/stories",
      data: JSON.stringify(example)
    });
  },
  getStory: function (title) {
    return $.ajax({
      url: "api/stories?title="+title,
      type: "GET"
    });
  },
  deleteStory: function (id) {
    return $.ajax({
      url: "api/stories" + id,
      type: "DELETE"
    });
  }
};

// storySubmit is called whenever we submit a new story
var storySubmit = function (event) {
  event.preventDefault();
  let storedId = localStorage.getItem("LoggedAuthorId");
  let titleVal = $("#title").val().trim();
  let textVal = $("#text").val().trim();
  let genreVal = $("#genre").val();
  // JSON obj to be submitted
  let example = {
    title: titleVal,
    body: textVal,
    genre: genreVal,
    AuthorId: storedId
  };

  STORY.saveStory(example).then(function () {
    console.log("saveExampleStory");
  });

};

var searchSubmit = function (){
  $("#storiesPage").empty();
  var searchBar = $("#search").val().trim()
  STORY.getStory(searchBar).then(function(res){
    console.log(res)
    
    
    for (var i = 0; i < res.length || i < 6; i++){
      var cardSearchHolder = $("<div>")
    cardSearchHolder.addClass("col s12 m6")
    cardSearchHolder.attr("id", "storiesDisplay")
      console.log(res[i])
      var cardForSearch = $("<div>")
      cardForSearch.addClass("card blue-grey darken-1")
        var cardSearchContent = $("<div>")
        cardSearchContent.addClass("card-content white-text")
        
          var cardSearchTitle = $("<a>");
          cardSearchTitle.attr("href", "/write/"+res[i].id)
          cardSearchTitle.addClass("card-title")
          cardSearchTitle.attr("id", "storyLink")
          cardSearchTitle.text(res[i].title);
          cardSearchContent.append(cardSearchTitle);

          var cardSearchAction = $("<div>")
          cardSearchAction.addClass("card-action")
            var cardSearchGenre = $("<a>")
              cardSearchGenre.text(res[i].genre)
            var cardSearchAuthor = $("<a>")
              cardSearchAuthor.text(res[i].Author.name)
          cardSearchAction.append(cardSearchGenre, cardSearchAuthor);

          cardForSearch.append(cardSearchContent);
          cardForSearch.append(cardSearchAction)
          
      cardSearchHolder.append(cardForSearch);
    $("#storiesPage").append(cardSearchHolder);


    }
  })
  

}



// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  STORY.deleteStory(idToDelete).then(function () {
    
  });
};

// Add event listeners to the submit and delete buttons
$(document).ready(function () {
  $(".sidenav").sidenav();
  $("#submit").on("click", storySubmit);
  $('select').formSelect();

  $("#login-button").on("click", function () {
    // show login form
    $("#loginForm").show();
    $("#loginGetButton").show();
    // hide sign up form and "login" button
    $("#signUpForm").hide();
    $("#signup-button").hide();
    $("#login-button").hide();
  });

  $("#signup-button").on("click", function () {
    // show sign up form
    $("#signUpForm").show();
    $("#signUpPostButton").show();
    // hide login form and "sign up" button
    $("#loginForm").hide();
    $("#login-button").hide();
    $("#signup-button").hide();
  });
  // SIGN UP BUTTON
  
  // posts new author
  $("#signUpPostButton").on("click", function () {
    var example = {
      name: $("#newName").val().trim(),
      password: $("#newPassword").val().trim()
    };
    AUTHOR.saveExample(example);
    $("#createForm").show();
    $(".instructions").show();
    $("#submit").show();
    console.log("new author created");
  });
  // LOGIN BUTTON
  // gets existing author id, stores it locally
  $("#loginGetButton").on("click", function () {
    let loginData = {
      name: $("#loginName").val().trim(),
      password: $("#loginPassword").val().trim()
    };
    AUTHOR.getLogin(loginData.name, loginData.password).then(function(res) {
      if (loginData.name === res.name && loginData.password === res.password){
        console.log("login successful");
        localStorage.setItem("LoggedAuthorId", res.id);
        localStorage.setItem("LoggedAuthorName", res.name)
        $("#createForm").show();
        $("#submit").show();
        $("#loginGetButton").hide();
        $("#loginForm").hide();

        var loginSuccess = $("<p>");
        loginSuccess.text("You're Signed In As "+ localStorage.getItem("LoggedAuthorName"));
        $("#createPage").append(loginSuccess);
      }else{
        console.log("login failed");
      }
    });
  });


  var AuthorName = localStorage.getItem("LoggedAuthorName");

  if (AuthorName === null){
  $("#createForm").hide();
  $(".instructions").hide();
  $("#signUpForm").hide();
  $("#loginForm").hide();
  $("#submit").hide();
  $("#loginGetButton").hide();
  $("#signUpPostButton").hide();
  }

  if (AuthorName != null){
    $("#loginForm").hide();
    $("#signUpForm").hide();
    $("#loginGetButton").hide();
    $("#signUpPostButton").hide()
    $("#login-button").hide();
    $("#signup-button").hide();
  }
  
  $("#search").on("keypress", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.which === 13) {
      searchSubmit();
      
    }
  });
});



