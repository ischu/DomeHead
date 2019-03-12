/* eslint-disable no-unused-vars */
$(".materialize-textarea").characterCounter();

function validate() {
  var x = document.forms["myForm"]["fname"].value;
  if (x === "") {
    alert("Name must be filled out");
    return false;
  }
}
function validateTitleForm() {
  var x = document.forms["titleForm"].value;
  if (x === "") {
    alert("Name must be filled out");
    return false;
  }
}
function validateStoryForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x === "") {
    alert("Name must be filled out");
    return false;
  }
}
function validateAuthorForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x === "") {
    alert("Name must be filled out");
    return false;
  }
}

console.log("validate");
