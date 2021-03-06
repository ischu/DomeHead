var db = require("../models");
var Sequelize = require("sequelize")



module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/create", function(req, res){
    res.render("create");
  });

  app.get("/stories", function(req, res){
      db.Story.findAll({
        include: [db.Author]
      }).then(function(dbExample) {
        console.log(dbExample[0
        ].Author.name);
        res.render("stories", {
         stories: dbExample         
        });
      });
  });

  // app.get("/stories/authorId", function(req, res){
  //   }).then(function(dbExample) {
  //     console.log(dbExample);
  //     res.render("stories", {
  //      stories: dbExample         
  //     });
  //   });
  

  app.get("/write/:id", function(req, res){
    db.Story.findOne({
      where:{
        id: req.params.id    
      }
    }).then(function(dbExample){
      res.render("write", {
        stories: dbExample
      })
    })
  });

  app.get("/profile", function(req, res){
      db.Author.findAll({}).then(function(dbExample) {
        res.render("profile", {
          authors: dbExample
        });
      });
  });

  app.get("/write", function(req, res){
    db.Story.findOne({
      order: Sequelize.literal('rand()'), limit: 1 
    }).then(function(dbExample){
      res.render("write", {
        stories: dbExample
      })
    })
  });
  
  // Load example page and pass in an example by id
  

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
