// Copied originally from class activity- some routes will be removed later

// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the stories
  app.get("/api/stories", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    db.Story.findAll({
      where: query,
      include: [db.Author]
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Get route for retrieving a single Story by id
  app.get("/api/stories/:id", function(req, res) {
    db.Story.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Author]
    }).then(function(dbStory) {
      console.log(dbStory);
      res.json(dbStory);
    });
  });

  // TEST POST
  app.post("/api/stories", function(req, res) {
    db.Story.create({title:"test1", body:"test2", genre:"test3", AuthorId: 1}).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Story route for saving a new Story
  // app.post("/api/stories", function(req, res) {
  //   db.Story.create(req.body).then(function(dbStory) {
  //     res.json(dbStory);
  //   });
  // });

  // DELETE route for deleting stories
  //   app.delete("/api/stories/:id", function(req, res) {
  //     db.Story.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function(dbStory) {
  //       res.json(dbStory);
  //     });
  //   });

  // PUT route for updating stories
  //   app.put("/api/stories", function(req, res) {
  //     db.Story.update(
  //       req.body,
  //       {
  //         where: {
  //           id: req.body.id
  //         }
  //       }).then(function(dbStory) {
  //       res.json(dbStory);
  //     });
  //   });
};
