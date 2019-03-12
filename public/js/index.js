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
    })
  },
  getExamples: function () {
    return $.ajax({
      url: "api/authors",
      type: GET
    })
  }
}

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
    name: $("#createAuthor").val().trim()
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

function hideLogin(){

}

function hideSignUp(){

}

hideCreateForm();

// Add event listeners to the submit and delete buttons
$(document).ready(function () {
  $("#modal1").modal();
  $("#modal1").modal("open");
  $("#submit").on("click", storySubmit);
  $("#authorSubmit").on("click", authorSubmit);
  $('select').formSelect();
  $("#storyLink").on("click", playSubmit)
});



