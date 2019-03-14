$(function() {
<<<<<<< HEAD
console.log(storyBody);
  storyBody.match(/\[(\w+)\]/gi).forEach((w) => {
      $("#storyForm").append('<input type ="text" placeholder ="'+w+'"/>');
  });
  $("#storyForm").append('<button class="waves-effect waves-light btn" id = "write_story_button"> Write Story </button>');
  $("#write_story_button").click(function writeStory(event){
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
          
  });
}); 
=======
  console.log(storyBody);
  storyBody.match(/\[(\w+)\]/gi).forEach((w) => {
    $("#storyForm").append('<input type ="text" placeholder ="'+w+'"/>');
  });
  $("#storyForm").append('<button class="waves-effect waves-light btn" id = "write_story_button"> Write Story </button>');
  $("#write_story_button").click(function writeStory(event){
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
  });
});
>>>>>>> 4dd139eeb03d03c175e8aead7a08b67c0f06981c
