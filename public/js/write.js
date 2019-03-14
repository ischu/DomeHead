$(function() {
console.log(storyBody);
  storyBody.match(/\[(\w+)\]/gi).forEach((w) => {
      $("#storyForm").append('<input type ="text" placeholder ="'+w+'"/>');
  });
  $("#storyForm").append('<button class="waves-effect waves-light btn" id = "write_story_button"> Write Story </button>');
  $("#write_story_button").click(function writeStory(event){
<<<<<<< HEAD
    event.preventDefault();
    console.log("writing story");
    $("#storyForm input").each((_,el) => {
      const word = $(el).val();
      const placeholder = $(el).attr("placeholder");
      storyBody = storyBody.replace(placeholder, word);
      console.log(storyBody)

    });

    $("#showWrite").empty();
    var writeDiv = $("<div>")
    var newP = $("<p>");
    newP.attr("id", "newP")
    newP.text(storyBody)
    $(writeDiv).append(newP);
    $("#showWrite").append(writeDiv);
=======
      event.preventDefault();
      console.log("writing story");
      $("#storyForm input").each((_,el) => {
          const word = $(el).val();
          const placeholder = $(el).attr("placeholder");
          storyBody = storyBody.replace(placeholder, word);
          console.log(storyBody)
          
      });
          
          $("#showWrite").empty();
          var writeDiv = $("<div>")
          var newP = $("<p>");
          newP.attr("id", "newP")
          newP.text(storyBody)
          $(writeDiv).append(newP);
          $("#showWrite").append(writeDiv);
          
>>>>>>> master
  });
}); 