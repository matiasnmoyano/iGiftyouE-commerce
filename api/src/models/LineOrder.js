const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('lineorder', {
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  });
};
