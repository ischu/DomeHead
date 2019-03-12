// Get references to page elements
var $exampleText = $("#example-text");
var $exampleAuthor = $("#example-description");
var $exampleGenre = $("example-Genre")
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

console.log("js is working");

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

// TITLE VALIDATION

var titleValidate = function () {
  let titleVal = $("#title").val().trim();
  let textVal = $("#text").val().trim();
  let NonWordRegEx = /\W/g;
  function setHelperText(id, message) {
    $(id).attr("data-error", message);
  }
  //If title is incorrect length or has invalid characters, it will not submit

  if (titleVal === "") {
    setHelperText("#titleHelper", "Title cannot be blank");
  } // next two check for valid length
  else if (titleVal.length < 5) {
    setHelperText("#titleHelper", "Title must be longer than 5 characters");
  } else if (titleVal.length >= 40) {
    setHelperText("#titleHelper", "Title cannot be longer than 40 characters");
  }
  // checks for invalid characters
  else if (NonWordRegEx.test(titleVal)) {
    $("#title").addClass("invalid");
    setHelperText("#titleHelper", "Title may only contain letters, numbers, and spaces");
  } else {
    $("#title").removeClass("invalid");
    $("#title").addClass("valid");
  }

};

// GENRE VALIDATION
function genreValidate() {
  // Cannot be blank
  let genreVal = $("#genre").val();
  if (genreVal === null) {
    $("#genre").addClass("invalid");
  } else {
    $("#genre").removeClass("invalid");
    $("#genre").addClass("valid");
  }
}

// STORY VALIDATION
function textValidate() {
  let textVal = $("#text").val().trim();
  function setHelperText(id, message) {
    $(id).attr("data-error", message);
  }
  // If text is incorrect length, it will not submit

  // we should probably have a check that there is at least one blank in the story

  if (textVal === "") {
    setHelperText("#textHelper", "Story cannot be blank");
    $("#text").addClass("invalid");
  } else if (textVal.length >= 5000) {
    setHelperText("#textHelper", "Story cannot be longer than 5000 characters");
    $("#text").addClass("invalid");
  } else {
    $("#text").removeClass("invalid");
    $("#text").addClass("valid");
  }
}
// AUTHOR VALIDATION
function authorValidate() {
  let authorVal = $("#createAuthor").val().trim();
  let NonWordRegEx = /\W/g;
  function setHelperText(id, message) {
    $(id).attr("data-error", message);
  }
  //If author is incorrect length or has invalid characters, it will not submit

  if (authorVal === "") {
    setHelperText("#AuthorHelper", "Author cannot be blank");
  } // next two check for valid length
  else if (authorVal.length < 3) {
    $("#createAuthor").addClass("invalid");
    setHelperText("#AuthorHelper", "Author name must be longer than 3 characters");
  } else if (authorVal.length >= 20) {
    $("#createAuthor").addClass("invalid");
    setHelperText("#AuthorHelper", "Title cannot be longer than 20 characters");
  }
  // checks for invalid characters
  else if (NonWordRegEx.test(authorVal)) {
    $("#createAuthor").addClass("invalid");
    setHelperText("#AuthorHelper", "Title may only contain letters, numbers, and spaces");
  } else {
    $("#createAuthor").removeClass("invalid");
    $("#createAuthor").addClass("valid");
  }
}

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

var storyArray = [];

// $("#STORYDATABASETEXT").replace("[label]", "")

// Add event listeners to the submit and delete buttons
$(document).ready(function () {
  $("#modal1").modal();
  $("#modal1").modal("open");
  $("#submit").on("click", storySubmit);
  $("#authorSubmit").on("click", authorSubmit);
  $('select').formSelect();
  $("#storyLink").on("click", playSubmit)
});


