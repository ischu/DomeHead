// Copied originally from class activity- some routes will be removed later

// Dependencies
// =============================================================

const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Routes
// =============================================================
module.exports = function(app) {
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

  // GET story by query empty query will return all stories
  app.get("/api/stories", function(req, res) {
    let query = {};
    // Search stories by title
    if (req.query.title) {
      query["title"] =
        // returns partial matches (case sensitve)
        {
          [Op.like]: "%" + req.query.title + "%"
        };
    }
    // Search stories by author name
    // if (req.query.Author.name) {
    //   query.Author.name =
    //     // returns partial matches (case sensitve)
    //     {
    //       [Op.like]: "%" + req.query.Author.name + "%"
    //     };
    // }
    // Search by genre
    if (req.query.genre) {
      // is exact since genres from a set list
      query["genre"] = req.query.genre;
    }
    db.Story.findAll({
      where: query,
      include: [db.Author]
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Story route for saving a new Story
  app.post("/api/stories", function(req, res) {
    db.Story.create(req.body).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // DELETE route for deleting stories
  app.delete("/api/stories/:id", function(req, res) {
    db.Story.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStory) {
      console.log("Story with id " + req.params.id + " destroyed");
      res.json(dbStory);
    });
  });

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
