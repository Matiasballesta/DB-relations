const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    { timestamps: false }
  );
};
