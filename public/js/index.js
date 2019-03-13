console.log("js working")

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
  // will return true if name IS in use, false if name is NOT in use
  getName: function(nameToCheck) {
    return $.ajax({
      url: "api/authors"+nameToCheck,
      type: GET
    });
  },
  // method runs GET on username/password cobination
  // returns false if login is unsucessful, returns Author.id if sucessful
  getLogin: function(name, password) {
    return $.ajax({
      url: "api/authors"+name+"/"+password,
      type: GET
    });
  }

};

var STORY = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/stories",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/stories",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/stories" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  STORY.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// storySubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var storySubmit = function (event) {
  event.preventDefault();

  let titleVal = $("#title").val().trim();
  let textVal = $("#text").val().trim();
  let genreVal = $("#genre").val();
  // JSON obj to be submitted
  let example = {
    title: titleVal,
    body: textVal,
    genre: genreVal,
    AuthorId: 1 //EXAMPLE AUTHOR VARIABLE
  };

  STORY.saveExample(example).then(function () {
    console.log("saveExampleStory");
    refreshExamples();
  });

  $("#title").val("");
  $("#text").val("");

};

var authorSubmit = function (event) {
  event.preventDefault();

  var example = {
    name: $("#createAuthor").val().trim(),
    // example- delete later
    password: "password"
  };

  AUTHOR.saveExample(example).then(function () {
    console.log("saveExampleAuthor");
  });
};


// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  STORY.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

//testing js functionality
var playSubmit = function (event) {

}

function hideCreateForm(){
$("#storyForm").hide();
}

function showCreateForm(){
  $("#storyForm").show();
}

function hideLoginForm(){
$("#loginForm").hide();
}

function showLoginForm(){
  $("#loginForm").show();
}

function hideSignUpForm(){
$("#signUpForm").hide();
}

function showSignUpForm(){
  $("#signUpForm").show();
}

function hideSubmit(){
  $("#submit").hide();
}

function showSubmit(){
  $("#submit").show();
}

function hideSignUpButton(){
  $("#signup-button").hide();
}

function hideLoginButton(){
  $("#login-button").hide();
}

function hideLoginGet(){
  $("#loginGetButton").hide();
}

function showLoginGet(){
  $("#loginGetButton").show();
}

function hideSignUpPost(){
  $("#signUpPostButton").hide();
}

function showSignUpPost(){
$("#signUpPostButton").show();
}


// Add event listeners to the submit and delete buttons
$(document).ready(function () {
  $(".sidenav").sidenav();
  $("#submit").on("click", storySubmit);
  $("#authorSubmit").on("click", authorSubmit);
  $('select').formSelect();
  $("#storyLink").on("click", playSubmit);

  $("#login-button").on("click", function(){
    showLoginForm();
    hideSignUpForm();
    hideSignUpButton();
    hideLoginButton();
    showLoginGet();
  });

  $("#signup-button").on("click", function(){
    showSignUpForm();
    hideLoginForm();
    hideLoginButton();
    hideSignUpButton();
    showSignUpPost();
  });

  hideCreateForm();
  hideSignUpForm();
  hideLoginForm();
  hideSubmit();
  hideLoginGet();
  hideSignUpPost();
});



