// Dependencies
// =============================================================

var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Routes
// =============================================================

module.exports = function(app) {
  // GET single Author by name 
  // For Logging In

  app.get("/api/authors/:name/:password", function(req, res) {
    db.Author.findOne({
      where: {
        name: req.params.name,
        password: req.params.password
      }
    }).then(function(dbAuthor) {
      if(dbAuthor === null){
        console.log("login failed");
        return res.end();
        

      } else {
        console.log("login successful");
        return res.json(dbAuthor);
      }

      
    });
  });

  // GET single Author by name
  // For checking if name is taken when signing up

  app.get("/api/authors/:name", function(req, res) {
    db.Author.findOne({
      where: {
        name: req.params.name,
      }
    }).then(function(dbAuthor) {
      return res.json(dbAuthor);
    });
  });


  // GET authors by name- empty search will return all authors
  // For searching site for author or authors

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
  // used for getting logged in author's stories
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
    if (req.query.id) {
      query.id = req.query.id;
    }
    db.Author.findOne({
      where: query,
      include: [
        {
          model: db.Story,
          as: "stories"
        }
      ]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/authors", function(req, res) {
    db.Author.create(req.body)
      .then(function(dbAuthor) {
        res.json(dbAuthor);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.delete("/api/authors/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      console.log("Story with id " + req.params.id + " destroyed");
      res.json(dbAuthor);
    });
  });
};
