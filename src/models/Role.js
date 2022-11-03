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
        //Tambien se podria poner un ENUM con solo los campos a esperar como Actor, productor..
        //type: DataTypes.ENUM('Actor', 'Productor', 'Director','Casting' etc)
        allowNull: false,
      },
    },

    { timestamps: false }
  );
};
