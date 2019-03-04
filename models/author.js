module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 40]
      }
    }
  });

  Author.associate = function(models) {
    Author.hasMany(models.Story, {
      as: "author",
      onDelete: "cascade"
    });
  };

  return Author;
};
