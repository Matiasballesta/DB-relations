const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "movie",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
