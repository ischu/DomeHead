// copied from activity to use as template - some will be removed1

// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================

module.exports = function(app) {
  // GET all Authors
  app.get("/api/authors", function(req, res) {
    db.Author.findAll({}).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // GET single Author by id
  app.get("/api/authors/:id", function(req, res) {
    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // search authors by name
  app.get("/api/authors/:name", function(req, res) {
    db.Story.findAll({
      where: {
        name: {
          // finds titles containing parameter (case sensitve)
          [Op.like]: `%${req.params.name}%`
        }
      }
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // TEST POST
  // app.post("/api/authors", function(req, res) {
  //   db.Author.create({name: "test_name"}).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

  app.post("/api/authors", function(req, res) {
    db.Author.create(req.body).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  //   app.delete("/api/authors/:id", function(req, res) {
  //     db.Author.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function(dbAuthor) {
  //       res.json(dbAuthor);
  //     });
  //   });
};
