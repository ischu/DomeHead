var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/create", function(req, res){
    res.render("create");
  });

  app.get("/stories", function(req, res){
      db.Story.findAll({}).then(function(dbExample) {
        res.render("stories", {
          story: dbExample
        });
      });
  });

  app.get("/write", function(req, res){
    db.Story.findOne({}).then(function(dbExample){
      res.render("write", {
        story: dbExample
      })
    })
  });

  app.get("/author", function(req, res){
      db.Author.findAll({}).then(function(dbExample) {
        res.render("author", {
          story: dbExample
        });
      });
  });

  
  // Load example page and pass in an example by id
  

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
