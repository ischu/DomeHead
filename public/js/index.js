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
// var refreshExamples = function () {
//   STORY.getExamples().then(function (data) {
//     var $examples = data.map(function (example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

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
    AuthorId: storedId //EXAMPLE AUTHOR VARIABLE
  };

  STORY.saveExample(example).then(function () {
    console.log("saveExampleStory");
    refreshExamples();
  });

  $("#title").val("");
  $("#text").val("");

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

// Add event listeners to the submit and delete buttons
$(document).ready(function () {
  $(".sidenav").sidenav();
  $("#submit").on("click", storySubmit);
  $('select').formSelect();
  function playSubmit(){}

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
        $("#createForm").show();
        $("#submit").show();
      }else{
        console.log("login failed");
      }
    });
  });

  function playSubmit(){
  }
  let hrefId = localStorage.getItem("LoggedAuthorId")
  if (hrefId != null){
  $("#viewMyStories").attr("href", "/stories/"+hrefId);
  }
  else {
    $()
  }
  // create page loads with forms hidden
  $("#createForm").hide();
  $("#signUpForm").hide();
  $("#loginForm").hide();
  $("#submit").hide();
  $("#loginGetButton").hide();
  $("#signUpPostButton").hide();
});



