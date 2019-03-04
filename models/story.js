module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Story", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // add author_id
  });
  return Story;
};
