/* eslint-disable prettier/prettier */
const setHelperText = function (id, message) {
  $(id).attr("data-error", message);
};

const validate = {

  // TITLE VALIDATION
  title: () => {
    //If title is incorrect length or has invalid characters, it will not submit
    let titleVal = $("#title").val().trim();
    let NonWordRegEx= /\W/g;

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
  },

  // GENRE VALIDATION
  genre: () => {
    let genreVal= $("#genre").val();

    // Cannot be blank
    if (genreVal === null) {
      $("#genre").addClass("invalid");
    } else {
      $("#genre").removeClass("invalid");
      $("#genre").addClass("valid");
    }
  },

  // STORY VALIDATION
  text: () => {
    let textVal= $("#text").val().trim();

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
  },
  // AUTHOR VALIDATION
  author: () => {
    //If author is incorrect length or has invalid characters, it will not submit

    let authorVal= $("#createAuthor").val().trim();
    let NonWordRegEx= /\W/g;

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
};

// event handlers for validation
$(document).ready(function () {
  $("#submit").on("click", validate.title);
  $("#submit").on("click", validate.text);
  $("#submit").on("click", validate.genre);
  $("#authorSubmit").on("click", validate.author);
});