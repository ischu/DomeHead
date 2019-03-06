// copied from activity to use as template - some will be removed1

// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================

module.exports = function(app) {
  app.get("/api/authors", function(req, res) {
    // 1. Add a join to include all of each Author's Stories
    db.Author.findAll({}).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/authors/:id", function(req, res) {
    // 2; Add a join to include all of the Author's Stories here
    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
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
