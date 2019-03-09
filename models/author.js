module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // author names must be between 4 and
        len: [3, 20],
        // author names can include alphanumeric or underscore only
        is: /^[\w]+$/
      }
    }
  });

  Author.associate = function(models) {
    Author.hasMany(models.Story, {
      as: "stories",
      onDelete: "cascade"
    });
  };

  return Author;
};
