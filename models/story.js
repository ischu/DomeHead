module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Story", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // titles must be between 5 and 45 characters long
        len: [5, 45]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        // minimum length 50 characters, maximum length 5000 characters
        len: [50, 5000]
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // genre will be chosen from a drop-down, so this is more to catch errors
        len: [1]
      }
    }
  });
  // NYI
  Story.associate = function(models) {
    // Stories belong to Authors
    Story.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Story;
};
