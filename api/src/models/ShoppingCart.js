const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("shoppingcart", {
    status: {
      type: DataTypes.ENUM("creado","curso", "cancelado", "completado", "vacio","procesado"),
      defaultValue: 'vacio'
    },
  });
};
