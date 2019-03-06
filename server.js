require("dotenv").config();
var express = require("express");
var path = require("path");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Routes
<<<<<<< HEAD
require("./routes/author-api-routes")(app);
require("./routes/story-api-routes")(app);
=======

>>>>>>> 9ea36ac832638ada78f42587d307315286aa39f7
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
