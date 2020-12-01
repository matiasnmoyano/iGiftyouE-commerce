const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("questionproduct", {
    booleanAnswer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
};
