/* eslint-disable prettier/prettier */
const setHelperText = function (id, message) {
  $(id).attr("data-error", message);
};

$("select[required]").css({display: "block", height: 0, padding: 0, width: 0, position: "absolute"});

const validate = {

  // TITLE VALIDATION
  title: () => {
    //If title is incorrect length or has invalid characters, it will not submit
    let titleVal = $("#title").val().trim();
    let wordSpaceRegEx= /[^\w ]/ig;

    if (titleVal === "") {
      setHelperText("#titleHelper", "Title cannot be blank");
    } // next two check for valid length
    else if (titleVal.length < 5) {
      setHelperText("#titleHelper", "Title must be longer than 5 characters");
    } else if (titleVal.length >= 40) {
      setHelperText("#titleHelper", "Title cannot be longer than 40 characters");
    }
    // checks there are no invalid characters
    else if (wordSpaceRegEx.test(titleVal)) {
      console.log(wordSpaceRegEx.test(titleVal));
      $("#title").addClass("invalid");
      setHelperText("#titleHelper", "Title may only contain letters, numbers, and spaces");
    } else {
      $("#title").removeClass("invalid");
      $("#title").addClass("valid");
    }
  },

  // GENRE VALIDATION
  genre: () => {
    let genreVal= $("#genre").val();
    console.log(genreVal);
    // Cannot be blank
    if (genreVal === "Genre") {
      $("#genre").addClass("invalid");
      console.log("invalid");
    } else {
      $("#genre").removeClass("invalid");
      $("#genre").addClass("valid");
    }
  },

  // STORY VALIDATION
  text: () => {
    let textVal= $("#text").val().trim();
    let bracketsRegEx = /\[([\w+ ]+)\]/gi;
    // If text is incorrect length, it will not submit

    if (textVal === "") {
      setHelperText("#textHelper", "Story cannot be blank");
      $("#text").addClass("invalid");
    } else if (textVal.length >= 5000) {
      setHelperText("#textHelper", "Story cannot be longer than 5000 characters");
      $("#text").addClass("invalid");
    } 
    // validates if there is at least one ["word"] in story body - necessary for play page to load properly
    else if(bracketsRegEx.exec(textVal)===null){
      setHelperText("#textHelper", "Make sure to include [word]s in your story!");
      $("#text").addClass("invalid");
    } else {
      setHelperText("#textHelper", "Story Submitted!");
      $("#text").removeClass("invalid");
      $("#text").addClass("valid");
      $("#text").val("");
    }
  },
  // AUTHOR VALIDATION
  author: () => {
    //If author is incorrect length or has invalid characters, it will not submit

    let authorVal= $("#newName").val().trim();
    let NonWordRegEx= /\W/g;

    if (authorVal === "") {
      setHelperText("#nameHelper", "Author cannot be blank");
    } // next two check for valid length
    else if (authorVal.length < 3) {
      $("#newName").addClass("invalid");
      setHelperText("#nameHelper", "Name must be at least 3 characters long");
    } else if (authorVal.length >= 20) {
      $("#newName").addClass("invalid");
      setHelperText("#nameHelper", "Name cannot be longer than 20 characters");
    }
    // checks for invalid characters
    else if (NonWordRegEx.test(authorVal)) {
      $("#newName").addClass("invalid");
      setHelperText("#nameHelper", "Title may only contain letters, numbers, and spaces");
    } else {
      $("#newName").removeClass("invalid");
      $("#newName").addClass("valid");
    }
  }
};

// event handlers for validation
$(document).ready(function () {
  $("#submit").on("click", validate.title);
  $("#submit").on("click", validate.text);
  $("#submit").on("click", validate.genre);
  $("#signUpPostButton").on("click", validate.author);
});