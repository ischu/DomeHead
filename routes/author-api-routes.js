// copied from activity to use as template - some will be removed1

// Dependencies
// =============================================================

var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Routes
// =============================================================

module.exports = function(app) {
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

  // GET author by name- empty search will return all authors

  app.get("/api/authors", function(req, res) {
    let query = {};
    // For searching authors by name
    if (req.query.name) {
      query["name"] =
        // finds names containing query (case sensitve)
        {
          [Op.like]: "%" + req.query.name + "%"
        };
    }
    db.Author.findAll({
      where: query
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // GET authors and their stories

  app.get("/api/authorsWork", function(req, res) {
    let query = {};
    // For searching authors by name
    if (req.query.name) {
      query["name"] =
        // finds names containing query (case sensitve)
        {
          [Op.like]: "%" + req.query.name + "%"
        };
    }
    db.Author.findAll({
      where: query,
      include: [{model: db.Story, as: "stories"}]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

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
